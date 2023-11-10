import { Link } from 'react-router-dom';
import getFullClassName from '../../../helpers/getFullClassName';
import ErrorMessage from '../../../UI/errorMessage/ErrorMessage';
import { Props } from '../../../types';

const ErrorPage = (props: Props): JSX.Element => {
  const fullClassName = getFullClassName('error-page', props.additionalClassName);

  return (
    <main className={fullClassName}>
      <section className="error-section">
        <ErrorMessage additionalClassName="error-section__message" errorMessage="Oops... Something went wrong" />
        <Link className="button error-section__reload" to="/">
          Back to the homepage
        </Link>
      </section>
    </main>
  );
};

export default ErrorPage;
