import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import useAxios from "../../Custom-hooks/useAxios";
import newBlogStyle from "./NewBlog.module.scss";
import useBlogData from "../../Custom-hooks/useBlogData";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { modules } from "../../Helpers/quillModules";
import useDebounce from "../../Custom-hooks/useDebounce";

let count=0
const NewBlog = () => {
  count++
  console.log(count);
  const { categories } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const { axiosWithToken } = useAxios();
  // const [inputs, setInputs] = useState({
  //   title: "",
  //   image: "",
  //   categories: "",
  //   isPublish: "",
  // });
  // const [inputs, setInputs] = useState({
  //   title: "",
  //   image: "",
  //   categories: "",
  //   isPublish: "",
  // });

  const inputRefs = useRef({
    title: "",
    image: "",
    categories: "",
    isPublish: "",
  });
  // console.log("categories", categories);
  const [text, setText] = useState("");
  const quillRef = useRef(null)
  // const debouncedInputs = useDebounce(inputs, 500)

  const navigate = useNavigate()

  useEffect(() => {
    getData("categories");
  }, []);


  const handleForm = (e) => {
    const { name, value } = e.target;
    inputRefs.current[name] = value ;
    
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedContent = DOMPurify.sanitize(quillRef.current.value, { USE_PROFILES: { html: true } });
   
    const postData = {
      ...inputRefs.current,
      content: sanitizedContent,
    };
    console.log(postData);
    await postBlog("blogs", postData);
   
    navigate("/blogs")
  };

 const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    
  };


  return (
    <section className={newBlogStyle["new-blog-main"]}>
      <main className={newBlogStyle["form-container"]}>
        <section>
          <form onSubmit={handleSubmit}>
            <div className={newBlogStyle["input-group"]}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={inputRefs.title}
                onChange={handleForm}
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <ReactQuill
                className={newBlogStyle.quill}
                theme="snow"
                modules={modules}
                ref= {quillRef}
              />
            </div>
            <div className={newBlogStyle["input-group"]}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                name="image"
                value={inputRefs.image}
                onChange={handleForm}
              />
            </div>
            <div className={newBlogStyle["input-group"]}>
              <select
                key={Date.now()}
                name="categories"
                id="categories"
                value={inputRefs.categories}
                // style={{ width: "100px" }}
                onChange={handleForm}
              >
                <option>Select Category</option>
                {categories?.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className={newBlogStyle["input-group"]}>
              <select
                name="isPublish"
                id="isPublish"
                value={inputRefs.isPublish}
                onChange={handleForm}
              >
                <option value="">Select Publish Status</option>
                <option value="true">Publish</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <button>Submit</button>
          </form>
        </section>
      </main>
    </section>
  );
};

export default NewBlog;