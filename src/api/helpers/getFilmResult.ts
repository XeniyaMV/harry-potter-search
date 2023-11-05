import { FilmResponse } from '../../types';

async function getFilmResult(path: string): Promise<FilmResponse> {
  const resp = await fetch(path);
  const result: FilmResponse = await resp.json();
  return result;
}

export default getFilmResult;
