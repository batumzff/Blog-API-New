import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./BlogCard.module.scss";

const BlogCard = () => {
  const { getAllBlogData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);
  useEffect(() => {
    getAllBlogData();
  }, []);

  console.log(blogs);
  return (
    <section className={style.main}>
      {blogs?.map((blog) => (
        <>
          <div key={blog._id} className={style["card-container"]}>
            <div className={`${style.card} ${style["card-img"]}`}>
              <div className={style["card-img"]} />
              <Link
                to={`/blog-details/${blog?._id}`}
                className={style["card-link"]}
              >
                <div
                  data-test="blogDetailButton"
                  className={style["card-img-hovered"]}
                  style={{
                    backgroundImage: `url(${blog?.image[0]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                  }}
                />
              </Link>
              <div className={style["card-info"]}>
                <div className={style["card-about"]}>
                  <span className={style["card-tag tag-news"]}>
                    {blog.categoryId.name}
                  </span>
                  <div className={style["card-time"]}>
                    {blog?.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : ""}
                  </div>
                </div>
                <h2 className={style["card-title"]}>{blog?.title}</h2>
                <div className={style["card-creator"]}>
                  by <span>{blog.userId.firstName}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </section>
  );
};

export default BlogCard;
