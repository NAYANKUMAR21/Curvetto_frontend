import { Route, Routes } from 'react-router-dom';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import ArticleList from '../Components/BlogList';

import WriteBlog from '../Components/WriteBlog';
import WithBackgroundImage from '../Components/SingleBlog';
import MyArticleList from '../Components/Myvlogs';
import PrivateROute from '../hoc/PrivateROute';
import ViewBlog from '../Components/ViewBlogs';

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      {/* this is all blogs down one */}
      <Route
        path="/"
        element={
          <>
            <ArticleList />
          </>
        }
      ></Route>
      <Route
        path="/edit-view-blogs"
        element={
          <PrivateROute>
            <ViewBlog />
          </PrivateROute>
        }
      ></Route>
      <Route
        path="/my-blogs"
        element={
          <PrivateROute>
            <MyArticleList />
          </PrivateROute>
        }
      ></Route>
      <Route
        path="/write-blog"
        element={
          <PrivateROute>
            <WriteBlog />
          </PrivateROute>
        }
      ></Route>
      <Route
        path="/single/:id"
        element={
          <PrivateROute>
            <WithBackgroundImage />
          </PrivateROute>
        }
      ></Route>
    </Routes>
  );
};

export default Allroutes;
