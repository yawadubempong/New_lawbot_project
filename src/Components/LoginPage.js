import "./CSS/LoginPage.css";
import { Form, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleSignIn from "./GoogleSignIn";

const csrfToken = document.getElementById("csrf_token_input").value;

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
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  setValue("csrfmiddlewaretoken", csrfToken);

  //Google sign up class requirement
  const googleClasses = ["google-login"].join(" ");

  return (
    <>
      <div className="login-page">
        <div className="left-form">
          <Form
            action="/login/"
            control={control}
            onSubmit={async ({ formData }) => {
              formData = new URLSearchParams(JSON.stringify(formData));
              await fetch("/login/", {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "post",
                redirect: "manual",
                body: formData,
              })
                .then((response) => {
                  // Handle the response
                  console.log(response.url);
                })
                .catch((error) => {
                  // Handle errors
                });
            }}
            className="login-form"
          >
            <div className="logo-title">
              <img src={require("./Assets/image 1.png")} alt="" />
              <h3>Law Chatbot</h3>
            </div>
            <div className="login-inputs">
              <input type="hidden" {...register("csrfmiddlewaretoken")} />
              <div className="inputs">
                <p>Email Address</p>
                <input
                  type="text"
                  {...register("login")}
                  required
                  placeholder="Enter your email address"
                />
                <p>Password</p>
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
            <GoogleSignIn />
            <div className="signup-link">
              <p>
                Don't have an account?{" "}
                <a href="/signup">
                  <span>Sign up</span>
                </a>
              </p>
            </div>
          </Form>
        </div>
        <div className="right-image">
          <img src={require("./Assets/Image.png")} alt="" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
