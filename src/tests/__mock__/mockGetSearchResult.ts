import { SearchResponse } from '../../types';

const mockGetSearchResult = jest.fn(function (): SearchResponse {
  return {
    data: [
      {
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
    ],
    links: {
      current: '/2',
      first: '/1',
      last: '/3',
      self: '/1',
      next: '/3',
      prev: '/1',
    },
    meta: {
      copyright: '',
      generated_at: '',
      pagination: {
        current: 2,
        first: 1,
        last: 3,
        records: 5,
        next: 3,
        prev: 1,
      },
    },
  };
});

export default mockGetSearchResult;
