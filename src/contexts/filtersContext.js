import filtersReducer from '../reducers/filtersReducer';
import React, { useContext, useEffect, useReducer } from 'react';

export const FiltersContext = React.createContext();

const initailState = {
  search: '',
  category: 'all',
  company: 'all',
  color: 'all',
  value: [0, 3110],
  sort: 'low',
};

export const FiltersProvider = ({ children }) => {
  const [filtersState, filtersDispatch] = useReducer(
    filtersReducer,
    initailState
  );

  const searchProducts = (id) => {
    filtersDispatch({ type: 'SEARCH', payload: id });
  };
  const changeCategory = (val) => {
    filtersDispatch({ type: 'CATEGORY', payload: val });
  };
  const selectCompany = (val) => {
    filtersDispatch({ type: 'COMPANY', payload: val });
  };
  const changeColor = (val) => {
    filtersDispatch({ type: 'COLOR', payload: val });
  };
  const changeValue = (e, value) => {
    filtersDispatch({ type: 'PRICE', payload: value });
  };
  const clear = () => {
    filtersDispatch({ type: 'CLEAR' });
  };
  const sortProducts = (val) => {
    filtersDispatch({ type: 'SORT', payload: val });
  };
  return (
    <FiltersContext.Provider
      value={{
        filtersState,
        changeColor,
        changeCategory,
        searchProducts,
        selectCompany,
        changeValue,
        clear,
        sortProducts,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useGlobalFiltersContext = () => {
  return useContext(FiltersContext);
};
