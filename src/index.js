import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FiltersProvider } from './contexts/filtersContext';
import { ProductsProvider } from './contexts/productsContext';
ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
