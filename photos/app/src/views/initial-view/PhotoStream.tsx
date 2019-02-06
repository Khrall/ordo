import * as React from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PhotoStreamContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Photo = styled.img`
  width: 100%;
`;

interface IPhotoReturnedObject {
  _id: string;
  hash: string;
  name: string;
  createdDate: string;
}

interface IPhotoObject {
  _id: string;
  hash: string;
  name: string;
  createdDate: Date;
}

interface IPhotoStreamState {
  beforeDate: Date;
  photos: IPhotoObject[];
}

export class PhotoStream extends React.Component<{}, IPhotoStreamState> {
  constructor(props: any) {
    super(props);
    this.state = {
      beforeDate: new Date(),
      photos: []
    };
  }

  public componentDidMount = () => {
    this.loadPhotos();
  }

  public loadPhotos = () => {
    const { beforeDate } = this.state;
    fetch(`http://localhost:4000/photo?limit=10&before=${beforeDate.toJSON()}`)
    .then(res => res.json())
    .then((photos: IPhotoReturnedObject[]) =>
      photos.map(p => ({ ...p, createdDate: new Date(p.createdDate) }))
    )
    .then((photos: IPhotoObject[]) => {
      const allPhotos = this.state.photos.concat(photos)
        .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
      const minDate = allPhotos.reduce((a, b) => a < b.createdDate ? a : b.createdDate, new Date());
      this.setState({ photos: allPhotos, beforeDate: minDate });
    });
  }

  public render = () => {
    const { photos } = this.state;
    return (
      <PhotoStreamContainer>
        {
          photos.map(photo => (
            <Photo
              key={photo._id}
              src={`http://localhost:9000/test-bucket/${photo.hash}-${photo.name}`}
            />
          ))
        }
        <button onClick={this.loadPhotos}>More!</button>
      </PhotoStreamContainer>
    );
  }
}
