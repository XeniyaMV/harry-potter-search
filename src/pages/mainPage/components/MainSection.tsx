import { Link, Outlet, useSearchParams } from 'react-router-dom';
import SearchForm from '../../../modules/searchForm';
import CharacterCards from '../../../modules/characterCards';
import Pagination from '../../../modules/pagination';
import ErrorButton from './ErrorButton';
import Select from '../../../UI/select/Select';
import limitsPerPage from '../../../api/constants/limitsPerPage';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { cardsPerPageUpdated } from '../../../helpers/reducers/cardsPerPageSlice';

const MainSection = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const cardsPerPage = useAppSelector((state) => state.cardsPerPage.value);

  const [searchParams] = useSearchParams();

  const handleSelectChange = async (value: string): Promise<void> => {
    dispatch(cardsPerPageUpdated(+value));
  };

  return (
    <main data-testid="main-section-component" className="main">
      <div className="container main__wrapper">
        <ErrorButton />
        <section className="search">
          <SearchForm submitTitle="Search" inputPlaceholder="Enter a Star Wars character" />
        </section>
        <div className="main__search-results-wrapper">
          <Link
            className="main__search-results"
            to={`/?page=${searchParams.get('page') ? searchParams.get('page') : '1'}`}
          >
            <CharacterCards />
            <div className="main__pagination">
              <Pagination />
              <Select
                title="Cards per page:"
                options={[
                  limitsPerPage.opt1,
                  limitsPerPage.opt2,
                  limitsPerPage.opt3,
                  limitsPerPage.opt4,
                  limitsPerPage.opt5,
                  limitsPerPage.opt6,
                ]}
                value={cardsPerPage.toString()}
                handleChangeValue={handleSelectChange}
              />
            </div>
          </Link>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MainSection;
