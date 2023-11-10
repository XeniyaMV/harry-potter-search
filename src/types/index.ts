import { ChangeEvent } from 'react';

export interface Props {
  additionalClassName?: string;
  children?: JSX.Element;
}

export interface SearchResponse {
  data: CardInfoResponse[];
  links: {
    current: string;
    first: string;
    last: string;
    self: string;
    next?: string;
    prev?: string;
  };
  meta: {
    copyright: string;
    generated_at: string;
    pagination: {
      current: number;
      first: number;
      last: number;
      records: number;
      next?: number;
      prev?: number;
    };
  };
}

export interface CharacterResponse {
  data: CardInfoResponse;
}

export interface FilmResponse {
  url: string;
  title: string;
  characters: string[];
  created: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  produser: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}

export interface CharacterAttributes {
  alias_names: string[] | null;
  animagus: string | null;
  blood_status: string | null;
  boggart: string | null;
  born: string | null;
  died: string | null;
  eye_color: string | null;
  family_members: string[] | null;
  marital_status: string | null;
  gender: string | null;
  hair_color: string | null;
  height: string | null;
  house: string | null;
  image: string | null;
  jobs: string[] | null;
  name: string | null;
  nationality: string | null;
  patronus: string | null;
  romances: string[] | null;
  skin_color: string | null;
  slug: string | null;
  species: string | null;
  titles: string[] | null;
  wand: string[] | null;
  weight: string | null;
  wiki: string | null;
}

export interface CardInfoResponse {
  // name: string;
  // height: string;
  // mass: string;
  // hair_color: string;
  // skin_color: string;
  // eye_color: string;
  // birth_year: string;
  // gender: string;
  // homeworld: string;
  // films: string[];
  // species: string[];
  // vehicles: string[];
  // starships: string[];
  // created: string;
  // edited: string;
  // url: string;
  id: string | null;
  type: string | null;
  attributes: CharacterAttributes;
}

export interface CardInfo {
  id: string | null;
  name: string | null;
  height: string | null;
  weight: string | null;
  gender: string | null;
  born: string | null;
  died: string | null;
  image: string | null;
}

export interface DetailsInfo extends CardInfo {
  hair_color: string | null;
  skin_color: string | null;
  eye_color: string | null;
  marital_status: string | null;
  blood_status: string | null;
  patronus: string | null;
  species: string | null;
  jobs: string[] | null;
}

export interface LogoProps extends Props {
  link: string;
  title?: string;
  iconUrl?: string;
}

export interface HeaderProps extends Props {}

export interface SearchFormProps extends Props {
  submitTitle: string;
  inputPlaceholder?: string;
  loader?: boolean;
  setCardInfos?: (value: CardInfoResponse[]) => void;
  setLoader?: (value: boolean) => void;
  setHasNextPage?: (value: boolean) => void;
  setHasPrevPage?: (value: boolean) => void;
}

export interface SearchInputProps extends Props {
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  inputPlaceholder?: string;
}

export interface CharacterCardProps extends Props {
  cardInfo: CardInfo;
}

export interface CharacterCardsProps extends Props {
  cardInfos: CardInfoResponse[];
  loader?: boolean;
}

export interface ErrorMessageProps extends Props {
  errorMessage: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface PaginationProps extends Props {
  hasNext: boolean;
  hasPrev: boolean;
  setHasNext: (value: boolean) => void;
  setHasPrev: (value: boolean) => void;
  setCardInfos: (value: CardInfoResponse[]) => void;
  setLoader?: (value: boolean) => void;
}
