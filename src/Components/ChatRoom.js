import "./CSS/ChatRoom.css"
import NewChat from "./NewChat";

const ChatRoom = () => {
    return (
        <>
            <div className="chatroom-page">
                <div className="sidenav">
                    <div className="nav-logo-title">
                        <div className="nav-logo-image">
                            <img src={require("./Assets/image 1.png")} alt="weighing scale icon"/>
                        </div>
                        <div className="nav-logo-text">Law Chatbot</div>
                    </div>
                    <div className="newchat-search">
                        <div className="newchat">
                            <img src={require("./Assets/icons8-add-48.png")} alt="plus sign"/>
                            <div className="newchat-text">New Chat</div>
                        </div>
                        <div className="search-icon">
                            <img src={require("./Assets/icons8-search-90.png")} alt="search icon"/>
                        </div>
                    </div>
                    <div className="navlinks-title">
                        <div>Your conversations</div>
                        <div>Clear All</div>
                    </div>
                    <div className="prev-chat-nav">
                        <div className="chat">
                            <div className="chaticon-sentence"> 
                                <img className="chatimg" src={require("./Assets/icons8-comments-96.png")} alt="comment icon" />
                                <div className="chatsentence">{"First Chat sentence...."}</div>
                            </div>
                            <div className="delete">
                                <img src={require("./Assets/icons8-delete-192.png")} alt="delete icon" />
                            </div>
                        </div>
                        <div className="chat">
                            <div className="chaticon-sentence"> 
                                <img className="chatimg" src={require("./Assets/icons8-comments-96.png")} alt="comment icon" />
                                <div className="chatsentence">{"First Chat sentence...."}</div>
                            </div>
                            <div className="delete">
                                <img src={require("./Assets/icons8-delete-192.png")} alt="delete icon" />
                            </div>
                        </div>
                        <div className="chat">
                            <div className="chaticon-sentence"> 
                                <img className="chatimg" src={require("./Assets/icons8-comments-96.png")} alt="comment icon" />
                                <div className="chatsentence">{"First Chat sentence...."}</div>
                            </div>
                            <div className="delete">
                                <img src={require("./Assets/icons8-delete-192.png")} alt="delete icon" />
                            </div>
                        </div>
                        <div className="chat">
                            <div className="chaticon-sentence"> 
                                <img className="chatimg" src={require("./Assets/icons8-comments-96.png")} alt="comment icon" />
                                <div className="chatsentence">{"First Chat sentence...."}</div>
                            </div>
                            <div className="delete">
                                <img src={require("./Assets/icons8-delete-192.png")} alt="delete icon" />
                            </div>
                        </div>
                        <div className="chat">
                            <div className="chaticon-sentence"> 
                                <img className="chatimg" src={require("./Assets/icons8-comments-96.png")} alt="comment icon" />
                                <div className="chatsentence">{"First Chat sentence...."}</div>
                            </div>
                            <div className="delete">
                                <img src={require("./Assets/icons8-delete-192.png")} alt="delete icon" />
                            </div>
                        </div>
                    </div>
                    <div className="horizontal-line">
                        <div className="hr one"></div>
                        <div className="hr two"></div>
                    </div>
                    <div className="settings-account">
                        <div className="settings">
                            <img src={require("./Assets/icons8-settings-128.png")} alt="settings icon"/>
                            <div>Settings</div>
                        </div>
                        <div className="account">
                            <img src={require("./Assets/Ellipse 517.png")} alt="male user"/>
                            <div>{"User Icon"}</div>
                        </div>
                    </div>
                </div>
                <div className="chatroom">
                    <div className="chatroom-textarea">
                        <NewChat/>
                    </div>
                    <div className="textbox">
                        <div className="img-textbox">
                            <img className="brain-icon" src={require("./Assets/icons8-brain-96.png")} alt="brain icon"/>
                            <div className="textbox-input"><input type={"text"} placeholder="What's in your mind?..."/></div>
                            <img className="send-icon" src={require("./Assets/icon1.png")} alt="paper plane"/>
                        </div>
                        <div className="audio">
                            <img src={require("./Assets/icon2.png")} alt="microphone icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default ChatRoom;