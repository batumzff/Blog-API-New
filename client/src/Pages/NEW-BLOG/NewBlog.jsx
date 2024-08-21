import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import useAxios from "../../Custom-hooks/useAxios";
import newBlogStyle from "./NewBlog.module.scss";
import useBlogData from "../../Custom-hooks/useBlogData";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";

const NewBlog = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const { axiosWithToken } = useAxios();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData("categories");
  }, []);

  const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={newBlogStyle["new-blog-main"]}>
      <main className={newBlogStyle["form-container"]}>
        <section>
          <BlogModal
            onClose={setShow}
            postBlog={postBlog}
            categories={categories}
          />
        </section>
      </main>
    </section>
  );
};

export default NewBlog;
