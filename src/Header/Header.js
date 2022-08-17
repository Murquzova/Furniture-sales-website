import React from 'react';
import { links } from '../constants';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import './Header.scss';
import { FaShoppingCart } from 'react-icons/fa';
import { useGlobalContext } from '../contexts/productsContext';

const Header = () => {
  const {
    state: { totalCount },
  } = useGlobalContext();
  return (
    <React.Fragment>
      <div className="main-header">
        <div className="header">
          <div className="header_logo">
            <img src={logo} alt="Image" />
          </div>
          <div className="header_list">
            <ul>
              {links.map((link) => {
                return (
                  <li>
                    <Link to={`${link.url}`} key={link.id}>
                      {link.text}{' '}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="header_card">
            <Link to="/cart">
              <FaShoppingCart className="card" />
              <span>{totalCount}</span>
            </Link>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
};

export default Header;
