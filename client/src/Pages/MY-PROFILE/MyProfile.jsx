import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import DOMPurify from "dompurify";
import profileStyles from "./MyProfile.module.scss";
import BlogPost from "../../Components/BLOG-POST/BlogPost";
import QuillEditor from "../../Components/QUILL/QuillEditor";
import { formRegisterInputs } from "../../Helpers/formInputs";
import useBlogData from "../../Custom-hooks/useBlogData";
import BlogCard from "../../Components/BLOG-CARD/BlogCard";

const MyProfile = () => {
  const { updatedUser } = useAuthCalls();
  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blog);
  const [show, setShow] = useState(false)

  const { getData } = useBlogData()
  useEffect(() => {
    getData("blogs")
  }, [])

  const userBlogs = blogs?.filter(blog => blog.userId._id == user?.id)

  // console.log(userBlogs)
  console.log(user);
  const inputRefs = useRef({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    image: user?.image || [],
    biography: user?.biography || "",
    password: "",
  });

  const [userModal, setUserModal] = useState(false);
  const quillRef = useRef(user?.biography);

  const handleForm = (e) => {
    const { name, value } = e.target;
    inputRefs.current[name] = value;
  };
  // console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedContent = DOMPurify.sanitize(
      quillRef.current.getEditor().root.innerHTML,
      {
        USE_PROFILES: { html: true },
      }
    );
    const userInfo = {
      ...inputRefs.current,
      biography: sanitizedContent,
    };
    const userId = user?.id;
    updatedUser(userId, userInfo);
    // inputRefs.current = ""
    setUserModal(false);
  };

  const showMyBlogs = () => {
    setShow(prev => !prev)
  }

  return (
    <main className={profileStyles.main}>
      <section className={profileStyles["profile-header"]}>
        <img
          src={
            (Array.isArray(user?.image) && user?.image[0]) ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt="user photo"
        />
        <h2>{user?.username}</h2>
      </section>
      <section className={profileStyles["profile-body"]}>
        <BlogPost content={user?.biography} />
      </section>
      <button onClick={() => setUserModal(!userModal)}>Edit Profile</button>
      <button onClick={showMyBlogs}>my blogs</button>

      {userModal && (
        <div>
          <form onSubmit={handleSubmit}>
            {formRegisterInputs.map(
              (item) =>
                item.name !== "biography" && (
                  <React.Fragment key={item.name}>
                    <label htmlFor={item.name}>{item.label}</label>
                    <input
                      type={item.type}
                      id={item.name}
                      name={item.name}
                      defaultValue={inputRefs.current[item.name]}
                      onChange={handleForm}
                      required={item.type === "password"}
                    />
                  </React.Fragment>
                )
            )}

            <label htmlFor="biography">Biography</label>
            <QuillEditor
              name="quill"
              value={inputRefs.current?.biography}
              ref={quillRef}
              style={{ color: "black" }}
            />

            <button>Submit</button>
          </form>
        </div>
      )}
      {show && (
        <section>
        <BlogCard detail={userBlogs} />
      </section>
      )}
    </main>
  );
};

export default MyProfile;