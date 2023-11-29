import getFullClassName from '../../../helpers/getFullClassName';
import { PaginationProps } from '../../../types';
import arrowLeft from '../../../assets/left-double-arrow.svg';

import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { pageUpdated } from '../../../helpers/reducers/currentPageSlice';
import { useEffect } from 'react';

const Pagination = (props: PaginationProps): JSX.Element => {
  const page = useAppSelector((state) => state.page.value);
  const pageInfo = useAppSelector((state) => state.pageInfo.value);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const fullClassName = getFullClassName('pagination', props.additionalClassName);

  const handleClickNext = async (): Promise<void> => {
    dispatch(pageUpdated(page + 1));
  };

  const handleClickPrev = async (): Promise<void> => {
    dispatch(pageUpdated(page - 1));
  };

  useEffect(() => {
    const details = searchParams.get('details');
    if (details) {
      setSearchParams({ page: `${page}`, details: `${details}` });
    } else {
      setSearchParams({ page: `${page}` });
    }
  }, [page, searchParams, setSearchParams]);

  return (
    <div data-testid="pagination-component" className={fullClassName}>
      <button
        data-testid="pagination-prev"
        className={`button pagination__button ${!pageInfo.hasPrevPage ? 'button_disabled' : ''}`}
        onClick={handleClickPrev}
        disabled={!pageInfo.hasPrevPage}
      >
        <img src={arrowLeft} alt="arrow left" />
      </button>
      <span data-testid="page-number" className="pagination__page-number">
        {page}
      </span>
      <button
        data-testid="pagination-next"
        className={`button pagination__button pagination__button_right ${
          !pageInfo.hasNextPage ? 'button_disabled' : ''
        }`}
        onClick={handleClickNext}
        disabled={!pageInfo.hasNextPage}
      >
        <img src={arrowLeft} alt="arrow right" />
      </button>
    </div>
  );
};

export default Pagination;
