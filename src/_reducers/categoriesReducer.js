import { FETCH_CATEGORIES, TOGGLE_CATEGORIES } from '../actions/actionType';

const INIT_STATE = { categories: null, visible: false };

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case TOGGLE_CATEGORIES:
      return { ...state, visible: action.payload };
    default:
      return state;
  }
};
