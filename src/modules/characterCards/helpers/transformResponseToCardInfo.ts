import { CardInfoResponse, CardInfo } from '../../../types';
function transformResponseToCardInfo(response: CardInfoResponse[]): CardInfo[] {
  const result = response.map((item) => {
    const { name, height, weight, gender, born, died, image } = item.attributes;
    return {
      id: item.id,
      name,
      height,
      weight,
      gender,
      born,
      died,
      image,
    };
  });
  return result;
}

export default transformResponseToCardInfo;
