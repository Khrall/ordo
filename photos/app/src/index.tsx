import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const render = () => {
  // NB: We have to re-require App every time or else this won't work
  // We also need to wrap our app in the AppContainer class
  const App = require('./App').default;
  ReactDOM.render(<AppContainer><App/></AppContainer>, document.getElementById('app'));
};

render();
if ((module as any).hot) { (module as any).hot.accept(render); }
