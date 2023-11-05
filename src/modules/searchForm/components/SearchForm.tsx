import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchFormProps } from '../../../types';
import getSearchResult from '../../../api/helpers/getSearchResult';
import apiBase from '../../../api/constants/apiBase';
import getFullClassName from '../../../helpers/getFullClassName';
import SearchInput from './SearchInput';

const SearchForm = (props: SearchFormProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [searchParams, setSearchParams] = useSearchParams();
  const fullClassName = getFullClassName('search-form', props.additionalClassName);
  const navigate = useNavigate();

  const setNewInfo = async (searchTerm: string, page?: number): Promise<void> => {
    const result = await getSearchResult(apiBase.baseUrl, apiBase.path, searchTerm, page);
    if (props.setCardInfos) props.setCardInfos(result.results);
    if (props.setHasNextPage && props.setHasPrevPage) {
      result.next === null ? props.setHasNextPage(false) : props.setHasNextPage(true);
      result.previous === null ? props.setHasPrevPage(false) : props.setHasPrevPage(true);
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!props.loader) {
      if (props.setLoader) props.setLoader(true);

      navigate('/?page=1');
      setSearchParams({ page: '1' });
      const search = searchTerm.trim();
      setSearchTerm(search);
      await setNewInfo(search);
      localStorage.setItem('searchTerm', search);

      if (props.setLoader) props.setLoader(false);
    }
  };

  return (
    <form className={fullClassName} onSubmit={(event): Promise<void> => handleSubmit(event)}>
      <SearchInput value={searchTerm} setValue={handleInputChange} inputPlaceholder={props.inputPlaceholder} />
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
