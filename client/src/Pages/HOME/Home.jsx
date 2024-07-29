import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import homeStyle from "./Home.module.scss"

const Home = () => {
  const { getData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={homeStyle["home-main"]}>
      <section key={Date.now()} className={homeStyle.container}>
        {blogs?.map((blog) => (
          <section className={homeStyle["blog-card"]}>
            <h4>{blog?.title}</h4>
           <Link to={`/blog-details/${blog._id}`}><img src={ blog?.image[0]} alt={blog?.title} /></Link> 
          </section>
        ))}
      </section>
    </main>
  );
};

export default Home;
