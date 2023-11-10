import getFullClassName from '../../helpers/getFullClassName';
import { ErrorMessageProps } from '../../types';
import alarmLight from '../../assets/alarm-light.svg';

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  const fullClassName = getFullClassName('error', props.additionalClassName);
  return (
    <div className={fullClassName}>
      <img className="error__icon" src={alarmLight} alt="alarm icon" />
      <span className="error__message">{props.errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
