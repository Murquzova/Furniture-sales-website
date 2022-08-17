import React from 'react';
import '../Home.scss';
import Small from '../../assets/hero-bcg-2.jpeg';
import Big from '../../assets/hero-bcg.jpeg';
import { Link } from 'react-router-dom';
const ComfortZone = () => {
  return (
    <div className="section">
      <div className="left">
        <h1>
          Design Your <br /> Comfort Zone
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
          sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </p>
        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>

      <div className="right">
        <div className="small">
          <img src={Small} alt="" />
        </div>
        <div className="big">
          <img src={Big} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ComfortZone;
