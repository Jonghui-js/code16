import { SET_NAV } from './types';

export const setNav = boo => async dispatch => {
  dispatch({
    type: SET_NAV,
    payload: boo
  });
};
