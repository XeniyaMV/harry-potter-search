import { enableFetchMocks } from 'jest-fetch-mock';
import getCharacterResult from '../api/helpers/getCharacterResult';
import { CharacterResponse } from '../types';

enableFetchMocks();

describe('getCharacterResult', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches character data correctly', async () => {
    const baseUrl = 'https://example.com/api/';
    const path = 'characters/';
    const id = '1';

    const mockCharacterResponse: CharacterResponse = {
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

    fetchMock.mockResponseOnce(JSON.stringify(mockCharacterResponse), { status: 200 });
    const result = await getCharacterResult(baseUrl, path, id);

    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${path}${id}`);
    expect(result).toEqual(mockCharacterResponse);
  });

  it('handles failed API request', async () => {
    const baseUrl = 'https://example.com/api/';
    const path = 'characters/';
    const id = '1';

    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Not Found' }), { status: 404 });

    await expect(getCharacterResult(baseUrl, path, id)).rejects.toThrow('Failed to fetch character data. Status: 404');

    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}${path}${id}`);
  });
});
