import { Link } from 'react-router-dom';
import footPrints from '../../../assets/foot-prints.svg';

const Page404 = (): JSX.Element => {
  return (
    <section data-testid="page-404" className="page-404">
      <div className="container page-404__wrapper">
        <div className="page-404__message">
          <h1 className="page-404__title">404</h1>
          <h2 className="page-404__subtitle">Page not found</h2>
          <div className="page-404__foot-prints">
            <div className="page-404__foot-print">
              <img src={footPrints} alt="foot prints" />
            </div>
          </div>
          <Link className="button page-404__button" to="/">
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page404;
