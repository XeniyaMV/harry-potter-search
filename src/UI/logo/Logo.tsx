import { Component } from 'react';
import { LogoProps } from '../../types';
import getFullClassName from '../../helpers/getFullClassName';

class Logo extends Component<LogoProps> {
  private fullClassName = getFullClassName('logo', this.props.additionalClassName);

  public render(): JSX.Element {
    return (
      <a className={this.fullClassName} href={`${this.props.link}`}>
        <h1 className="logo__title">{this.props.title}</h1>
        {this.props.iconUrl && <img className="logo__icon" src={`${this.props.iconUrl}`} alt="logo icon" />}
      </a>
    );
  }
}

export default Logo;
