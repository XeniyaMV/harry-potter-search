import { createContext } from 'react';
import { SearchFormContextType } from '../../types';

const SearchFormContext = createContext<SearchFormContextType | undefined>(undefined);

export default SearchFormContext;
