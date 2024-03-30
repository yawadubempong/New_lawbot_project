import "./CSS/CreateAccountPage.css";
import { useEffect, useState } from "react";
import { Form, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Usage
//Getting csrftoken
const csrfToken = document.getElementById("csrf_token_input").value;

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
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const name = useWatch({ control, name: "name" });
  const email = useWatch({ control, name: "email" });

  const [preloader, setPreloader] = useState(true);
  setInterval(() => {
    setPreloader(false);
  }, 2000);

  const [slide, setSlide] = useState("none");
  const slideStyle = () => {
    document.getElementById("user-email").style.display = "none";
    document.getElementById("user-password").style.display = "flex";
    document.getElementById("user-password").style.animation =
      "passSlider 0.3s ease-out";
    document.getElementById("continue").style.display = "none";
    document.getElementById("signup-btn").style.display = "flex";
  };

  useEffect(() => {
    if (name !== "" && email !== "") {
      setSlide("slide");
    } else {
      setSlide("none");
    }
  }, [name, email]);

  setValue("csrfmiddlewaretoken", csrfToken);

  //Google sign up class requirement 
  const googleClasses = ["google-signup", "g_id_signin"].join(' ');

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
            <Form
                action="/signup/"
                control={control}
                onSubmit={async ({ formData}) => {
                  await fetch("/signup/", {
                    method: "post",
                    body: formData,
                  }).then(response => {
                    // Handle the response
                    if (response.redirected) {
                      window.location.href = response.url;
                  }
                  })
                  .catch(error => {
                    // Handle errors
                  });
                }}
              >
                <input type="hidden" {...register("csrfmiddlewaretoken")} />
                <div className="user-email">
                  <div className={ googleClasses }>
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
                    <h3>Enter your email address to create an account.</h3>
                    <p>
                      Firstname<span> *</span>
                    </p>
                    <input type="text" {...register("name")} />
                    <p>Lastname</p>
                    <input type="text" {...register("lastname")} />
                    <p>
                      Your email<span> *</span>
                    </p>
                    <input type="text" {...register("email")} />
                  </div>
                </div>
                <div id="user-password" className="user-password">
                  <h3>Enter your password to create an account.</h3>
                  <p>
                    Password<span> *</span>
                  </p>
                  <input type="password" {...register("password1")} />
                  <p>
                    Confirm password<span> *</span>
                  </p>
                  <input type="password" {...register("password2")} />
                </div>
                <button type={"submit"} id="signup-btn" className="signup-btn">
                  <p>Create an Account</p>
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAccountPage;