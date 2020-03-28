import { SET_NAV } from './types';

export const setNav = () => async dispatch => {
  dispatch({
    type: SET_NAV,
    payload: true
  });
};
