import { Component } from 'react';
import Header from '../../../modules/header';
import StartScreen from '../../../modules/startScreen';
import MainSection from './MainSection';

class MainPage extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Header />
        <StartScreen />
        <MainSection />
      </>
    );
  }
}

export default MainPage;
