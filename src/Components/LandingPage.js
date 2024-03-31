import { useState } from "react";
import "./CSS/LandingPage.css"

const LandingPage = () => {
    return (
        <>
            <div className="Intro">
                <div className="intro-image">
                    <img src={require("./Assets/image 1.png")} alt=""/>
                </div>
                <div className="intro-text">
                    <h2>WELCOME TO THE LAW CHATBOT</h2>
                    <p>Your Personal Legal Assistance for Any Law related Quarries</p>
                </div>
                <a href="/chatroom">
                    <div className="intro-btn">
                        <img src={require("./Assets/Component 1.png")} alt="" />
                    </div>
                </a>
            </div>
        </>
    );
}
 
export default LandingPage;