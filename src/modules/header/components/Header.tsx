import { HeaderProps } from '../../../types';
import getFullClassName from '../../../helpers/getFullClassName';
import Logo from '../../../UI/logo/Logo';
import logo from '../../../assets/snitch.png';

const Header = (props: HeaderProps): JSX.Element => {
  const fullClassName = getFullClassName('header', props.additionalClassName);

  return (
    <header data-testid="header-component" className={fullClassName}>
      <div className="container header__wrapper">
        <Logo additionalClassName="header__logo" link="/" iconUrl={logo} />
      </div>
    </header>
  );
};

export default Header;
