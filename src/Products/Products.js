import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/productsContext';
import { ImCart } from 'react-icons/im';
import { FiGrid } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import './Products.scss';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import { useGlobalFiltersContext } from '../contexts/filtersContext';
const Products = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const {
    state: { products },
    add,
  } = useGlobalContext();

  const {
    sortProducts,
    filtersState: { search, category, company, color, value, sort },
  } = useGlobalFiltersContext();

  const filtersProducts = () => {
    let sortedProducts = products;

    if (company) {
      if (company !== 'all') {
        sortedProducts = sortedProducts.filter((prod) => {
          return prod.company === company;
        });
      }
    }
    if (category) {
      if (category !== 'all') {
        sortedProducts = sortedProducts.filter((prod) => {
          return prod.category === category;
        });
      }
    }
    if (search) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (color !== 'all') {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.colors.includes(color);
      });
    }
    if (value) {
      sortedProducts = sortedProducts.filter((a) => {
        if (
          value[0] < Math.ceil(a.price / 100) &&
          value[1] > Math.ceil(a.price / 100)
        ) {
          return a;
        }
      });
    }
    if (sort === 'low') {
      sortedProducts = sortedProducts.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sort === 'high') {
      sortedProducts = sortedProducts.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (sort === 'a-z') {
      sortedProducts = sortedProducts.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === 'z-a') {
      sortedProducts = sortedProducts.sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });
    }
    return sortedProducts;
  };

  return (
    <>
      {/* <div className="transition"></div> */}

      <div className="container-lg p-4">
        <div className="row">
          <div className="col-lg-3  mt-4 ">
            <Filters />
          </div>
          <div className="col-lg-9 px-2 ">
            <div className="title">
              <div>
                <FiGrid
                  onClick={() => setActiveMenu(1)}
                  className={activeMenu === 1 ? 'menuiconactive' : 'menuicon'}
                />
                <AiOutlineMenu
                  onClick={() => setActiveMenu(2)}
                  className={activeMenu === 2 ? 'menuiconactive' : 'menuicon'}
                />
                <span>{filtersProducts().length} Products Found</span>
              </div>
              <div className="palka"></div>
              <div className="sort">
                <span> Sort By</span>
                <select
                  onChange={(e) => sortProducts(e.target.value)}
                  name=""
                  id=""
                >
                  <option value="low">Price(Lowest)</option>
                  <option value="high">Price(Highest)</option>
                  <option value="a-z">Name (A - Z)</option>
                  <option value="z-a">Name (Z - A)</option>
                </select>
              </div>
            </div>
            {activeMenu === 1 && (
              <div className="products">
                {filtersProducts().map((item) => {
                  return (
                    <div key={item.id} className="product">
                      <p>{item.name}</p>
                      <div className="image">
                        <img src={item.image} alt="" />
                        <Link to={`/details/${item.id}`}>
                          <FiSearch className="searchIcon" />
                        </Link>
                      </div>
                      <div className="addtocard">
                        <span>{Math.ceil(item.price / 100)} $</span>
                        <button onClick={() => add(item)} className="icon">
                          <ImCart />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeMenu === 2 && (
              <div className="products-line">
                {filtersProducts().map((item) => {
                  return (
                    <div key={item.id} className="product">
                      <div className="image">
                        <img src={item.image} alt="" />
                      </div>

                      <div className="product-info">
                        <p>{item.name}</p>
                        <span className="price">
                          Price: {Math.ceil(item.price / 100)}$
                        </span>
                        <span className="desc">
                          {item.description.substring(0, 149)}...
                        </span>
                        <div>
                          <button onClick={() => add(item)}>
                            {' '}
                            Add To Cart
                          </button>
                          <Link to={`/details/${item.id}`}>
                            <button> Details</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
