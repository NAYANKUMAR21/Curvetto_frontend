import {
  BLOG_ADDING_ERROR,
  BLOG_ADDING_LOADING,
  BLOG_ADDING_SUCCESS,
  BLOG_FETCH_SUCCESS,
  BLOG_GET_SINGLE_SUCCESS,
} from '../types/blog.type';
import { BlogState } from '../utils/blog.init';
export const blogReducer = (state = BlogState, { type, payload }) => {
  switch (type) {
    case BLOG_ADDING_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case BLOG_ADDING_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case BLOG_GET_SINGLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        SingleBlog: payload,
      };
    }
    case BLOG_ADDING_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case BLOG_FETCH_SUCCESS: {
      let username = localStorage.getItem('username');
      let filter = payload.filter((item) => {
        if (username == item.userId.username) {
          return item;
        }
      });
      return {
        ...state,
        loading: false,
        error: false,
        blog: payload.reverse(),
        MyBlogs: filter.reverse(),
        userDetails: {
          username: username,
        },
      };
    }
    default: {
      return state;
    }
  }
};
