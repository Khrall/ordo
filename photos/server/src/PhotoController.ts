import { JsonController, Body, Get, Post, QueryParam } from 'routing-controllers';
import * as Minio from 'minio';
import { includes } from 'lodash';

import { PhotoObject } from './PhotoObject';
import Photo from './mongoose/photo';

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password'
});

@JsonController('/photo')
export class WebController {

  @Post('/sync')
  public createFile(@Body() photos: PhotoObject[]) {
    return new Promise((resolve, reject) => {
      const hashes = photos.map(p => p.hash);
      Photo.find({ hash: { $in: hashes }}, (mongoErr, docs: PhotoObject[]) => {
        if (mongoErr) {
          return reject(mongoErr);
        }

        const existingHashes = docs.map(d => d.hash);
        const newPhotos = photos.filter(p => !includes(existingHashes, p.hash));

        Promise.all(
          newPhotos.map(photo => createPhoto(photo).then(getPresignedUrl))
        )
        .then(withUrls => resolve(withUrls))
        .catch(errors => console.log(errors));
      });
    });
  }

  @Get()
  public getPhotos(
    @QueryParam('limit') qLimit: number,
    @QueryParam('before') qBefore: Date
  ) {
    const limit = qLimit || 10;
    const before = qBefore || new Date('1970-01-01');
    return Photo
      .find({ createdDate: { $lt: before } }).limit(limit).sort({ createdDate: -1 })
      .lean().exec().then(photos => {
      return photos.map(p => ({ ...p, _id: p._id.toString() }));
    });
  }
}

const createPhoto = (photo: PhotoObject) => new Promise<PhotoObject>((resolve, reject) => {
  const newPhoto = new Photo(photo);
  newPhoto.save(err => {
    if (err) {
      return reject(err);
    }
    resolve(photo);
  });
});

const getPresignedUrl = (photo: PhotoObject) => new Promise((resolve, reject) => {
  const uniqueName = `${photo.hash}-${photo.name}`;
  minioClient.presignedPutObject('test-bucket', uniqueName, (err, url) => {
    if (err) {
      return reject(err);
    }
    resolve({ ...photo, presignedUrl: url });
  });
});
