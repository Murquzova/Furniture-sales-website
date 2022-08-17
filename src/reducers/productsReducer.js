import swal from 'sweetalert';
const reducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS') {
    return { ...state, products: action.payload };
  }
  if (action.type === 'ADD') {
    let newCartItems = [];
    newCartItems = [...state.cart, { ...action.payload, count: 1 }];
    let tempItem = state.cart.find((item) => item.id === action.payload.id);
    if (tempItem) {
      newCartItems = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          swal('Mehsulun sayi artirildi!', '', 'success');
          return {
            ...item,
            count: item.count + 1,
            totalCount: item.totalCount + 1,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: newCartItems,
        totalCount: state.totalCount + 1,
      };
    } else {
      swal('Mehsul sebete elave olundu!', '', 'success');
      return { ...state, cart: newCartItems, totalCount: state.totalCount + 1 };
    }
  }
  if (action.type === 'PLUS') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return {
          ...cartItem,
          count: cartItem.count + 1,
        };
      }
      return { ...cartItem };
    });
    return { ...state, cart: tempCart, totalCount: state.totalCount + 1 };
  }
  if (action.type === 'MINUS') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            count: cartItem.count - 1,
          };
        } else {
          return { ...cartItem };
        }
      })
      .filter((cartItem) => cartItem.count !== 0);
    return { ...state, cart: tempCart, totalCount: state.totalCount - 1 };
  }
  if (action.type === 'REMOVE') {
    let countItem;
    state.cart.map((c) => {
      if (c.id === action.payload) {
        countItem = c.count;
      }
    });
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      totalCount: state.totalCount - countItem,
    };
  }

  return state;
};

export default reducer;
