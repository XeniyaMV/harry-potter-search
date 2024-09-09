import { Component } from 'react';
import startImg from '../../../assets/star-wars-people-h.jpg';

class StartScreen extends Component {
  public render(): JSX.Element {
    return (
      <section className="start-screen">
        <div className="container start-screen__wrapper">
          <div className="start-screen__about">
            <h2 className="start-screen__title">
              <span className="plain-text_highlight">Welcome</span>&nbsp;to the Star Wars Character Search
            </h2>
            <p className="start-screen__description">
              <span className="plain-text_highlight">Explore</span>&nbsp;the vast Star Wars universe by searching for
              your favorite characters. <span className="plain-text_highlight">Simply</span> enter a character&apos;s
              name and discover their details.
            </p>
          </div>
          <img className="start-screen__image" src={startImg} alt="star wars characters" />
        </div>
      </section>
    );
  }
}

export default StartScreen;
