import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchForm from '../../../modules/searchForm';
import CharacterCards from '../../../modules/characterCards';
import Pagination from '../../../modules/pagination';
import ErrorButton from './ErrorButton';
import Select from '../../../UI/select/Select';
import limitsPerPage from '../../../api/constants/limitsPerPage';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { cardsPerPageUpdated } from '../../../helpers/reducers/cardsPerPageSlice';
import { detailsIsOpenUpdated } from '../../../helpers/reducers/detailsSlice';

const MainSection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cardsPerPage = useAppSelector((state) => state.cardsPerPage.value);
  const detailsIsOpen = useAppSelector((state) => state.details.value.isOpen);
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
          <div
            data-testid="search-results"
            className="main__search-results"
            onClick={(): void => {
              if (detailsIsOpen) {
                navigate(`/?page=${searchParams.get('page') ? searchParams.get('page') : '1'}`);
                dispatch(detailsIsOpenUpdated(false));
              }
            }}
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
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MainSection;
