import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { loginSchema } from "../../Helpers/formValidation";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import { useDispatch } from "react-redux";
import LoginStyle from "./Login.module.scss"

const Login = () => {
  const { login } = useAuthCalls();
  const dispatch = useDispatch();
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
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log("submit data", data);
    dispatch(login(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    
      <main>
        <section >
          <div className={LoginStyle["login-form"]}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <section className={LoginStyle["input-group"]}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder=" "
                  {...register("username")}
                />
                                <label className={LoginStyle["user-label"]} htmlFor="username">Username</label>

                <p className={LoginStyle.error}>{errors.username?.message}</p>
              </section>

              <section className={LoginStyle["input-group"]}>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder=" "
                  {...register("email")}
                />
                <label className={LoginStyle["user-label"]} htmlFor="email">Email</label>

                <p className={LoginStyle.error}>{errors.email?.message}</p>
              </section>

              <section className={LoginStyle["input-group"]}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder=" "
                  {...register("password")}
                />
                <label className={LoginStyle["user-label"]} htmlFor="password">Password</label>

                <p className={LoginStyle.error}>{errors.password?.message}</p>
              </section>

              <button disabled={isSubmitting}>Submit</button>
            </form>
            <DevTool control={control} />
          </div>
        </section>
      </main>
   
  );
};

export default Login;
