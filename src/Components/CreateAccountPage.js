import { Link} from "react-router-dom";
import "./CSS/CreateAccountPage.css"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const CreateAccountPage = () => {
    // user email and password are stored in the state below(use userCred.userEmail and userCred.userPassword to call it out)
    const [userFirstName, setUserFirstName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setPassword] = useState("")
    const [userConfirmPassword, setUserConfirmPassword] = useState("")

    const [isError, setIsError] = useState()
    

    
    const [preloader, setPreloader] = useState(true)
    setInterval(() => {
        setPreloader(false)
    }, 2000)

    
    const [slide, setSlide] = useState("none")
    const slideStyle = () => {
        document.getElementById("user-email").style.display = "none";
        document.getElementById("user-password").style.display = "flex";
        document.getElementById("user-password").style.animation = "passSlider 0.3s ease-out";
        document.getElementById("continue").style.display = "none";
        document.getElementById("signup-btn").style.display = "flex";
    }

useEffect(()=> { 
        if(userFirstName !== "" && userEmail !== ""){
            setSlide("slide")
            document.getElementById("continue").style.backgroundColor = "#FF3D00";
        }else{
            setSlide("none")
            // document.getElementById("continue").style.backgroundColor = "#ffb6a0";
        }
},[userFirstName, userEmail])

const schema = yup.object().shape({
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required()

})

const {register, handleSubmit, formState: {errors, isValid}, watch} = useForm({
    resolver: yupResolver(schema)
})


console.log(errors.firstName?.message ? "true":  "false")

const onSubmit = (data) => {
    console.log(data)
}

    return (
        <>  
        {
            preloader === true ? 
            <div className="preloader">
                <img src={require("./Assets/image 1.png")} alt="" />
            </div>:
            <div className="create-account">
                <div className="create-account-card">
                    <img className="logo" src={require("./Assets/image 1.png")} alt=""/>
                    <h2 className="header">Create an account</h2>
                    <p className="header-two">Already have an account? <Link to={"/login"}><span>Log in</span></Link></p>
                    <div className="user-email-password">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="user-email">
                                <div className="google-signup">
                                    <div className="google-icon">
                                        <img src={require("./Assets/icons8-google-144.png")} alt="Google Icon"/>
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
                                    <div className="first-last-name">
                                        <div className="first-name">
                                            <p>Firstname<span> *</span></p>
                                            <input type="text" name="firstName" value={userFirstName} required {...register("firstName")} onChange={(e)=> {
                                                setUserFirstName(e.target.value)
                                            }}/>
                                        </div>
                                        <div className="last-name">
                                            <p>Lastname</p>
                                            <input type="text" name="lastName"  {...register("lastName")}/>
                                        </div>
                                    </div>
                                    <p>Your email<span> *</span></p>
                                    <input type="text" name="userEmail" value={userEmail} required  {...register("email")} onChange={(e)=> {
                                        setUserEmail(e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div id="user-password" className="user-password">
                                <p>Password<span> *</span></p>
                                <input type="password" name="userPassword" value={userPassword} required  {...register("password")} onChange={(e)=> {
                                    setPassword(e.target.value)
                                }}/>
                                <p>Confirm password<span> *</span></p>
                                <input type="password" required  {...register("confirmPassword")} />
                            </div>
                            {/* <div id="continue" className="continue" onClick={()=>{
                                if(slide === "none") {
                                    return null
                                }else {
                                    return slideStyle()
                                }
                            }}>
                                <p>Continue</p>
                            </div> */}
                            <button type={"submit"}  id="signup-btn" className="signup-btn" >
                                <p>Create an Account</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        }
        </>
    );
}
 
export default CreateAccountPage;