import { CardInfoResponse, DetailsInfo } from '../../../types';

function transformResponseToDetailsInfo(response: CardInfoResponse, films: string[]): DetailsInfo {
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = response;
  return {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    films,
  };
}

export default transformResponseToDetailsInfo;
