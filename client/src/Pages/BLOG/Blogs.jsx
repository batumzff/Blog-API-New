import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import blogStyle from "./Blog.module.scss";

const Blogs = () => {
  const { getAllBlogData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);
  useEffect(() => {
    getAllBlogData();
  }, []);

  console.log(blogs);
  return (
    <main className={blogStyle.main}>
      <section key={Date.now()} className={blogStyle["main-section"]}>
        {blogs?.map((blog) => (
          <main key={blog._id}>
            <h2>{blog?.title}</h2>
            <section>
              <img src={blog?.image[0]} alt="blog-image" />
            </section>
            {/* <p className={blogStyle.content}>{blog?.content}</p> */}
            <BlogPost content={blog?.content} />
            <span>likes{blog?.totalLikes}</span>
            <span>
              viewed by
              {blog?.countOfViews.length == 0 ? 1 : blog?.countOfViews.length}
            </span>
            <div>
              {blog?.createdAt ? new Date(blog.createdAt).toLocaleString() : ""}
            </div>
            {/* <div>{blog?.updatedAt
                ? new Date(blog.updatedAt).toLocaleString()
                : ""}</div> */}
            <Link
              to={`/blog-details/${blog?._id}`}
              className={blogStyle["new-blog-link"]}
            >
              <button>Read more</button>
            </Link>
          </main>
        ))}
      </section>
      <section className={blogStyle["add-blog-link"]}>
        <Link to="/new-blog">Add New Blog</Link>
      </section>
    </main>
  );
};

export default Blogs;
