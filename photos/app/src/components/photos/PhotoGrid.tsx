import * as React from 'react';
import styled from 'styled-components';

import { IPhotoObject } from './Photos';

interface IPhotoGridProps {
  photos: IPhotoObject[];
}

const PhotoGridWrapper = styled.div`
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Photo = styled.img`
  height: 100px;
  border-radius: 4px;
  margin: 5px;
`;

export const PhotoGrid = (props: IPhotoGridProps) => (
  <PhotoGridWrapper>
    {
      props.photos.map(photo => (
        <Photo
          key={photo._id}
          src={`http://localhost:9000/test-bucket/small/${photo.hash}-${photo.name}`}
        />
      ))
    }
  </PhotoGridWrapper>
);
