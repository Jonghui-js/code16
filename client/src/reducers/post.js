import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  REWRITE_POST,
  GET_CURRENTPOSTS
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  editing: false,
  error: {},
  pagination: { currentPage: 1, currentPosts: [], totalPages: 100 }
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        post: null,
        posts: payload,
        loading: false,
        editing: false
      };
    case GET_CURRENTPOSTS:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: payload.currentPage,
          currentPosts: payload.currentPosts,
          totalPages: payload.totalPages
        }
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
        posts: state.posts.filter(post => post._id !== payload),
        editing: false,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case REWRITE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.filter(post => post._id !== payload._id),
          payload
        ],
        editing: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
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
