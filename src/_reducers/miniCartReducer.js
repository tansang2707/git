import { TOGGLE_MINICART } from '../actions/actionType';

export default (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MINICART:
      return action.payload;
    default:
      return state;
  }
};
