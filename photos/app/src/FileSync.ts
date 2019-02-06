import * as fs from 'fs';
import * as nodeFetch from 'node-fetch';
import * as hasha from 'hasha';
import { chunk } from 'lodash';

import { ImageFile } from './local-images';

const HASHING_ALGORITHM = 'sha1';
const SYNC_BATCH_SIZE = 10;

export enum SyncStatus { NOT_STARTED, SYNCING, DONE }
export interface ISyncState {
  status: SyncStatus;
  filesFound: number;
  filesProcessed: number;
  filesSynced: number;
  filesPreviouslySynced: number;
}

export class FileSync {
  private syncState: ISyncState;

  public initialize = () => {
    this.syncState = {
      status: SyncStatus.NOT_STARTED,
      filesFound: 0,
      filesProcessed: 0,
      filesPreviouslySynced: 0,
      filesSynced: 0
    };
    return this.syncState;
  }

  public startSync = (
    imageFiles: ImageFile[],
    onUpdate: (syncState: ISyncState) => void
  ) => {
    this.syncState = { ...this.syncState, filesFound: imageFiles.length };
    const batches = chunk(imageFiles, SYNC_BATCH_SIZE);
    let batchIndex = 0;
    const next = () => {
      if (batchIndex < batches.length) {
        const nextBatch = batches[batchIndex++];
        Promise.all(nextBatch.map(withHash))
          .then(withHashes => withHashes.map(withName))
          .then(addPresignedUrls)
          .then(withUrls =>
            Promise.all(withUrls.map(createFile))
              .then(() => {
                const prevState = this.syncState;
                this.syncState = {
                  ...prevState,
                  filesProcessed: prevState.filesProcessed + nextBatch.length,
                  filesPreviouslySynced: prevState.filesPreviouslySynced
                    + (nextBatch.length - withUrls.length),
                  filesSynced: prevState.filesSynced + withUrls.length
                };
                onUpdate(this.syncState);
                next();
              })
          )
          .catch(err => {
            console.log(err);
          });
      } else {
        this.syncState = { ...this.syncState, status: SyncStatus.DONE };
        onUpdate(this.syncState);
      }
    };

    next();
  }
}

const addPresignedUrls = photos => {
  return fetch('http://localhost:4000/photo/sync', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(photos)
  })
  .then(res => res.json());
};

export const createFile = photo => {
  const fileStats = fs.statSync(photo.path);
  const readStream = fs.createReadStream(photo.path);

  return nodeFetch(photo.presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Length': fileStats.size
    },
    body: readStream
  });
};

const withHash = (imageFile: ImageFile) => hasha
  .fromFile(imageFile.path, {algorithm: HASHING_ALGORITHM})
  .then(hash => ({ ...imageFile, hash }));

const withName = imageFile => ({
  ...imageFile,
  name: imageFile.path.split('/').pop()
});
