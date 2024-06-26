import "./CSS/CreateAccountPage.css";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateAccountPage = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    lastname: yup.string(),
    email: yup.string().email().required(),
    password1: yup.string().min(4).required(),
    password2: yup
      .string()
      .oneOf([yup.ref("password1"), null])
      .required(),
  });

  // user email and password are stored in the state below(use userCred.userEmail and userCred.userPassword to call it out)
  const {
    register,
    formState: { errors },
    setError,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const name = useWatch({ control, name: "name" });
  const email = useWatch({ control, name: "email" });

  const [preloader, setPreloader] = useState(true);
  setInterval(() => {
    setPreloader(false);
  }, 2000);

  const [disabled, setdisabled] = useState(false)

  const signup = async (data) => {
    try {
    console.log(data);
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log(formData);
    const response = await fetch("/signup/", {
      method: "post",
      body: formData,
    });
  data = response.json()
  return data;
  }
      catch (error) {
        console.log(error)
  };
}

  const onSubmit = (info) => {
    setdisabled(true);
      signup(info).then((data) => {
        if (data.success === false) {
          for (const key in data.errors) {
            setError(
              String(key),{
                type: "custom",
                message: data.errors[key].join('****')
              }
            )
            console.log(errors)
          }
        } else if (data.success === true) {
            window.location.href = "/chatroom/";
          }    
      });
      setdisabled(false);
    }

  

  return (
    <>
      {preloader === true ? (
        <div className="preloader">
          <img src={require("./Assets/image 1.png")} alt="" />
        </div>
      ) : (
        <div className="create-account">
          <div className="create-account-card">
            <img
              className="logo"
              src={require("./Assets/image 1.png")}
              alt=""
            />
            <h2 className="header">Create an account</h2>
            <p className="header-two">
              Already have an account?{" "}
              <a href="/login">
                <span>Log in</span>
              </a>
            </p>
            <div className="user-email-password">
              <form control={control} onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="hidden"
                  {...register("csrfmiddlewaretoken")}
                  defaultValue={
                    document.getElementById("csrf_token_input").value
                  }
                />
                <div className="user-email">
                  <div
                    className="google-signup"
                    onClick={() =>
                      document.getElementById("Googlelogin").click()
                    }
                  >
                    <div className="google-icon">
                      <img
                        src={require("./Assets/icons8-google-144.png")}
                        alt="Google Icon"
                      />
                    </div>
                    <div className="google-signup-text">
                      <p>Continue with Google</p>
                    </div>
                  </div>
                  <div className="linebreak">
                    <div className="line1"></div>
                    <div className="or">Or</div>
                    <div className="line2"></div>
                  </div>
                  <div id="user-email" className="email-input">
                    <h3>Enter your info to create an account.</h3>
                    {errors.__all__ && <p>{errors.__all__.message}</p>}
                    <div className="first-last-name">
                      <div className="first-name">
                        <div className="label">Firstname<span> *</span></div>
                        {errors.name && <p>{errors.name.message}</p>}
                        <input type="text" {...register("name")} />
                      </div>
                      <div className="last-name">
                        <div className="label">Lastname</div>
                        {errors.lastname && <p>{errors.lastname.message}</p>}
                        <input type="text" {...register("lastname")} />
                      </div>
                    </div>
                    <div className="label">Your email<span> *</span></div>
                    {errors.email && <p>{errors.email.message}</p>}
                    <input type="email" {...register("email")} />
                  </div>
                </div>
                <div id="user-password" className="user-password">
                  <h3>Enter your password to create an account.</h3>
                  <div className="label">Password<span> *</span></div>
                  {errors.password1 && <p>{errors.password1.message}</p>}
                  <input type="password" {...register("password1")} />
                  <div className="label">Confirm password<span> *</span></div>
                  {errors.password2 && <p>{errors.password2.message}</p>}
                  <input type="password" {...register("password2")} />
                </div>
                <button type={"submit"} id="signup-btn" className="signup-btn" disabled={disabled}>
                  <p>Create an Account</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAccountPage;
