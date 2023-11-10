import { Outlet } from 'react-router-dom';
import getFullClassName from '../helpers/getFullClassName';
import Header from '../modules/header';
import { Props } from '../types';

const RootLayout = (props: Props): JSX.Element => {
  const fullClassName = getFullClassName('root-layout', props.additionalClassName);
  return (
    <div className={fullClassName}>
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
