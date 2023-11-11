import useSearchFormContext from '../../../contexts/searchFormContext/useSearchFormContext';
import CharacterCard from '../../../components/characterCard/CharacterCard';
import Loader from '../../../UI/loader/Loader';
import { CharacterCardsProps } from '../../../types';
import transformResponseToCardInfo from '../helpers/transformResponseToCardInfo';

const CharacterCards = (props: CharacterCardsProps): JSX.Element => {
  const { cardInfos } = useSearchFormContext();

  return (
    <section className="character-cards">
      <div className="container character-cards__wrapper">
        {!props.loader ? (
          transformResponseToCardInfo(cardInfos).map((item) => <CharacterCard key={item.id} cardInfo={item} />)
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};

export default CharacterCards;
