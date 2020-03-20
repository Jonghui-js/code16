import {
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_POST,
  GET_CURRENTPOSTS
} from '../actions/types';

const initialState = {
  post: null,
  loading: true,
  editing: false,
  error: {},
  pagination: { currentPage: 1, currentPosts: [], totalPages: 10 }
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENTPOSTS:
      return {
        ...state,
        post: null,
        pagination: {
          ...state.pagination,
          currentPage: payload.currentPage,
          currentPosts: payload.currentPosts,
          totalPages: payload.totalPages
        },
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
        editing: true
      };
    case ADD_POST:
      return {
        ...state,
        /* [...state.posts, payload] 로 하면 최신글이 밑으로 깔림 */
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        editing: false,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        editing: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
