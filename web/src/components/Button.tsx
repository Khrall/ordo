import * as React from 'react';

interface IButton {
  label: string;
}

const Button: React.SFC<IButton & React.HTMLProps<HTMLButtonElement>> = (props) => (
  <button
    className="ordo-button"
    {...props}>
    {props.label}
  </button>
);

export default Button;
