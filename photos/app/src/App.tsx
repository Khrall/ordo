import * as React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-family: 'Open Sans', sans-serif;
`;

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <AppContainer>
        <Header>Hello World!</Header>
      </AppContainer>
    );
  }
}

export default hot(module)(App);
