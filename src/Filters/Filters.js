import React, { useEffect, useRef, useState } from 'react';
import { useGlobalFiltersContext } from '../contexts/filtersContext';
import { useGlobalContext } from '../contexts/productsContext';
import './Filters.scss';
import { Slider } from '@material-ui/core';
const Filters = () => {
  const {
    state: { products },
  } = useGlobalContext();
  const {
    searchProducts,
    changeCategory,
    selectCompany,
    changeColor,
    changeValue,
    clear,
    filtersState: { priceArr, value },
  } = useGlobalFiltersContext();
  const [categories, setCategories] = useState();
  const [company, setCompany] = useState();
  const [color, setColor] = useState();

  const [activeCategories, setActiveCategories] = useState('all');
  const [activeColor, setActiveColor] = useState('all');

  useEffect(() => {
    setCategories(['all', ...new Set(products.map((item) => item.category))]);
    setCompany(['all', ...new Set(products.map((item) => item.company))]);
    let mass = [
      'all',
      ...new Set(products.map((item) => item.colors).flat(Infinity)),
    ];
    setColor(mass);
  }, [products]);
  const refInput = useRef();
  const selectRef = useRef();
  return (
    <div className="filters ">
      <input
        ref={refInput}
        onChange={(e) => {
          searchProducts(e.target.value);
        }}
        placeholder="Search..."
        type="text"
      />
      <div className="category">
        <h5>Category</h5>
        <ul>
          {categories &&
            categories.map((p, index) => {
              return (
                <li key={index}>
                  <span
                    onClick={() => {
                      changeCategory(p);
                      setActiveCategories(p);
                    }}
                    className={activeCategories === p ? 'active-cat' : null}
                  >
                    {' '}
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="company">
        <h5>Company</h5>
        <select
          ref={selectRef}
          onClick={(e) => {
            selectCompany(e.target.value);
          }}
        >
          {company &&
            company.map((c) => {
              return (
                <option value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              );
            })}
        </select>
      </div>
      <div className="color">
        <h5>Colors</h5>
        <div className="mini">
          {color &&
            color.map((a) => {
              if (a === 'all') {
                return (
                  <span
                    className={activeColor === a ? 'activeall' : 'color-divall'}
                    onClick={() => {
                      setActiveColor(a);
                      changeColor(a);
                    }}
                  >
                    All
                  </span>
                );
              } else {
                return (
                  <button
                    className={activeColor === a ? 'active' : 'color-div'}
                    onClick={() => {
                      setActiveColor(a);
                      changeColor(a);
                    }}
                    style={{ background: a }}
                  ></button>
                );
              }
            })}
        </div>
      </div>
      <div className="rangeSlider">
        <h5>Price</h5>
        <div className="price">
          <button>{value[0]}</button>
          <button>{value[1]}</button>
        </div>
        <Slider
          style={{ width: '100%' }}
          min={0}
          max={3000}
          defaultValue={0}
          valueLabelDisplay="auto"
          value={value}
          onChange={changeValue}
        />
      </div>

      <div className="clear">
        <button
          onClick={() => {
            clear();
            setActiveColor('all');
            setActiveCategories('all');
            refInput.current.value = '';
            selectRef.current.value = 'all';
          }}
          className="btn"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
