import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Meter } from 'grommet';

import { ISyncState, SyncStatus, FileSync } from '../../FileSync';
import { getLocalImageFiles } from '../../local-images';

const FileSyncViewContainer = styled.div`
  width: calc(100% - 30px);
  height: calc(100% - 48px - 30px);
  padding: 15px;
  overflow: auto;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 16px;
`;

const Button = styled.button`
  background: #81ecec;
  border-radius: 4px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  border: none;
  color: #FFF;
  transition: 0.1s ease;
  padding: 8px 16px;
  margin: 10px 0;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: #00cec9;
  }

  &:focus {
    outline: none;
  }
`;

const Details = styled.div`
  width: 100%;
  background: #F0F0F0;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Open Sans', sans-serif;
  padding: 5px 0;
  margin: 10px 0;
`;

const Detail = styled.span`
  margin: 0 5px;
`;

const fileSync = new FileSync();

interface IFileSyncViewState {
  syncState: ISyncState;
}

export class FileSyncView extends React.Component<{}, IFileSyncViewState> {
  constructor(props) {
    super(props);
    this.state = {
      syncState: fileSync.initialize()
    };
  }

  public startSync = () => {
    getLocalImageFiles().then(imageFiles => {
      fileSync.startSync(imageFiles, this.onFileSyncUpdate);
    });
  }
  public onFileSyncUpdate = (syncState: ISyncState) => this.setState({ syncState });

  public render = () => {
    const { syncState } = this.state;

    const progress = syncState.status === SyncStatus.DONE ? 100
      : parseInt(`${100 * syncState.filesProcessed / syncState.filesFound}`, 10);
    const meterValues = [{
      label: 'sixty',
      value: progress,
      color: 'accent-1'
    }];

    return (
      <FileSyncViewContainer>
        <Title>Ready to sync?</Title>
        <Link to="/">
          <Button>Go back</Button>
        </Link>
        <Button onClick={this.startSync}>Start sync</Button>
        <Meter values={meterValues} size="full"  />
        <Details>
          <Detail>{syncState.filesFound} found</Detail>/
          <Detail>{syncState.filesProcessed} processed</Detail>/
          <Detail>{syncState.filesPreviouslySynced} previously synced</Detail>/
          <Detail>{syncState.filesSynced} new synced</Detail>
        </Details>
      </FileSyncViewContainer>
    );
  }
}
