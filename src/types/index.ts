import { ChangeEvent } from 'react';

export interface Props {
  additionalClassName?: string;
  children?: JSX.Element;
}

export interface SearchResponse {
  count: string;
  next: string | null;
  previous: string | null;
  results: CardInfoResponse[];
}

export interface CardInfoResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface CardInfo {
  name?: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
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
  setCardInfos?: (value: CardInfo[]) => void;
  setLoader?: (value: boolean) => void;
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
  cardInfos: CardInfo[];
  loader?: boolean;
}

export interface ErrorMessageProps extends Props {
  errorMessage: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
