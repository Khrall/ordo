import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaLayerGroup, FaSyncAlt } from 'react-icons/fa';

const SideBarViewContainer = styled.div`
  background: #26292D;
  height: calc(100% - 20px);
  padding-top: 20px;
`;

const Section = styled(NavLink)`
  display: block;
  color: #C5CACF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  width: calc(100% - 40px);
  padding: 8px 20px;

  transition: 0.2s ease;
  &:hover {
    color: #EDEDED;
  }

  &.active {
    color: #0FD47C;
  }
`;

const PhotoStreamIcon = styled(FaLayerGroup)`
  position: relative;
  top: 2px;
  margin-right: 10px;
`;

const FileSyncIcon = styled(FaSyncAlt)`
  position: relative;
  top: 2px;
  margin-right: 10px;
`;

export class SideBarView extends React.Component<{}, {}> {
  public render = () => (
    <SideBarViewContainer>
      <Section to="/" activeClassName="active" exact>
        <PhotoStreamIcon />
        Photo Stream
      </Section>
      <Section to="/file-sync" activeClassName="active">
        <FileSyncIcon />
        Sync Files
      </Section>
    </SideBarViewContainer>
  )
}
