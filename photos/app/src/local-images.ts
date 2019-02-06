import * as fs from 'fs';
import * as path from 'path';

const BASE_PHOTOS_FOLDER = '/Users/khrall/Pictures/Photos\ Library.photoslibrary/Masters/';
const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png'];

export interface ImageFile {
  path: string;
  extension: string;
}

export const getLocalImageFiles = () => new Promise<ImageFile[]>((resolve, reject) => {
  walk(BASE_PHOTOS_FOLDER, (err, results: string[]) => {
    if (err) {
      return reject(err);
    }

    const files = results
      .map(result => ({
        path: result,
        extension: result.split('.').pop().toLowerCase()
      }));

    const hist = files.reduce((tmpHist, next) => {
      if (tmpHist[next.extension]) {
        tmpHist[next.extension]++;
      } else {
        tmpHist[next.extension] = 1;
      }
      return tmpHist;
    }, {});
    console.log(hist);

    const imageFiles = files.filter(f => PHOTO_EXTENSIONS.includes(f.extension));
    resolve(imageFiles);
  });
});

// TODO: Move into utils, taken from https://stackoverflow.com/a/5827895
const walk = (dir, done) => {
  let results = [];

  fs.readdir(dir, (err, list) => {
    if (err) {
      return done(err);
    }

    let pending = list.length;
    if (!pending) {
      return done(null, results);
    }

    list.forEach(file => {
      file = path.resolve(dir, file);
      fs.stat(file, (statErr, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (walkErr, res) => {
            results = results.concat(res);
            if (!--pending) {
              done(null, results);
            }
          });
        } else {
          results.push(file);
          if (!--pending) {
            done(null, results);
          }
        }
      });
    });
  });
};
