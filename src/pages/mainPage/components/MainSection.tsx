import { useState } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import SearchForm from '../../../modules/searchForm';
import CharacterCards from '../../../modules/characterCards';
import Pagination from '../../../modules/pagination';
import ErrorButton from './ErrorButton';
import { CardInfoResponse } from '../../../types';
import Loader from '../../../UI/loader/Loader';

const MainSection = (): JSX.Element => {
  const [cardInfos, setCardInfos] = useState<CardInfoResponse[]>([]);

  const [loader, setLoader] = useState(false);

  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const [searchParams] = useSearchParams();

  return (
    <main className="main">
      <div className="container main__wrapper">
        <ErrorButton />
        <section className="search">
          <SearchForm
            submitTitle="Search"
            inputPlaceholder="Enter a Star Wars character"
            loader={loader}
            setCardInfos={setCardInfos}
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
              <Pagination
                hasNext={hasNext}
                hasPrev={hasPrev}
                setHasNext={setHasNext}
                setHasPrev={setHasPrev}
                setCardInfos={setCardInfos}
                setLoader={setLoader}
              />
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
