import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { registerSchema } from "../../Helpers/formValidation";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import { useDispatch } from "react-redux";
import registerStyle from "./Register.module.scss";

const Register = () => {
  const { registerUser } = useAuthCalls();
  const dispatch = useDispatch();
  const [biography, setBiography] = useState()
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
    },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = (data) => {
    console.log("submit data", data);
    dispatch(registerUser(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <section className={registerStyle["register-main"]}>
      <main className={registerStyle["form-container"]}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={registerStyle["input-group"]}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              {...register("username")}
            />

            <p className="error">{errors.username?.message}</p>
          </div>

          <div className={registerStyle["input-group"]}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              {...register("firstName")}
            />

            <p className="error">{errors.firstName?.message}</p>
          </div>

          <div className={registerStyle["input-group"]}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              {...register("lastName")}
            />

            <p className="error">{errors.lastName?.message}</p>
          </div>

          <div className={registerStyle["input-group"]}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" {...register("email")} />

            <p className="error">{errors.email?.message}</p>
          </div>

          <div className={registerStyle["input-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
            />

            <p className="error">{errors.password?.message}</p>
          </div>

          <div className={registerStyle["input-group"]}>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" name="image" {...register("image")} />

            <p className="error">{errors.image?.message}</p>
          </div>

          <div className={registerStyle["input-group"]}>
            <label htmlFor="biography">Biography</label>
            <ReactQuill
              theme="snow"
              value={biography}
              onChange={setBiography}
            />

            <p className="error">{errors.image?.message}</p>
          </div>

          <button disabled={isSubmitting}>Submit</button>
        </form>
        <DevTool control={control} />
      </main>
    </section>
  );
};

export default Register;
