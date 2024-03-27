import "./CSS/Settings.css"
import profile from "./Assets/Ellipse 517.png"
import { useState } from "react";

const Settings = () => {
    const [settings, setSettings] = useState("account-details")
    return (
        <>
            <div className="Settings">
                <div className="settings-card">
                    <div className="leftside">
                        <h4>SETTINGS</h4>
                        <div className="settings-nav">
                            <li onClick={()=>{setSettings("account-details")}}>Account Details</li>
                            <li onClick={()=>{setSettings("preference")}}>Preference</li>
                            <li onClick={()=>{setSettings("log-out")}}>Log Out</li>
                            <li onClick={()=>{setSettings("delete-account")}}>Delete Account</li>
                        </div>
                    </div>
                    <div className="vline"></div>
                    <div className="rightside">
                        {
                            settings === "account-details" ?
                            <div>
                                <div className="account-details">
                                    <div className="profile-email">
                                        <img src={profile} alt="" />
                                        <div className="name-email">
                                            <p>{"User Name"}</p>
                                            <p>{"miqael.dev@gmail.com"}</p>
                                        </div>
                                    </div>
                                    <div className="change-button">
                                        <button>Change Avatar</button>
                                    </div>
                                </div>
                                <div className="account-details">
                                    <div className="firsname-lastname">
                                        <p>FirstName</p>
                                        <input type={"text"} value={"firstName"} disabled />
                                        <p>LastName</p>
                                        <input type={"text"}  />
                                    </div>
                                    <div className="account-email">
                                        <p>Email</p>
                                        <input type={"text"} value={"miqael.dev@gmail.com"} disabled />
                                    </div>
                                </div>
                            </div> : (settings === "preference" ? 
                            <div>
                                preference
                            </div>: null
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Settings;