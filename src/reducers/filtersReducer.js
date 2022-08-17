const filtersReducer = (state, action) => {
  if (action.type === 'SEARCH') {
    return { ...state, search: action.payload };
  }
  if (action.type === 'CATEGORY') {
    return { ...state, category: action.payload };
  }
  if (action.type === 'COMPANY') {
    return { ...state, company: action.payload };
  }
  if (action.type === 'COLOR') {
    return { ...state, color: action.payload };
  }
  if (action.type === 'PRICE') {
    return { ...state, value: action.payload };
  }
  if (action.type === 'SORT') {
    return { ...state, sort: action.payload };
  }
  if (action.type === 'CLEAR') {
    return {
      ...state,
      search: '',
      category: 'all',
      company: 'all',
      color: 'all',
      value: [0, 3110],
    };
  }
  return state;
};

export default filtersReducer;
