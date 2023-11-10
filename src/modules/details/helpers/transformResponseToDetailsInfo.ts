import { CardInfoResponse, DetailsInfo } from '../../../types';

function transformResponseToDetailsInfo(response: CardInfoResponse): DetailsInfo {
  const {
    name,
    height,
    weight,
    hair_color,
    skin_color,
    eye_color,
    born,
    died,
    marital_status,
    gender,
    image,
    patronus,
    blood_status,
    species,
    jobs,
  } = response.attributes;
  return {
    id: response.id,
    name,
    height,
    weight,
    gender,
    marital_status,
    died,
    born,
    hair_color,
    eye_color,
    skin_color,
    species,
    patronus,
    blood_status,
    jobs,
    image,
  };
}

export default transformResponseToDetailsInfo;
