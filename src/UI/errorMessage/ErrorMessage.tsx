import { Component } from 'react';
import getFullClassName from '../../helpers/getFullClassName';
import { ErrorMessageProps } from '../../types';
import alarmLight from '../../assets/alarm-light.svg';

class ErrorMessage extends Component<ErrorMessageProps> {
  private fullClassName = getFullClassName('error', this.props.additionalClassName);
  public render(): JSX.Element {
    return (
      <div className={this.fullClassName}>
        <img className="error__icon" src={alarmLight} alt="alarm icon" />
        <span className="error__message">{this.props.errorMessage}</span>
      </div>
    );
  }
}

export default ErrorMessage;
