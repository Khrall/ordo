import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styled-components/global';

// NOTE: Nothing outside of App is hot-reloaded !
import App from './App';

ReactDOM.render(<App />, document.getElementById('app'));
