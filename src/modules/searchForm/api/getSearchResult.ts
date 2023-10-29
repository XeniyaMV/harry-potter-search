import { CardInfoResponse } from '../../../types';
import { SearchResponse } from '../../../types';

async function getSearchResult(
  baseUrl: string,
  path: string,
  search?: string,
  page?: number
): Promise<CardInfoResponse[]> {
  const fullPath = `${baseUrl}${path}?search=${search || ''}&page=${page || '1'}`;
  const resp = await fetch(fullPath);
  const result: SearchResponse = await resp.json();
  return result.results;
}

export default getSearchResult;
