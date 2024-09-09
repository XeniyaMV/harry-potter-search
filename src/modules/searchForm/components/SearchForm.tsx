import { Component } from 'react';
import { FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { SearchFormProps } from '../../../types';
import getSearchResult from '../api/getSearchResult';
import apiBase from '../constants/apiBase';
import transformResponseToCardInfo from '../helpers/transformResponseToCardInfo';
import getFullClassName from '../../../helpers/getFullClassName';
import SearchInput from './SearchInput';

class SearchForm extends Component<SearchFormProps> {
  public state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  private fullClassName = getFullClassName('search-form', this.props.additionalClassName);

  constructor(props: SearchFormProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  private handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }

  private async handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!this.props.loader) {
      if (this.props.setLoader) this.props.setLoader(true);
      const search = this.state.searchTerm.trim();
      this.setState({ searchTerm: search });
      const result = await getSearchResult(apiBase.baseUrl, apiBase.path, search);
      localStorage.setItem('searchTerm', search);
      if (this.props.setCardInfos) this.props.setCardInfos(transformResponseToCardInfo(result));
      if (this.props.setLoader) this.props.setLoader(false);
    }
  }

  public async componentDidMount(): Promise<void> {
    if (!this.props.loader) {
      if (this.props.setLoader) this.props.setLoader(true);
      const result = await getSearchResult(apiBase.baseUrl, apiBase.path, this.state.searchTerm);
      if (this.props.setCardInfos) this.props.setCardInfos(transformResponseToCardInfo(result));
      if (this.props.setLoader) this.props.setLoader(false);
    }
  }

  public render(): JSX.Element {
    return (
      <form className={this.fullClassName} onSubmit={(event): Promise<void> => this.handleSubmit(event)}>
        <SearchInput
          value={this.state.searchTerm}
          setValue={this.handleInputChange}
          inputPlaceholder={this.props.inputPlaceholder}
        />
        <button
          className={`button search-form__submit ${this.props.loader ? 'button_disabled' : ''}`}
          type="submit"
          disabled={this.props.loader}
        >
          {this.props.submitTitle}
        </button>
      </form>
    );
  }
}

export default SearchForm;
