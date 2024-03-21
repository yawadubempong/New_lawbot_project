import { Link} from "react-router-dom";
import "./CSS/CreateAccountPage.css"

const CreateAccountPage = () => {
    return (
        <>
            <div className="create-account">
                <div className="create-account-card">
                    <img className="logo" src={require("./Assets/image 1.png")} alt=""/>
                    <h2 className="header">Create an account</h2>
                    <p className="header-two">Already have an account? <Link to={"/login"}><span>Log in</span></Link></p>
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
                    <div className="email-input">
                        <h3>Enter your email address to create an account.</h3>
                        <p>Your email</p>
                        <input type="email" />
                    </div>
                    <div className="signup-btn">
                        <p>Create an account</p>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default CreateAccountPage;