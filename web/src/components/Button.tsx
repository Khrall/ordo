import * as React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

export type SuccessFailure = 'success' | 'failure';
export type LoadState = 'idle' | 'loading' | SuccessFailure;
export type SuccessFailurePromise = Promise<SuccessFailure>;

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  onClick: () => void | SuccessFailurePromise;
}

interface IButtonState {
  loadState: LoadState;
}

class Button extends React.Component<IButtonProps, IButtonState> {
  public idleTimerIntervalId: NodeJS.Timer;
  public longLoadTimerIntervalId: NodeJS.Timer;

  public constructor(props) {
    super(props);
    this.state = {
      loadState: 'idle'
    }
  }

  public onClick = () => {
    const maybePromise = this.props.onClick();

    if (maybePromise instanceof Promise) {
      const successFailure = maybePromise as SuccessFailurePromise;
      this.startLongLoadTimer();
      successFailure
        .then(result => this.setState({ loadState: result }))
        .catch(() => this.setState({ loadState: 'failure' }))
        .finally(this.resetAndStartIdleTimer);
    }
  }

  public startLongLoadTimer = () => {
    this.longLoadTimerIntervalId = setTimeout(
      () => {
        clearInterval(this.longLoadTimerIntervalId);
        this.setState({ loadState: 'loading' });
      }
    , 250);
  }

  public resetAndStartIdleTimer = () => {
    if (this.longLoadTimerIntervalId) {
      clearInterval(this.longLoadTimerIntervalId);
    }
    if (this.idleTimerIntervalId) {
      clearInterval(this.idleTimerIntervalId);
    }
    this.idleTimerIntervalId = setTimeout(
      () => this.setState({ loadState: 'idle' })
    , 2000);
  }

  public render() {
    const { loadState } = this.state;
    const iconActive = loadState !== 'idle';

    return (
      <button
        disabled={loadState === 'loading'}
        className="ordo-button"
        {...this.props}
        onClick={this.onClick}
      >
        {this.props.label}
        <div className={`icon-wrapper ${iconActive && 'active'}`}>
          {getStateIcon(loadState)}
        </div>
      </button>
    );
  }
}

const getStateIcon = (state: LoadState) => {
  switch (state) {
    case 'idle': return null;
    case 'loading': return <FaSpinner className="spin-animation" />;
    case 'success': return <FaCheckCircle className="grow-animation" />;
    case 'failure': return <FaExclamationTriangle className="grow-animation" />;
  }
};

export default Button;
