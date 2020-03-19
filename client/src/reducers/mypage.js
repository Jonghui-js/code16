import {
  GET_MY_CONTENTS,
  UPDATE_USER,
  CLEAR_USER,
  GET_USER_ERROR
} from '../actions/types';

const initialState = {
  myposts: [],
  mycomments: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_CONTENTS:
      return {
        ...state,
        myposts: payload.myposts,
        mycomments: payload.mycomments,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        myposts: null,
        mycomments: null,
        loading: false
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
