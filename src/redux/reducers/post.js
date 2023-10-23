import {
  POST_ACTIONS,
} from "../types/post";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  total: 0,
  activePage: 1,
  search: "",
  isModalOpen: false,
  isModalLoading: false,
  selected: null,
  imageLoading: false,
  imageData: null,
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ACTIONS:
      return { ...state, ...payload };
  }
  return state;
};

export default postsReducer;