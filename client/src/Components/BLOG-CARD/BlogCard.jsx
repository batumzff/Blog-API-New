import React, { useEffect, useState } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./BlogCard.module.scss";

const BlogCard = () => {
  const { getAllBlogData, getData } = useBlogData();
  const { blogs, details } = useSelector((state) => state.blog);
  const [pages, setPages] = useState({
    previousPage: null,
    currentPage: 1,
    nextPage: null,
    totalPages: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (details?.pages) {
      setPages({
        previousPage: details.pages.previous_page || null,
        currentPage: details.pages.current_page,
        nextPage: details.pages.next_page || null, 
        totalPages: details.pages.total_pages,
      });
    }
  }, [details]);

  console.log(details);
  console.log(details?.pages?.current_page);
  console.log("pages state: ", pages);

  const handlePage = (newPage) => {
    if (newPage !== pages.currentPage && newPage > 0 && newPage <= pages.totalPages)
     {
      setPages((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
      getData("blogs", newPage);
    }
  };
  return (
    <>
      <section className={style.main}>
        <main className={style.main}>
          {blogs?.map((blog) => (
            <>
              <div key={blog._id} className={style["card-container"]}>
                <Link
                  to={`/blog-details/${blog?._id}`}
                  className={style["card-link"]}
                >
                  <div className={`${style.card} ${style["card-img"]}`}>
                    <div className={style["card-img"]} />

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
                </Link>
              </div>
            </>
          ))}
        </main>
      </section>
      <section className={style.page}>
      {pages.previousPage && (
              <div onClick={() => handlePage(pages.previousPage)}>
                {pages.previousPage}
              </div>
            )}
            <div>{pages.currentPage}</div>
            {pages.nextPage  && pages.nextPage <= pages.totalPages && (
              <div onClick={() => handlePage(pages.nextPage)}>
                {pages.nextPage}
              </div>
            )}
      </section>
    </>
  );
};

export default BlogCard;
