import {
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_POST,
  UPDATE_COMMENT,
  GET_CURRENTPOSTS,
} from '../actions/types';

const initialState = {
  post: null,
  editing: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENTPOSTS:
      return {
        ...state,
        post: null,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        editing: true,
      };
    case ADD_POST:
      return {
        ...state,
      };
    case DELETE_POST:
      return {
        ...state,
        editing: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_POST:
      return {
        ...state,
        editing: false,
      };
    case ADD_COMMENT:
    case UPDATE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    default:
      return state;
  }
}
