import SearchFormProvider from '../../../contexts/searchFormContext/SearchFormProvider';
import StartScreen from '../../../modules/startScreen';
import MainSection from './MainSection';

const MainPage = (): JSX.Element => {
  return (
    <SearchFormProvider>
      <>
        <StartScreen />
        <MainSection />
      </>
    </SearchFormProvider>
  );
};

export default MainPage;
