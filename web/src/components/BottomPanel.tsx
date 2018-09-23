import * as React from 'react';

const BottomPanel: React.SFC<{}> = (props) => (
  <div className="ordo-bottom-panel">
    {props.children}
  </div>
);

export default BottomPanel;
