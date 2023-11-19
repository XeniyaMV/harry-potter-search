import { ChangeEvent } from 'react';
import { SearchInputProps } from '../../../types';
import searchIcon from '../../../assets/search.svg';

//--REDUX--
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { searchTermUpdated } from '../../../helpers/reducers/searchTermSlice';

const SearchInput = (props: SearchInputProps): JSX.Element => {
  const searchTerm = useAppSelector((state) => state.searchTerm.value);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    dispatch(searchTermUpdated(event.target.value));
  };

  return (
    <div data-testid="search-input-component" className="search-form__input">
      <img className="search-form__icon" src={searchIcon} alt="search icon" />
      <input
        data-testid="input-text"
        type="text"
        className="search-form__text-field"
        placeholder={props.inputPlaceholder || 'Enter'}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
