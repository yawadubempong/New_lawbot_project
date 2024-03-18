import "./CSS/LoginPage.css"

const LoginPage = () => {
    return (
        <>
            <div className="login-page">
                <div className="login-form">
                    <div className="logo-title">
                        <img src={require("./Assets/image 1.png")} alt=""/>
                        <h3>Law Chatbot</h3>
                    </div>
                    <div className="login-inputs">
                        <p>Email Address</p>
                        <input type="email" placeholder="Enter your email address"/>
                        <p>Password</p>
                        <input type="email" placeholder="Enter your password"/>
                        <div className="terms-conditions">
                            <input type={"checkbox"}/>
                            <p>I agree to terms & conditions</p>
                        </div>
                        <div className="login-btn">
                            <p>Login</p>
                        </div>
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
                        <p>Don't have an account? <span>Sign up</span></p>
                    </div>
                </div>
                <div className="left-image">
                    <img src={require("./Assets/Image.png")} alt=""/>
                </div>
            </div>
        </>
    );
}
 
export default LoginPage;