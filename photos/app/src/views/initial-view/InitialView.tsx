import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const InitialViewContainer = styled.div`
  width: 100%;
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
  cursor: pointer;

  &:hover {
    background: #00cec9;
  }

  &:focus {
    outline: none;
  }
`;

export class InitialView extends React.Component<{}, {}> {
  public render = () => (
    <InitialViewContainer>
      <Title>Initial View</Title>
      <Link to="/file-sync" >
        <Button>Sync Files</Button>
      </Link>
    </InitialViewContainer>
  )
}
