import "./CSS/Settings.css";
import ChangePassword from "./ChangePassword";
import profile from "./Assets/Ellipse 517.png";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderNone, faClose } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const Settings = ({ setSettingsDisplay }) => {
  const lastNameInput = useRef();
  const [settings, setSettings] = useState("account-details");
  const [lastname, setLastname] = useState("");
  const [userdata, setuserdata] = useState({});
  const [disabled, setdisabled] = useState(false);
  const [defaultTheme, setDefaultTheme] = useState("Default");

  const {
    register,
    formState: { errors },
    setError,
    control,
    handleSubmit,
  } = useForm({});


  const fetchUserData = async () => {
    try {
      const response = await fetch("/userdetails/", { method: "GET" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching latest chat data:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchUserData().then((data) => {
      if (!data) return;
      setuserdata(data);
    });
  },[]);

  //User detail function
  const userdataSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new URLSearchParams();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      console.log(formData);
      const response = await fetch("/userdetails/", {
        method: "post",
        body: formData,
      });
      data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (info) => {
    setdisabled(true);
    userdataSubmit(info).then((data) => {
      if (data.success === false) {
        for (const key in data.errors) {
          setError(String(key), {
            type: "custom",
            message: data.errors[key].join("****"),
          });
          console.log(errors);
        }
      } else {
        alert("Successfully Submitted!");
        setuserdata(data);
      }
    });
    setdisabled(false);
  };

  useEffect(() => {
    if (lastname !== "") {
      lastNameInput.current.style.backgroundColor = "#FF3D00";
    } else {
      lastNameInput.current.style.backgroundColor = "#ffb19a";
    }
  }, [lastname]);




  return (
    <>
      <div className="Settings">
        <div className="settings-card">
          <div
            onClick={() => {
              setSettingsDisplay(false);
            }}
            className="close-icon"
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className="leftside">
            <h4>SETTINGS</h4>
            <div className="settings-nav">
              <li
                onClick={() => {
                  setSettings("account-details");
                }}
              >
                Account Details
              </li>
              <li
                onClick={() => {
                  setSettings("change-password");
                }}
              >
                Change password
              </li>
              <li
                onClick={() => {
                  setSettings("preference");
                }}
              >
                Preference
              </li>
              <li
                onClick={() => {
                  setSettings("log-out");
                }}
              >
                Log Out
              </li>
            </div>
          </div>
          <div className="settings-vline"></div>
          <div className="rightside">
            {settings === "account-details" ? (
              <div>
                <div className="account-profile">
                  <div className="profile-email">
                    <img src={profile} alt="" />
                    <div className="name-email">
                      <p>{"User Name"}</p>
                      <p>{userdata.email}</p>
                    </div>
                  </div>
                  <div className="change-button">
                    <button>Change Avatar</button>
                  </div>
                </div>
                <div className="account-details">
                  <form
                    control={control}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      type="hidden"
                      {...register("csrfmiddlewaretoken")}
                      defaultValue={
                        document.getElementById("csrf_token_input").value
                      }
                    />
                    {errors.__all__ && <p>{errors.__all__.message}</p>}
                    <div className="firsname-lastname">
                      <p>FirstName</p>
                      {errors.name && <p>{errors.name.message}</p>}
                      <input type={"text"} {...register("name")} defaultValue={userdata.name} />
                      <p>LastName</p>
                      {errors.lastname && <p>{errors.lastname.message}</p>}
                      <input type={"text"} {...register("lastname")} defaultValue={userdata.lastname}/>
                    </div>
                    <div className="account-email">
                      <p>Email</p>
                      {errors.email && <p>{errors.email.message}</p>}
                      <input type={"text"} value={userdata.email} disabled />
                    </div>
                    <button ref={lastNameInput} className="save-changes" type={"submit"} disabled={disabled}>
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            ) : settings === "preference" ? (
              <div className="preference">
                <p>Select theme:</p>
                <select defaultValue={["Default"]}>
                  <option value="Default">Default</option>
                  <option value="Dark">Dark</option>
                </select>
                <div className="save-changes">Save changes</div>
              </div>
            ) : settings === "log-out" ? (
              <div className="log-out">
                <a style={{ textDecoration: "none" }} href="/logout">
                  <p>Log out of your account</p>
                  <div className="log-out-btn">Log Out</div>
                </a>
              </div>
            ) : settings === "change-password" ? <ChangePassword />: null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
