import * as React from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import { FaThLarge, FaStream } from 'react-icons/fa';

import { IPhotoObject, PhotoTimeLine, PhotoGrid } from '../../components/photos/Photos';

const PhotoStreamContainer = styled.div`
  background: #CCC;
`;

const ViewSelectWrapper = styled.div`
  padding: 10px 15px;
  background: #FFF;
`;

interface IPhotoReturnedObject {
  _id: string;
  hash: string;
  name: string;
  createdDate: string;
}

type ViewMode = 'grid' | 'timeline';

interface IPhotoStreamState {
  beforeDate: Date;
  photos: IPhotoObject[];
  viewMode: ViewMode;
}

export class PhotoStreamView extends React.Component<{}, IPhotoStreamState> {
  constructor(props: any) {
    super(props);
    this.state = {
      beforeDate: new Date(),
      photos: [],
      viewMode: 'grid'
    };
  }

  public componentDidMount = () => {
    this.loadPhotos();
  }

  public loadPhotos = () => {
    const { beforeDate } = this.state;
    fetch(`http://localhost:4000/photo?limit=50&before=${beforeDate.toJSON()}`)
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

  public toggleViewMode = () => {
    const { viewMode } = this.state;
    console.log('Old viewmode was', viewMode, 'toggling ...');
    if (viewMode === 'grid') {
      this.setState({ viewMode: 'timeline' });
    } else {
      this.setState({ viewMode: 'grid' });
    }
  }

  public render = () => {
    const { photos, viewMode } = this.state;

    let photosViewer;
    switch (viewMode) {
      case 'grid':
        photosViewer = <PhotoGrid photos={photos} />;
        break;
      case 'timeline':
        photosViewer = <PhotoTimeLine photos={photos} />;
        break;
    }

    return (
      <PhotoStreamContainer>
        <ViewSelectWrapper>
          Photo Stream
          <ViewModeSelect
            onClick={this.toggleViewMode}
            viewMode={viewMode}
          />
        </ViewSelectWrapper>
        {photosViewer}
        <button onClick={this.loadPhotos}>More!</button>
      </PhotoStreamContainer>
    );
  }
}

interface IViewModeSelectProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  viewMode: ViewMode;
}

const ViewModeSelectButton = styled.button`
  text-transform: capitalize;
  border: none;
  background: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  transition: 0.15s ease;
  float: right;
  cursor: pointer;
  color: #AEAEAE;

  &:focus {
    outline: none;
  }

  &:hover {
    color: #0FD47C;
  }
`;

const GridIcon = styled(FaThLarge)`
  font-size: 16px;
  position: relative;
  top: 3px;
  margin-left: 6px;
`;

const TimeLineIcon = styled(FaStream)`
  font-size: 16px;
  position: relative;
  top: 3px;
  margin-left: 6px;
`;

const ViewModeSelect: React.SFC<IViewModeSelectProps> = props => {
  let icon;
  switch (props.viewMode) {
    case 'grid':
      icon = <GridIcon />;
      break;
    case 'timeline':
      icon = <TimeLineIcon />;
      break;
  }

  return <ViewModeSelectButton onClick={props.onClick}>
    {props.viewMode}{icon}
  </ViewModeSelectButton>;
};
