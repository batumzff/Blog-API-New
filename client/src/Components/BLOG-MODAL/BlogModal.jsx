import React, { useEffect, useRef, useState } from "react";
import style from "./BlogModal.module.scss";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useNavigate } from "react-router-dom";
import QuillEditor from "../QUILL/QuillEditor";

const BlogModal = ({
  title,
  image,
  isPublish,
  blogId,
  content,
  categoryId,
  onClose,
  postBlog,
}) => {
  const { categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getData, putBlog } = useBlogData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState({
    title,
    image,
    categoryId,
    isPublish,
    userId: user?.id,
  });
  const [text, setText] = useState(content);

  const quillRef = useRef("");

  useEffect(() => {
    getData("categories");
  }, []);

  const handleForm = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // console.log(inputs);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(quillRef.current.value)
    const sanitizedContent = DOMPurify.sanitize(quillRef.current.value, {
      USE_PROFILES: { html: true },
    });
    const postData = {
      ...inputs,
      content: sanitizedContent,
      categories: inputs.categoryId,
    };
    // console.log(postData)

    blogId
      ? putBlog("blogDetail", blogId, postData)
      : postBlog("blogs", postData);
    setInputs({ title: "", image: "", categoryId: "", isPublish: "" });
    setText("");
    onClose();
    blogId ? navigate(`/blog-details/${blogId}`) : navigate("/blogs");
  };

  const categoryName = (categories?.filter(
    (category) => category._id == categoryId
  ))[0]?.name;

  return (
    <main className={style["modal-main"]}>
      {open && (
        <div className={style["modal"]}>
          <form onSubmit={handleSubmit}>
            <div className={style["input-group"]}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleForm}
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>

              <QuillEditor value={content} ref={quillRef} />
            </div>
            <div className={style["input-group"]}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                name="image"
                value={inputs.image}
                onChange={handleForm}
              />
            </div>
            <div className={style["input-group"]}>
              <label>Categories*</label>
              <select
                name="categoryId"
                id="categories"
                value={inputs.categoryId}
                onChange={handleForm}
                required
              >
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={style["input-group"]}>
              <select
                name="isPublish"
                id="isPublish"
                value={inputs.isPublish}
                onChange={handleForm}
              >
                <option value="">Select Publish Status</option>
                <option value="true">Publish</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <section className={style.button}>
              <button>Submit</button>
              <button
                style={{ backgroundColor: "#ED0800" }}
                onClick={() => onClose(false)}
              >
                Close
              </button>
            </section>
          </form>
        </div>
      )}
    </main>
  );
};

export default BlogModal;
