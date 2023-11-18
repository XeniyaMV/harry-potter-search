import useSearchFormContext from '../../../contexts/searchFormContext/useSearchFormContext';
import CharacterCard from '../../../components/characterCard/CharacterCard';
import Loader from '../../../UI/loader/Loader';
import { CharacterCardsProps } from '../../../types';
import transformResponseToCardInfo from '../helpers/transformResponseToCardInfo';

const CharacterCards = (props: CharacterCardsProps): JSX.Element => {
  const { cardInfos } = useSearchFormContext();

  return (
    <section data-testid="character-cards-component" className="character-cards">
      <div className="container character-cards__wrapper">
        {!props.loader ? (
          cardInfos.length !== 0 ? (
            transformResponseToCardInfo(cardInfos).map((item) => <CharacterCard key={item.id} cardInfo={item} />)
          ) : (
            <span>We couldn&apos;t find any results for your request. Please try again with different keywords</span>
          )
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};

export default CharacterCards;
