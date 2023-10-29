import { CardInfoResponse, CardInfo } from '../../../types';
function transformResponseToCardInfo(response: CardInfoResponse[]): CardInfo[] {
  const result = response.map((item) => {
    const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = item;
    return {
      name,
      height,
      mass,
      hair_color,
      skin_color,
      eye_color,
      birth_year,
      gender,
    };
  });
  return result;
}

export default transformResponseToCardInfo;
