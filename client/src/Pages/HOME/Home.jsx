import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";

import homeStyle from "./Home.module.scss";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";

const Home = () => {
  const { getData } = useBlogData();

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={homeStyle["home-main"]}>
      <section className={homeStyle.container}>
        <BlogCard />
      </section>
    </main>
  );
};

export default Home;
