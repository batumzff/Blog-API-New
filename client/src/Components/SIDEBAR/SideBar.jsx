import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import SideStyle from "./SideBar.module.scss";

const navigation = [
  { name: "Blogs", to: "/blogs" },
  { name: "Profile", to: "/my-profile" },
  { name: "New Blog", to: "/new-blog" },
  { name: "About", to: "/about" },
  // { name: "Login", to: "/login" },
  // { name: "Register", to: "/register" },
];

const SideBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // console.log(token);

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (isActive && !e.target.closest(`.${SideStyle.container}`)) {
  //       console.log(e.target);
  //       console.log(isActive);
  //       onClose();
  //     }
  //   };

  //   document.body.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.body.removeEventListener("click", handleClickOutside);
  //   };
  // }, [isActive, onClose]);
  // console.log(user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <section className={SideStyle.container}>
      <main>
        <section className={SideStyle.navigation}>
          {navigation.map((item) => (
            <div key={item.name}>
              <Link to={item.to}>{item.name}</Link>
            </div>
          ))}
          {token ? (
            <div className={SideStyle.logout} onClick={handleLogout}>Log out</div>
          ) : (
            <>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </section>
      </main>
    </section>
  );
};

export default SideBar;
