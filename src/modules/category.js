import axios from "../api/axios";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const TOGGLE_CATEGORIES = "TOGGLE_CATEGORIES";

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

// Action creator
export const toggleCategories = visible => async dispatch => {
  dispatch({ type: TOGGLE_CATEGORIES, payload: visible });
};

export const fetchCategories = () => async dispatch => {
  let response;
  try {
    response = await axios.get("/categories");
    dispatch({ type: FETCH_CATEGORIES, payload: response.data.data.docs });
  } catch (e) {
    console.log(e);
  }

  return response;
};
