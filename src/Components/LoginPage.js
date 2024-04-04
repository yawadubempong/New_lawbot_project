import "./CSS/LoginPage.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const LoginPage = () => {
  const schema = yup.object().shape({
    login: yup.string().email().required(),
    password: yup.string().min(4).required(),
    terms: yup.boolean().required(),
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
    defaultValues: {
      login: "",
      password: "",
      csrfmiddlewaretoken: document.getElementById("csrf_token_input").value,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log(formData);
    await fetch("/login/", {
      method: "post",
      body: formData,
    })
      .then((response) => {
        // Handle the response
        data = response.json();
        console.log(data);
        if (response.ok) {
          if (data.success === true) {
            window.href = "/chatroom";
          }
        } else {
          for (const key in data.errors) {
            setError(String(key), {
              type: "custom",
              message: data.errors[key].join("****"),
            });
          }
        }
      })
      .catch((error) => {
        // Handle errors
      });
  };

  return (
    <>
      <div className="login-page">
        <div className="left-form">
          <form
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            className="login-form"
          >
            <div className="logo-title">
              <img src={require("./Assets/image 1.png")} alt="" />
              <h3>Law Chatbot</h3>
            </div>
            <div className="login-inputs">
              {errors.__all__ && <p>{errors.__all__.message}</p>}
              <input type="hidden" {...register("csrfmiddlewaretoken")} />
              <div className="inputs">
                <p>Email Address</p>
                {errors.login && <p>{errors.login.message}</p>}
                <input
                  type="email"
                  {...register("login")}
                  required
                  placeholder="Enter your email address"
                />
                <p>Password</p>
                {errors.password && <p>{errors.password.message}</p>}
                <input
                  type="password"
                  {...register("password")}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div className="terms-conditions">
                <input type={"checkbox"} required {...register("terms")} />
                <div className="terms">I agree to terms & conditions</div>
              </div>
              <button type={"submit"} className="login-btn">
                <p>Login</p>
              </button>
            </div>
            <div className="linebreak">
              <div className="line1"></div>
              <div className="or">Or</div>
              <div className="line2"></div>
            </div>
            <div
              className="google-login"
              onClick={() => document.getElementById("Googlelogin").click()}
            >
              <div className="google-icon">
                <img
                  src={require("./Assets/icons8-google-144.png")}
                  alt="Google Icon"
                />
              </div>
              <div className="google-login-text">
                <p>Login with Google</p>
              </div>
            </div>
            <div className="signup-link">
              <p>
                Don't have an account?{" "}
                <a href="/signup">
                  <span>Sign up</span>
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="right-image">
          <img src={require("./Assets/Image.png")} alt="" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
