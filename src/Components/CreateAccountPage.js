import { Link} from "react-router-dom";
import "./CSS/CreateAccountPage.css"
import { useState } from "react";

const CreateAccountPage = () => {
    // user email and password are stored in the state below(use userCred.userEmail and userCred.userPassword to call it out)
    const [userCred, setUserCred] = useState({
        userEmail: "",
        userPassword: ""
    })

    const EmailHandleChange = (e) => {
        setUserCred({
            userEmail: e.target.value
        }) 
        console.log(userCred)
    }

    const PassHandleChange = (e) => {
        setUserCred({
            userPassword: e.target.value
        }) 
        console.log(userCred)
    }

    const emailDisplay = () => {
        document.getElementById("user-email").style.display = "none";
        document.getElementById("user-password").style.display = "flex";
        document.getElementById("user-password").style.animation = "passSlider 0.3s ease-out";
        document.getElementById("continue").style.display = "none"
        document.getElementById("signup-btn").style.display = "flex"
    }

    return (
        <>
            <div className="create-account">
                <div className="create-account-card">
                    <img className="logo" src={require("./Assets/image 1.png")} alt=""/>
                    <h2 className="header">Create an account</h2>
                    <p className="header-two">Already have an account? <Link to={"/login"}><span>Log in</span></Link></p>
                    <div className="user-email-password">
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
                                <h3>Enter your email address to create an account.</h3>
                                <p>Firstname<span> *</span></p>
                                <input type="text" value={userCred.userEmail} onChange={EmailHandleChange}/>
                                <p>Lastname</p>
                                <input type="text" value={userCred.userEmail} onChange={EmailHandleChange}/>
                                <p>Your email<span> *</span></p>
                                <input type="email" value={userCred.userEmail} onChange={EmailHandleChange}/>
                            </div>
                        </div>
                        <div id="user-password" className="user-password">
                            <h3>Enter your password to create an account.</h3>
                            <p>Password<span> *</span></p>
                            <input type="password" value={userCred.userPassword} onChange={PassHandleChange}/>
                            <p>Confirm password<span> *</span></p>
                            <input type="password" />
                        </div>
                        <div id="continue" className="continue" onClick={emailDisplay}>
                            <p>Continue</p>
                        </div>
                        <div id="signup-btn" className="signup-btn" onClick={emailDisplay}>
                            <p>Create an Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default CreateAccountPage;