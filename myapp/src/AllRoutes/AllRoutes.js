import { Route, Routes } from 'react-router-dom';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import ArticleList from '../Components/BlogList';

import WriteBlog from '../Components/WriteBlog';
import WithBackgroundImage from '../Components/SingleBlog';
import MyArticleList from '../Components/Myvlogs';

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      {/* this is all blogs down one */}
      <Route path="/" element={<ArticleList />}></Route>
      <Route path="/edit-blogs" element={<h1>edit-blogs</h1>}></Route>
      <Route path="/my-blogs" element={<MyArticleList />}></Route>
      <Route path="/write-blog" element={<WriteBlog />}></Route>
      <Route path="/single/:id" element={<WithBackgroundImage />}></Route>
    </Routes>
  );
};

export default Allroutes;
