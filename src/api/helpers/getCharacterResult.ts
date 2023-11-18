import { CharacterResponse } from '../../types';

async function getCharacterResult(baseUrl: string, path: string, id: string): Promise<CharacterResponse> {
  const fullPath = `${baseUrl}${path}${id}`;
  const resp = await fetch(fullPath);

  if (!resp.ok) {
    throw new Error(`Failed to fetch character data. Status: ${resp.status}`);
  }

  const result: CharacterResponse = await resp.json();
  return result;
}

export default getCharacterResult;
