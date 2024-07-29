import React, { useEffect, useState } from "react";
import modalBlogStyle from "./BlogModal.module.scss";
import ReactQuill from "react-quill";
import { modules } from "../../Helpers/quillModules";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import useBlogData from "../../Custom-hooks/useBlogData";
import useAxios from "../../Custom-hooks/useAxios";
import { useNavigate } from "react-router-dom";
import BlogPost from "../BLOG-POST/BlogPost";

const BlogModal = ({
  title,
  image,
  isPublish,
  blogId,
  content,
  categoryId,
  onClose
}) => {
  const { categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getData, putBlog } = useBlogData();
  const { axiosWithToken } = useAxios();
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

console.log(inputs);
  const handleSubmit =  (e) => {
    e.preventDefault();
    const sanitizedContent = DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
    const postData = {
      ...inputs,
      content: sanitizedContent,
    };
    
     putBlog("blogDetail",blogId, postData);
    setInputs({ title: "", image: "", categoryId: "", isPublish: "" });
    setText("");
    onClose()
    navigate(`/blog-details/${blogId}`);
  };

  const categoryName = (categories?.filter(
    (category) => category._id == categoryId
  ))[0]?.name;

  

  return (
    <main className={modalBlogStyle["modal-main"]}>
      {open && (
        <div className={modalBlogStyle["modal"]}>
          {/* <button onClick={() => setOpen((prev) => !prev)}>X</button> */}

          <form onSubmit={handleSubmit}>
            <div className={modalBlogStyle["input-group"]}>
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
              <ReactQuill
                className={modalBlogStyle.quill}
                theme="snow"
                value={text}
                onChange={setText}
                modules={modules}
              />
            </div>
            <div className={modalBlogStyle["input-group"]}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                name="image"
                value={inputs.image}
                onChange={handleForm}
              />
            </div>
            <div className={modalBlogStyle["input-group"]}>
              <select
                key={Date.now()}
                name="categoryId"
                id="categories"
                value={inputs.categoryId}
                onChange={handleForm}
              >
                <option value={categoryId}>{categoryName}</option>
                {categories?.map((category) => (
                  <option value={category._id}>
                    {category.name == categoryName ? "" : category.name}
                    {/* {category.name} */}
                  </option>
                ))}
              </select>
            </div>
            <div className={modalBlogStyle["input-group"]}>
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
            <button>Submit</button>
            <button style={{marginLeft:"1rem", backgroundColor:"#ED0800"}} onClick={()=> onClose(false)}>Close</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default BlogModal;