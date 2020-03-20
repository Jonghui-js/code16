import axios from 'axios';
import {
  GET_MY_CONTENTS,
  GET_USER_ERROR,
  USER_DELETED,
  CLEAR_MYPAGE,
  MYPAGE_ERROR
} from './types';

// user의 글, 댓글, 이름, mbti 가져오기

export const getMyContents = name => async dispatch => {
  try {
    const res = await axios.get(`/api/mypage/${name}`);
    dispatch({
      type: GET_MY_CONTENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccount = () => async dispatch => {
  try {
    await axios.delete('/api/mypage');

    dispatch({ type: CLEAR_MYPAGE });
    dispatch({ type: USER_DELETED });
  } catch (err) {
    dispatch({
      type: MYPAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
