import { Component } from 'react';
import { SearchInputProps } from '../../../types';
import searchIcon from '../../../assets/search.svg';

class SearchInput extends Component<SearchInputProps> {
  public render(): JSX.Element {
    return (
      <div className="search-form__input">
        <img className="search-form__icon" src={searchIcon} alt="search icon" />
        <input
          type="text"
          className="search-form__text-field"
          placeholder={this.props.inputPlaceholder || 'Enter'}
          value={this.props.value}
          onChange={(event): void => this.props.setValue(event)}
        />
      </div>
    );
  }
}

export default SearchInput;
