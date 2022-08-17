import React from 'react';
import { useGlobalContext } from '../contexts/productsContext';
import { FiTrash2 } from 'react-icons/fi';
import './Cart.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import EmptyCart from '../assets/illustration-cart.svg';
const Cart = () => {
  const {
    state: { cart },
    minus,
    plus,
    remove,
  } = useGlobalContext();
  console.log(cart);
  if (cart.length) {
    return (
      <div className="cartmainpage">
        <div className="maintable">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>{/* <FiTrash2 /> */}</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt="" />
                    </td>
                    <td>{Math.ceil(product.price / 100)}$</td>
                    <td>
                      <div>
                        <AiOutlineMinus
                          onClick={() => minus(product.id)}
                          className="plusminus"
                        />
                        <span>{product.count}</span>
                        <AiOutlinePlus
                          onClick={() => plus(product.id)}
                          className="plusminus"
                        />
                      </div>
                    </td>
                    <td>{Math.ceil(product.price / 100) * product.count}$</td>
                    <td>
                      <FiTrash2
                        className="trash"
                        onClick={() => remove(product.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span>Your cart is empty.</span>
        <img src={EmptyCart} alt="" />
      </div>
    );
  }
};

export default Cart;
