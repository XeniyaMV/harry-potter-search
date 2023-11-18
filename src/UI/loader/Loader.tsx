import { Props } from '../../types';
import getFullClassName from '../../helpers/getFullClassName';

const Loader = (props: Props): JSX.Element => {
  const fullClassName = getFullClassName('loader', props.additionalClassName);
  return <div className={fullClassName} data-testid="loader" />;
};

export default Loader;
