import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/HOME/Home";
import Categories from "../Pages/CATEGORIES/Categories";
import Blogs from "../Pages/BLOG/Blogs";
import CategoryDetail from "../Pages/CATEGORY-DETAIL/CategoryDetail";
const Register = lazy(() => import("../Pages/REGISTER/Register"));
const Login = lazy(() => import("../Pages/LOGIN/Login"));
const Contact = lazy(() => import("../Pages/CONTACT/Contact"));
const About = lazy(() => import("../Pages/ABOUT/About"));
const MyProfile = lazy(() => import("../Pages/MY-PROFILE/MyProfile"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const BlogDetails = lazy(() => import("../Pages/BLOG-DETAILS/BlogDetails"));
const NewBlog = lazy(() => import("../Pages/NEW-BLOG/NewBlog"));
const PrivateRouter = lazy(() => import("./PrivateRouter"));

const AppRouter = () => {
  return (
    
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category-detail" element={<CategoryDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="new-blog" element={<NewBlog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="blog-details/:blogId" element={<PrivateRouter />}>
            <Route path="" element={<BlogDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
   
  );
};

export default AppRouter;
