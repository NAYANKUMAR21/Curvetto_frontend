import axios from 'axios';

import {
  BLOG_ADDING_ERROR,
  BLOG_ADDING_LOADING,
  BLOG_ADDING_SUCCESS,
  BLOG_FETCH_SUCCESS,
  BLOG_GET_SINGLE_SUCCESS,
} from '../types/blog.type';
const URL_BACK = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
export const PostBlog = (blog) => async (dispatch, state) => {
  try {
    const token = localStorage.getItem('accessToken');
    console.log(URL_BACK, blog, token);
    dispatch({ type: BLOG_ADDING_LOADING });
    const getall = await axios.post(`${URL_BACK}/blogs/post-blog`, blog, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return dispatch({ type: BLOG_ADDING_SUCCESS });
  } catch (er) {
    console.log(er.message);
    return dispatch({ type: BLOG_ADDING_ERROR });
  }
};
export const postComment = (body) => async (dispatch, state) => {
  try {
    dispatch({ type: BLOG_ADDING_LOADING });
    const token = localStorage.getItem('accessToken');
    await axios.post(`${URL_BACK}/comments/add-comment`, body, {
      headers: {
        Authorization: `${token}`, // Add the token to the Authorization header
      },
    });
    return dispatch({ type: BLOG_ADDING_SUCCESS });
  } catch (er) {
    console.log(er.message);
    return dispatch({ type: BLOG_ADDING_ERROR });
  }
};
export const getBlogs = () => async (dispatch, state) => {
  try {
    dispatch({ type: BLOG_ADDING_LOADING });
    const getAll = await axios.get(`${URL_BACK}/blogs/all-blogs`);
    dispatch({ type: BLOG_FETCH_SUCCESS, payload: getAll.data });
  } catch (er) {
    console.log(er.message);
    dispatch({ type: BLOG_ADDING_ERROR });
  }
};
export const getSingleBlog = (id) => async (dispatch, state) => {
  try {
    dispatch({ type: BLOG_ADDING_LOADING });
    const getSingle = await axios.get(`${URL_BACK}/blogs/single-blog/${id}`);
    return dispatch({ type: BLOG_GET_SINGLE_SUCCESS, payload: getSingle.data });
  } catch (er) {
    return dispatch({ type: BLOG_ADDING_ERROR });
  }
};
