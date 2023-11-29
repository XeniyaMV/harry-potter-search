import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getFullClassName from '../../../helpers/getFullClassName';
import SearchInput from './SearchInput';
import { SearchFormProps } from '../../../types';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { searchTermUpdated } from '../../../helpers/reducers/searchTermSlice';
import { pageUpdated } from '../../../helpers/reducers/currentPageSlice';

const SearchForm = (props: SearchFormProps): JSX.Element => {
  const searchTerm = useAppSelector((state) => state.searchTerm.value);

  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(searchTerm);

  const navigate = useNavigate();
  const fullClassName = getFullClassName('search-form', props.additionalClassName);

  useEffect((): void => {
    const search = localStorage.getItem('searchTerm') || '';
    setInputValue(search);
    dispatch(searchTermUpdated(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    navigate('/?page=1');
    const search = inputValue.trim();
    dispatch(searchTermUpdated(search));
    dispatch(pageUpdated(1));
    localStorage.setItem('searchTerm', search);
  };

  return (
    <form
      data-testid="search-form-component"
      className={fullClassName}
      onSubmit={(event): Promise<void> => handleSubmit(event)}
    >
      <SearchInput value={inputValue} setValue={setInputValue} inputPlaceholder={props.inputPlaceholder} />
      <button className={`button search-form__submit`} type="submit">
        {props.submitTitle}
      </button>
    </form>
  );
};

export default SearchForm;
