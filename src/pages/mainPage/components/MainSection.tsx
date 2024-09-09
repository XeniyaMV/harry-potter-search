import { Component } from 'react';
import SearchForm from '../../../modules/searchForm';
import CharacterCards from '../../../modules/characterCards';
import ErrorButton from './ErrorButton';
import { Props, CardInfo } from '../../../types';

class MainSection extends Component {
  public state = {
    cardInfos: [],
    loader: false,
  };

  constructor(props: Props) {
    super(props);
    this.setCardInfos = this.setCardInfos.bind(this);
    this.setLoader = this.setLoader.bind(this);
  }

  private setCardInfos(cardInfos: CardInfo[]): void {
    this.setState({ cardInfos });
  }

  private setLoader(loader: boolean): void {
    this.setState({ loader });
  }

  public render(): JSX.Element {
    return (
      <main className="main">
        <div className="container main__wrapper">
          <ErrorButton />
          <section className="search">
            <SearchForm
              submitTitle="Search"
              inputPlaceholder="Enter a Star Wars character"
              loader={this.state.loader}
              setCardInfos={this.setCardInfos}
              setLoader={this.setLoader}
            />
          </section>
          <CharacterCards cardInfos={this.state.cardInfos} loader={this.state.loader} />
        </div>
      </main>
    );
  }
}

export default MainSection;
