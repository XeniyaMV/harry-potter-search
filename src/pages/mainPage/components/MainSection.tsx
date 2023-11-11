import { useState } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import useSearchFormContext from '../../../contexts/searchFormContext/useSearchFormContext';
import SearchForm from '../../../modules/searchForm';
import CharacterCards from '../../../modules/characterCards';
import Pagination from '../../../modules/pagination';
import ErrorButton from './ErrorButton';
import Loader from '../../../UI/loader/Loader';
import Select from '../../../UI/select/Select';
import limitsPerPage from '../../../api/constants/limitsPerPage';
import getSearchResult from '../../../api/helpers/getSearchResult';
import apiBase from '../../../api/constants/apiBase';

const MainSection = (): JSX.Element => {
  const { cardInfos, updateCardInfos } = useSearchFormContext();
  const [loader, setLoader] = useState(false);

  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const [cardsPerPage, setCardsPerPage] = useState(limitsPerPage.opt1.toString());

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectChange = async (value: string): Promise<void> => {
    setLoader(true);
    setCardsPerPage(value);
    const search = localStorage.getItem('searchTerm');
    const page = 1;
    const result = await getSearchResult(apiBase.baseUrl, apiBase.path, search || '', page, value);
    setSearchParams({ page: `${page}` });
    updateCardInfos(result.data);
    !result.meta.pagination.next ? setHasNext(false) : setHasNext(true);
    !result.meta.pagination.prev ? setHasPrev(false) : setHasPrev(true);
    setLoader(false);
  };

  return (
    <main className="main">
      <div className="container main__wrapper">
        <ErrorButton />
        <section className="search">
          <SearchForm
            submitTitle="Search"
            inputPlaceholder="Enter a Star Wars character"
            loader={loader}
            cardsPerPage={cardsPerPage}
            setLoader={setLoader}
            setHasNextPage={setHasNext}
            setHasPrevPage={setHasPrev}
          />
        </section>
        {!loader ? (
          <div className="main__search-results-wrapper">
            <Link
              className="main__search-results"
              to={`/?page=${searchParams.get('page') ? searchParams.get('page') : '1'}`}
            >
              <CharacterCards cardInfos={cardInfos} loader={loader} />
              <div className="main__pagination">
                <Pagination
                  hasNext={hasNext}
                  hasPrev={hasPrev}
                  setHasNext={setHasNext}
                  setHasPrev={setHasPrev}
                  // setCardInfos={setCardInfos}
                  setCardInfos={updateCardInfos}
                  cardsPerPage={cardsPerPage}
                  setLoader={setLoader}
                />
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
                  value={cardsPerPage}
                  handleChangeValue={handleSelectChange}
                />
              </div>
            </Link>
            <Outlet />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
};

export default MainSection;
