import { ChangeEvent } from 'react';
import useSearchFormContext from '../../../contexts/searchFormContext/useSearchFormContext';
import { SearchInputProps } from '../../../types';
import searchIcon from '../../../assets/search.svg';

const SearchInput = (props: SearchInputProps): JSX.Element => {
  const { searchTerm, updateSearchTerm } = useSearchFormContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    updateSearchTerm(event.target.value);
  };

  return (
    <div className="search-form__input">
      <img className="search-form__icon" src={searchIcon} alt="search icon" />
      <input
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
