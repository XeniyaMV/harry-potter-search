import { Component } from 'react';
import { Props } from '../../types';
import getFullClassName from '../../helpers/getFullClassName';

class Loader extends Component<Props> {
  private fullClassName = getFullClassName('loader', this.props.additionalClassName);

  public render(): JSX.Element {
    return <div className={this.fullClassName} />;
  }
}

export default Loader;
