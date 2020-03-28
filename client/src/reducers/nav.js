import { SET_NAV } from '../actions/types';

const initialState = {
  navState: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_NAV:
      return {
        ...state,
        navState: payload
      };
    default:
      return state;
  }
}
