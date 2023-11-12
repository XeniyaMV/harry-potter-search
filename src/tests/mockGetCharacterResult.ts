import { CharacterResponse } from '../types';

// type FunctionType = () => CharacterResponse;

const mockGetCharacterResult = jest.fn(function (): CharacterResponse {
  return {
    data: {
      id: '1',
      type: 'character',
      attributes: {
        alias_names: ['Harry'],
        animagus: null,
        blood_status: 'pure',
        boggart: 'dementor',
        born: '31 july',
        died: null,
        eye_color: 'green',
        family_members: null,
        marital_status: 'married',
        gender: 'male',
        hair_color: 'brown',
        height: '6',
        house: 'Grifindor',
        image: null,
        jobs: null,
        name: 'Harry James Potter',
        nationality: null,
        patronus: 'dear',
        romances: null,
        skin_color: null,
        slug: null,
        species: 'Human',
        titles: null,
        wand: null,
        weight: '170',
        wiki: null,
      },
    },
  };
});

export default mockGetCharacterResult;
