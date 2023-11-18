import { useContext } from 'react';
import SearchFormContext from './SearchFormContext';
import { SearchFormContextType } from '../../types';

const useSearchFormContext = (): SearchFormContextType => {
  const context = useContext(SearchFormContext);
  if (!context) {
    throw new Error('useSearchFormContext must be used inside SearchFormProvider');
  }
  return context;
};

export default useSearchFormContext;
