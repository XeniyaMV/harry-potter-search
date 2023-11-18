import { enableFetchMocks } from 'jest-fetch-mock';
import getSearchResult from '../api/helpers/getSearchResult';
import { SearchResponse } from '../types';

enableFetchMocks();

describe('getSearchResult', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches search data correctly', async () => {
    const baseUrl = 'https://example.com/api/';
    const path = 'characters/';
    const search = 'search';
    const page = 1;
    const limit = '10';

    const mockSearchResponse: SearchResponse = {
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

    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResponse), { status: 200 });
    const result = await getSearchResult(baseUrl, path, search, page, limit);

    expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}${path}?filter[name_cont]=${search}&page[size]=${limit}&page[number]=${page}`
    );
    expect(result).toEqual(mockSearchResponse);
  });

  it('handles failed API request', async () => {
    const baseUrl = 'https://example.com/api/';
    const path = 'characters/';
    const search = 'search';
    const page = 1;
    const limit = '10';

    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Not Found' }), { status: 404 });

    await expect(getSearchResult(baseUrl, path, search, page, limit)).rejects.toThrow(
      'Failed to fetch search data. Status: 404'
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}${path}?filter[name_cont]=${search}&page[size]=${limit}&page[number]=${page}`
    );
  });
});
