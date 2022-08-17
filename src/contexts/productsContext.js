import productsReducer from '../reducers/productsReducer';
import React, { useContext, useEffect, useReducer } from 'react';
const products_url = 'https://course-api.com/react-store-products';

export const ProductsContext = React.createContext();

const initailState = {
  loading: false,
  cart: [],
  total: 0,
  totalCount: 0,
  products: [],
};

export const ProductsProvider = ({ children }) => {
  const [state, productsDispatch] = useReducer(productsReducer, initailState);

  const add = (item) => {
    productsDispatch({ type: 'ADD', payload: item });
  };

  const plus = (id) => {
    productsDispatch({ type: 'PLUS', payload: id });
  };
  const minus = (id) => {
    productsDispatch({ type: 'MINUS', payload: id });
  };
  const remove = (id) => {
    productsDispatch({ type: 'REMOVE', payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      productsDispatch({ type: 'LOADING' });
      const response = await fetch(products_url);
      const products = await response.json();
      productsDispatch({ type: 'GET_PRODUCTS', payload: products });
    };
    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ state, remove, minus, add, plus }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(ProductsContext);
};
