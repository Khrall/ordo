import * as React from 'react';
import { Grommet } from 'grommet';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Grid, GridLeft, GridMain } from './components/Grid';
import { SideBarView } from './views/sidebar-view/SideBarView';
import { PhotoStreamView } from './views/photo-stream-view/PhotoStreamView';
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
      <Grid>
        <GridLeft>
          <SideBarView />
        </GridLeft>
        <GridMain>
          <Route exact path="/" component={PhotoStreamView} />
          <Route path="/file-sync" component={FileSyncView} />
        </GridMain>
      </Grid>
    </Grommet>
  </Router>
);

export default App;
