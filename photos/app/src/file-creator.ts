import * as Minio from 'minio';
import * as fs from 'fs';
import * as nodeFetch from 'node-fetch';

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password'
});

const getPresignedUrl = (fileName: string) => {
  const photoObject = { name: fileName }; // See server: PhotoObject.ts

  return fetch('http://localhost:4000/photo/create', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(photoObject)
  })
  .then(res => res.json());
};

export const createFile = () => {
  const filePath = './tslint.json';
  const fileName = 'some-folder/tslint.json';

  getPresignedUrl(fileName)
  .then(presignedUrl => {
    const fileStats = fs.statSync(filePath);
    const readStream = fs.createReadStream(filePath);

    return nodeFetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Length': fileStats.size
      },
      body: readStream
    });
  })
  .then(res => {
    if (res.status !== 200) {
      console.log('Could not upload file, see request:', res);
    }
  })
  .catch(console.log);
};
