import { FormEvent, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSearchFormContext from '../../../contexts/searchFormContext/useSearchFormContext';
import getSearchResult from '../../../api/helpers/getSearchResult';
import apiBase from '../../../api/constants/apiBase';
import getFullClassName from '../../../helpers/getFullClassName';
import SearchInput from './SearchInput';
import { SearchFormProps } from '../../../types';

const SearchForm = (props: SearchFormProps): JSX.Element => {
  const { searchTerm, updateSearchTerm, updateCardInfos } = useSearchFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const fullClassName = getFullClassName('search-form', props.additionalClassName);
  const navigate = useNavigate();

  const setNewInfo = async (searchTerm: string, page?: number): Promise<void> => {
    const result = await getSearchResult(apiBase.baseUrl, apiBase.path, searchTerm, page, props.cardsPerPage);
    updateCardInfos(result.data);
    if (props.setHasNextPage && props.setHasPrevPage) {
      !result.meta.pagination.next ? props.setHasNextPage(false) : props.setHasNextPage(true);
      !result.meta.pagination.prev ? props.setHasPrevPage(false) : props.setHasPrevPage(true);
    }
  };

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      if (!props.loader) {
        if (props.setLoader) props.setLoader(true);

        const pageQuaryParam = searchParams.get('page');
        await setNewInfo(searchTerm, pageQuaryParam ? +pageQuaryParam : 1);

        if (props.setLoader) props.setLoader(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!props.loader) {
      if (props.setLoader) props.setLoader(true);

      navigate('/?page=1');
      setSearchParams({ page: '1' });
      const search = searchTerm.trim();
      updateSearchTerm(search);
      await setNewInfo(search);
      localStorage.setItem('searchTerm', search);

      if (props.setLoader) props.setLoader(false);
    }
  };

  return (
    <form className={fullClassName} onSubmit={(event): Promise<void> => handleSubmit(event)}>
      <SearchInput inputPlaceholder={props.inputPlaceholder} />
      <button
        className={`button search-form__submit ${props.loader ? 'button_disabled' : ''}`}
        type="submit"
        disabled={props.loader}
      >
        {props.submitTitle}
      </button>
    </form>
  );
};

export default SearchForm;
