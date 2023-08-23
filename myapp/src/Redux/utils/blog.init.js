export const BlogState = {
  loading: false,
  error: false,
  blog: [],
  MyBlogs: [],
  userDetails: {
    username: localStorage.getItem('username'),
  },
  SingleBlog: {},
};
