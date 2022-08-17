import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalFiltersContext } from '../contexts/filtersContext';
import { useGlobalContext } from '../contexts/productsContext';
import './Details.scss';
const Details = () => {
  const [productDetails, setProductDetails] = useState();
  const [activeImg, setActiveImg] = useState(0);
  const {
    add,
    state: { products },
  } = useGlobalContext();
  const { clear } = useGlobalFiltersContext();
  let { id } = useParams();
  const add_product = products.find((a) => a.id === id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://course-api.com/react-store-single-product?id=${id}            `
      );
      const product = await response.json();
      setProductDetails(product);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {productDetails && (
        <div className="details">
          <div className="backtoproducts">
            <Link to="/products">
              {' '}
              <button onClick={() => clear()}>Back To Products</button>{' '}
            </Link>
          </div>

          <div className="detal">
            <div className="item-image">
              <img
                className="active"
                src={productDetails.images[activeImg].url}
                alt=""
              />
              <div className="mini-img">
                {productDetails.images.map((image, index) => (
                  <img
                    className={activeImg == index ? 'act' : 'neactive'}
                    //   className={index === 0 ? 'active' : 'neactive'}
                    src={image.thumbnails.large.url}
                    onClick={() => setActiveImg(index)}
                  />
                ))}
              </div>
            </div>
            <div className="item-info">
              <h2>{productDetails.name}</h2>
              <p>Price: {Math.ceil(productDetails.price / 100)}$</p>
              <span>{productDetails.description}</span>
              <h5>
                Category : <span>{productDetails.category}</span>{' '}
              </h5>
              <h5>
                Brand : <span>{productDetails.company}</span>{' '}
              </h5>
              <h5>
                SKU : <span>{productDetails.id}</span>{' '}
              </h5>
              <h5 className="colors-main">
                Colors :
                {productDetails.colors.map((col) => (
                  <div className="color" style={{ background: col }}></div>
                ))}
              </h5>
              <button onClick={() => add(add_product)}>Add To Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
