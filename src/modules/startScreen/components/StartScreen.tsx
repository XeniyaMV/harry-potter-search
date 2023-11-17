import startImg from '../../../assets/hogwarts.png';

const StartScreen = (): JSX.Element => {
  return (
    <section data-testid="start-screen-component" className="start-screen">
      <div className="container start-screen__wrapper">
        <div className="start-screen__about">
          <h2 className="start-screen__title">
            <span className="plain-text_highlight">Welcome</span>&nbsp;to the Harry Potter Character Search
          </h2>
          <p className="start-screen__description">
            <span className="plain-text_highlight">Explore</span>&nbsp;the vast Wizarding World by searching for your
            favorite characters. <span className="plain-text_highlight">Simply</span> enter a character&apos;s name and
            discover their details.
          </p>
        </div>
        <img className="start-screen__image" src={startImg} alt="star wars characters" />
      </div>
    </section>
  );
};

export default StartScreen;
