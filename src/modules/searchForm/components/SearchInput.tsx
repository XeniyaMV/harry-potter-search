import { SearchInputProps } from '../../../types';
import searchIcon from '../../../assets/search.svg';

const SearchInput = (props: SearchInputProps): JSX.Element => {
  return (
    <div className="search-form__input">
      <img className="search-form__icon" src={searchIcon} alt="search icon" />
      <input
        type="text"
        className="search-form__text-field"
        placeholder={props.inputPlaceholder || 'Enter'}
        value={props.value}
        onChange={(event): void => props.setValue(event)}
      />
    </div>
  );
};

export default SearchInput;
