import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import * as Minio from 'minio';

import { PhotoObject } from './PhotoObject';

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password'
});

@JsonController('/photo')
export class WebController {

  @Post('/create')
  public createFile(@Body() photoObject: PhotoObject) {
    return new Promise((resolve, reject) => {
      minioClient.presignedPutObject('test-bucket', photoObject.name, (err, url) => {
        if (err) {
          return reject(err);
        }
        resolve(url);
      });
    });
  }

}
