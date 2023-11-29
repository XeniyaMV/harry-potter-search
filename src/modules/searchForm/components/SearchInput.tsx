import { ChangeEvent, useState } from 'react';
import { SearchInputProps } from '../../../types';
import searchIcon from '../../../assets/search.svg';

const SearchInput = (props: SearchInputProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState(props.value || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    props.setValue ? props.setValue(event.target.value) : setSearchTerm(event.target.value);
  };

  return (
    <div data-testid="search-input-component" className="search-form__input">
      <img className="search-form__icon" src={searchIcon} alt="search icon" />
      <input
        data-testid="input-text"
        type="text"
        className="search-form__text-field"
        placeholder={props.inputPlaceholder || 'Enter'}
        value={props.value !== undefined ? props.value : searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
