import { Link, useSearchParams } from 'react-router-dom';
import { CharacterCardProps } from '../../types';
import getFullClassName from '../../helpers/getFullClassName';
import cardImg from '../../assets/card-picture.jpg';

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const fullClassName = getFullClassName('character-card', props.additionalClassName);

  const [searchParams] = useSearchParams();

  return (
    <Link
      className={fullClassName}
      to={`/details/?page=${searchParams.get('page') ? searchParams.get('page') : 1}&details=${props.cardInfo.name}`}
    >
      <ul className="list character-card__info">
        {Object.entries(props.cardInfo).map((item) => (
          <li key={item[0].concat(`: ${item[1]}`)} className="list__item">
            <span className="character-card__info-name plain-text_highlight">{item[0].replace('_', ' ')}:</span>&nbsp;
            {item[1]}
          </li>
        ))}
      </ul>
      <img className="character-card__image" src={cardImg} alt="card image" />
    </Link>
  );
};

export default CharacterCard;
