import { Component } from 'react';

class ErrorButton extends Component {
  public state = {
    hasError: false,
  };

  private handleOnClick(): void {
    this.setState({ hasError: !this.state.hasError });
  }

  public render(): JSX.Element {
    if (this.state.hasError) {
      throw Error('This is a test error');
    }

    return (
      <button className="button" onClick={(): void => this.handleOnClick()}>
        See Error
      </button>
    );
  }
}

export default ErrorButton;
