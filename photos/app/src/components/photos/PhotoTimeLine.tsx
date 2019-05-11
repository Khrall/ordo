import * as React from 'react';
import styled from 'styled-components';

import { IPhotoObject } from './Photos';

interface IPhotoTimeLineProps {
  photos: IPhotoObject[];
}

const PhotoTimeLineWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 15px 0;
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 4px;
  margin: 5px;
`;

export const PhotoTimeLine = (props: IPhotoTimeLineProps) => (
  <PhotoTimeLineWrapper>
    {
      props.photos.map(photo => (
        <Photo
          key={photo._id}
          src={`http://localhost:9000/test-bucket/${photo.hash}-${photo.name}`}
        />
      ))
    }
  </PhotoTimeLineWrapper>
);
