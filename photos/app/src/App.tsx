import * as React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import { createFile } from './file-creator';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppWrapper = styled.div`
  display: flex;

  align-items: center;
`;

const Header = styled.h1`
  font-family: 'Open Sans', sans-serif;
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
  cursor: pointer;

  &:hover {
    background: #00cec9;
  }

  &:focus {
    outline: none;
  }
`;

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <AppContainer>
        <Header>Hello World!</Header>
        <Button onClick={createFile}>Create File!</Button>
      </AppContainer>
    );
  }
}

export default hot(module)(App);
