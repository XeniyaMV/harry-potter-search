import { CardInfoResponse, CardInfo } from '../../../types';
function transformResponseToCardInfo(response: CardInfoResponse[]): CardInfo[] {
  const result = response.map((item) => {
    const { name, height, birth_year, gender } = item;
    return {
      name,
      height,
      birth_year,
      gender,
    };
  });
  return result;
}

export default transformResponseToCardInfo;
