import { Component } from 'react';
import { HeaderProps } from '../../../types';
import getFullClassName from '../../../helpers/getFullClassName';
import Logo from '../../../UI/logo/Logo';

import logo from '../../../assets/logo-primary.png';

class Header extends Component<HeaderProps> {
  private fullClassName = getFullClassName('header', this.props.additionalClassName);

  public render(): JSX.Element {
    return (
      <header className={this.fullClassName}>
        <div className="container header__wrapper">
          <Logo additionalClassName="header__logo" link="#" iconUrl={logo} />
        </div>
      </header>
    );
  }
}

export default Header;
