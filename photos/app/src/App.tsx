import * as React from 'react';
import { Grommet } from 'grommet';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { HeaderView } from './views/header-view/HeaderView';
import { InitialView } from './views/initial-view/InitialView';
import { FileSyncView } from './views/file-sync-view/FileSyncView';

const GlobalStyle = createGlobalStyle`
  body, html, #app, #app > div {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = () => (
  <Router>
    <Grommet>
      <GlobalStyle />
      <HeaderView />
      <Route exact path="/" component={InitialView} />
      <Route path="/file-sync" component={FileSyncView} />
    </Grommet>
  </Router>
);

export default App;
