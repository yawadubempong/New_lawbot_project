import "./CSS/Settings.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const [disabled, setdisabled] = useState(false);

  const {
    register,
    formState: { errors },
    setError,
    control,
    handleSubmit,
  } = useForm({

  });



  //Change password submit 
  const changePasswordSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new URLSearchParams();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      console.log(formData);
      const response = await fetch("/changepassword/", {
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
    changePasswordSubmit(info).then((data) => {
      if (data.success === false) {
        for (const key in data.errors) {
          setError(String(key), {
            type: "custom",
            message: data.errors[key].join("****"),
          });
          console.log(errors);
        }
      } else {
        alert("Successfully changed your password!");
      }
    });
    setdisabled(false);
  };

  return (
    <>
              <div className="change-password">
                <form control={control} onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    {...register("csrfmiddlewaretoken")}
                    defaultValue={
                      document.getElementById("csrf_token_input").value
                    }
                  />
                  {errors.__all__ && <p>{errors.__all__.message}</p>}
                  <p>Old password</p>
                  {errors.oldpassword && <p>{errors.oldpassword.message}</p>}
                  <input type={"text"} {...register("oldpassword")} />
                  <p>New password</p>
                  {errors.password1 && <p>{errors.password1.message}</p>}
                  <input type={"text"} {...register("password1")} />
                  <p>Confirm new password</p>
                  {errors.password2 && <p>{errors.password2.message}</p>}
                  <input type={"text"} {...register("password2")} />
                  <button className="save-changes" type={"submit"} disabled={disabled}>
                    Save changes
                  </button>
                </form>
              </div>
          
</>)
};


export default ChangePassword;
