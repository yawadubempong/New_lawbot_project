import { Link } from "react-router-dom";
import "./CSS/LoginPage.css"

const LoginPage = () => {
    return (
        <>
            <div className="login-page">
                <div className="left-form">
                    <div className="login-form">
                        <div className="logo-title">
                            <img src={require("./Assets/image 1.png")} alt=""/>
                            <h3>Law Chatbot</h3>
                        </div>
                        <div className="login-inputs">
                            <div className="inputs">
                                <p>Email Address</p>
                                <input type="text" placeholder="Enter your email address"/>
                                <p>Password</p>
                                <input type="text" placeholder="Enter your password"/>
                            </div>
                            <div className="terms-conditions">
                                <input type={"checkbox"} />
                                <div className="terms">
                                    I agree to terms & conditions
                                </div>
                            </div>
                            <Link to={"/chatroom"}>
                                <div className="login-btn">
                                    <p>Login</p>
                                </div>
                            </Link>
                        </div>
                        <div className="linebreak">
                            <div className="line1"></div>
                            <div className="or">Or</div>
                            <div className="line2"></div>
                        </div>
                        <div className="google-login">
                            <div className="google-icon">
                                <img src={require("./Assets/icons8-google-144.png")} alt="Google Icon"/>
                            </div>
                            <div className="google-login-text">
                                <p>Login with Google</p>
                            </div>
                        </div>
                        <div className="signup-link">
                            <p>Don't have an account? <Link to={"/signup"}><span>Sign up</span></Link></p>
                        </div>
                    </div>
                </div>
                <div className="right-image">
                    <img src={require("./Assets/Image.png")} alt=""/>
                </div>
            </div>
        </>
    );
}
 
export default LoginPage;