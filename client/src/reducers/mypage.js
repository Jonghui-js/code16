import {
  GET_MY_CONTENTS,
  CLEAR_MYPAGE,
  GET_USER_ERROR,
  MYPAGE_ERROR,
} from '../actions/types';

const initialState = {
  myposts: null,
  mycomments: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_CONTENTS:
      return {
        ...state,
        myposts: payload.myposts,
        mycomments: payload.mycomments,
        loading: false,
      };
    case CLEAR_MYPAGE:
      return {
        ...state,
        myposts: null,
        mycomments: null,
        loading: false,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case MYPAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
