import { SearchResponse } from '../../types';
import limitsPerPage from '../constants/limitsPerPage';

async function getSearchResult(
  baseUrl: string,
  path: string,
  search?: string,
  page?: number,
  limit?: string
): Promise<SearchResponse> {
  const fullPath = `${baseUrl}${path}?filter[name_cont]=${search || ''}&page[size]=${
    limit || limitsPerPage.opt1
  }&page[number]=${page || '1'}`;
  const resp = await fetch(fullPath);

  if (!resp.ok) {
    throw new Error(`Failed to fetch search data. Status: ${resp.status}`);
  }

  const result: SearchResponse = await resp.json();
  return result;
}

export default getSearchResult;
