import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_MY_CONTENTS,
  GET_USER_ERROR,
  USER_DELETED,
  CLEAR_MYPAGE,
  MYPAGE_ERROR,
  UPDATE_USER,
} from './types';

// user의 글, 댓글, 이름, mbti 가져오기

export const getMyContents = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/mypage/${name}`);
    dispatch({
      type: GET_MY_CONTENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateProfile = ({ name, email, mbti }) => async (dispatch) => {
  console.log('업데이트');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, mbti });
  try {
    const res = await axios.put(`/api/mypage/${name}`, body, config);
    console.log(res.data);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete('/api/mypage');

    dispatch({ type: CLEAR_MYPAGE });
    dispatch({ type: USER_DELETED });
  } catch (err) {
    dispatch({
      type: MYPAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
