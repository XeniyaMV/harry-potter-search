import { Component } from 'react';
import { CharacterCardProps } from '../../types';
import getFullClassName from '../../helpers/getFullClassName';
import cardImg from '../../assets/card-picture.jpg';

class CharacterCard extends Component<CharacterCardProps> {
  private fullClassName = getFullClassName('character-card', this.props.additionalClassName);

  public render(): JSX.Element {
    return (
      <div className={this.fullClassName}>
        <ul className="list character-card__info">
          {Object.entries(this.props.cardInfo).map((item) => (
            <li key={item[0].concat(`: ${item[1]}`)} className="list__item">
              <span className="character-card__info-name plain-text_highlight">{item[0].replace('_', ' ')}:</span>&nbsp;
              {item[1]}
            </li>
          ))}
        </ul>
        <img className="character-card__image" src={cardImg} alt="card image" />
      </div>
    );
  }
}

export default CharacterCard;
