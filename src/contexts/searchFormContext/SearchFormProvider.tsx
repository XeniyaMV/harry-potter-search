import { useState } from 'react';
import SearchFormContext from './SearchFormContext';
import { CardInfoResponse } from '../../types';

const SearchFormProvider = (props: { children: JSX.Element }): JSX.Element => {
  const initSearchTerm = localStorage.getItem('searchTerm');
  const [searchTerm, setSearchTerm] = useState(initSearchTerm || '');
  const [cardInfos, setCardInfos] = useState<CardInfoResponse[]>([]);

  const updateSearchTerm = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
  };

  const updateCardInfos = (cardInfos: CardInfoResponse[]): void => {
    setCardInfos(cardInfos);
  };
  return (
    <SearchFormContext.Provider value={{ searchTerm, updateSearchTerm, cardInfos, updateCardInfos }}>
      {props.children}
    </SearchFormContext.Provider>
  );
};

export default SearchFormProvider;
