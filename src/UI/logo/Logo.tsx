import { LogoProps } from '../../types';
import getFullClassName from '../../helpers/getFullClassName';
import { Link } from 'react-router-dom';

const Logo = (props: LogoProps): JSX.Element => {
  const fullClassName = getFullClassName('logo', props.additionalClassName);

  return (
    <Link className={fullClassName} to={`${props.link}`}>
      <h1 className="logo__title">{props.title}</h1>
      {props.iconUrl && <img className="logo__icon" src={`${props.iconUrl}`} alt="logo icon" />}
    </Link>
  );
};

export default Logo;
