import { injectGlobal } from 'styled-components';

// NOTE: This will only be loaded once !
const x = injectGlobal`
  body, html, #app {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;
