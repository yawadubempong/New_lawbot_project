import "./CSS/Settings.css"
import profile from "./Assets/Ellipse 517.png"
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Settings = ({setSettingsDisplay}) => {
    const lastNameInput = useRef()
    const [settings, setSettings] = useState("account-details")
    const [lastName, setLastName] = useState("")
    const [defaultTheme, setDefaultTheme] = useState("Default")

    useEffect(() => {
        if(lastName !== ""){
            lastNameInput.current.style.backgroundColor = "#FF3D00"
        } else {
            lastNameInput.current.style.backgroundColor = "#ffb19a"
        }
    }, [lastName])
    return (
        <>  
            <div className="Settings">
                <div className="settings-card">
                    <div onClick={() => {
                        setSettingsDisplay(false)
                    }} className="close-icon"><FontAwesomeIcon icon={faClose}/></div>
                    <div className="leftside">
                        <h4>SETTINGS</h4>
                        <div className="settings-nav">
                            <li onClick={()=>{setSettings("account-details")}}>Account Details</li>
                            <li onClick={()=>{setSettings("change-password")}}>Change password</li>
                            <li onClick={()=>{setSettings("preference")}}>Preference</li>
                            <li onClick={()=>{setSettings("log-out")}}>Log Out</li>
                        </div>
                    </div>
                    <div className="settings-vline"></div>
                    <div className="rightside">
                        {
                            settings === "account-details" ?
                            <div>
                                <div className="account-profile">
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
                                        <input type={"text"}  value={lastName} onChange={(e) => {
                                            setLastName(e.target.value)
                                        }}  />
                                    </div>
                                    <div className="account-email">
                                        <p>Email</p>
                                        <input type={"text"} value={"miqael.dev@gmail.com"} disabled />
                                    </div>
                                    <div ref={lastNameInput} className="save-changes">
                                        Save changes
                                    </div>
                                </div>
                            </div> : (settings === "preference" ? 
                            <div className="preference">
                                <p>Select theme:</p>
                                <select 
                                defaultValue={["Default"]}
                                >
                                    <option value="Default">Default</option>
                                    <option value="Dark">Dark</option>
                                </select>
                                <div className="save-changes">
                                    Save changes
                                </div>
                            </div>: (settings === "log-out" ? 
                            <div className="log-out"><a href="/logout">
                                <p>Log out of your account</p>
                                <div className="log-out-btn">
                                    Log Out
                                </div></a>
                            </div>: (settings === "change-password"?
                            <div className="change-password">
                                <p>Old password</p>
                                <input type={"text"} />
                                <p>New password</p>
                                <input type={"text"} />
                                <p>Confirm new password</p>
                                <input type={"text"} />
                                <div className="save-changes">
                                    Save changes
                                </div>
                            </div>: null
                            ) 
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Settings;