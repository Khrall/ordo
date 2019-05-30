import * as Minio from 'minio';
import * as sharp from 'sharp';
import * as Promise from 'bluebird';

import Photo, { IPhoto } from './mongoose/photo';

const pipelines = [
  { folder: 'small', pipeline: () => sharp().rotate().resize(200) },
  { folder: 'medium', pipeline: () => sharp().rotate().resize(700) },
  { folder: 'large', pipeline: () => sharp().rotate().resize(1200) },
  { folder: 'original', pipeline: () => sharp().rotate() }
];

const minioBucket = 'test-bucket';
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password'
});

const processMore = (roundsLeft: number) => {
  // Photo.find({ resized: { $ne: true } }).limit(10)
  Photo.find({ resized: { $ne: true } }).limit(10).lean().exec().then((photos: IPhoto[]) =>
    Promise.all(
      photos.map(photo => {
        const photoName = `${photo.hash}-${photo.name}`;
        return minioClient.getObject(minioBucket, photoName)
          .then(dataStream => Promise.all(
            pipelines.map(pipeline =>
              minioClient.putObject(
                minioBucket,
                `${pipeline.folder}/${photoName}`,
                dataStream.pipe(pipeline.pipeline())
              )
            )
          ));
      })
    ).then(() => {
      const ids = photos.map(p => p._id);
      return Photo.updateMany({ _id: { $in: ids } }, { resized: true }).lean().exec();
    })
  )
  .then(() => {
    const newRoundsLeft = roundsLeft - 1;
    console.log(`Round complete, ${newRoundsLeft} rounds left`);
    if (newRoundsLeft === 0) {
      console.log('All done');
      process.exit(0);
    } else {
      processMore(newRoundsLeft);
    }
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
};

const maxRounds = 100;
processMore(maxRounds);
