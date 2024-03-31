import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/ChatRoom.css";
import NewChat from "./NewChat";
import UserChat from "./UserChat";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  faClose,
  faMagnifyingGlass,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition/lib/SpeechRecognition";
import Settings from "./Settings";
import { ref } from "yup";

const ChatRoom = () => {
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportSpeechRecognition,
  } = useSpeechRecognition();
  const [currentChat, setCurrentChat] = useState("newChat");
  const [speech, setSpeech] = useState("start");
  const [inputState, setInputState] = useState("");
  const [textboxTranscript, setTextboxTranscript] = useState("");
  const textAreaRef = useRef(null);
  const newChat = useRef();
  const iconInput = document.getElementById("iconInput");
  const searchBtn = useRef();
  const [chatData, setChatData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settingDisplay, setSettingsDisplay] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [send, setSend] = useState(false);
  const expand = () => {
    newChat.classList.toggle("collapse");
    searchBtn.classList.toggle("expand");
  };
  console.log(textboxTranscript);

  const active = (e) => {
    if (e.target === "chat") {
    }
  };

  useEffect(() => {
    if (inputState === "") {
      document.querySelector(".brain-icon").style.display = "block";
      document.querySelector(".textarea").style.marginLeft = "3px";
    } else {
      document.querySelector(".brain-icon").style.display = "none";
      document.querySelector(".textarea").style.marginLeft = "32px";
    }
  }, [inputState]);

  const fetchLatestChatData = async () => {
    try {
      const response = await fetch("/latestchat/", { method: "GET" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching latest chat data:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchLatestChatData().then((data) => {
      if (data) {
        // Assuming chatData is the state variable to store the chat data
        setChatData(data.chats);
        setMessages(data.messages);
      }
    });
  }, []);

  /*const handleSend = async (event) => {
    try {
      event.preventDefault();
  
      // Validate if the inputState is not empty
      if (inputState.trim() !== "") {
        const url = "/messages/";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "message": String(inputState) }),
        };
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { message : inputState }
        ]);
        console.log(messages)
        
        const response = await fetch(url, options);
        const data = await  response.json();
        // Check if the response is successful
      if (response.ok) {
        // Append the new message to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { message : inputState }
        ]);
        console.log("Message sent successfully!");
        setMessages((prevMessages) => [
          ...prevMessages,
          data.message
        ]);
          setInputState("");
        } else {
          console.error("Error sending message:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  */

  useEffect(() => {
    const submit = async () => {
      try {
        // Validate if the inputState is not empty
        if (inputState.trim() !== "") {
          const url = "/messages/";
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: String(inputState) }),
          };

          setMessages((prevMessages) => [
            ...prevMessages,
            { message: inputState },
          ]);
          

          const response = await fetch(url, options);
          const data = await response.json();
          // Check if the response is successful
          if (response.ok) {
            // Append the new message to the messages array
            setMessages((prevMessages) => [
              ...prevMessages,
              { message: inputState },
            ]);
            console.log("Message sent successfully!");
            setMessages((prevMessages) => [...prevMessages, data.message]);
            setInputState("");
            setSend(false);
          } else {
            console.error("Error sending message:", response.statusText);
          }
          console.log(messages);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };
    submit();
  }, [send]);

  function resizeTextArea() {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.style.height = "40px";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  return (
    <>
      {settingDisplay === true ? (
        <Settings setSettingsDisplay={setSettingsDisplay} />
      ) : null}
      <div className="chatroom-page">
        <div className="sidenav">
          <div className="nav-logo-title">
            <div className="nav-logo-image">
              <img
                src={require("./Assets/image 1.png")}
                alt="weighing scale icon"
              />
            </div>
            <div className="nav-logo-text">Law Chatbot</div>
          </div>
          <div className="newchat-search">
            <div
              id="newChat"
              className="newchat"
              onClick={(e) => {
                ref(newChat);
                setCurrentChat("newChat");
              }}
            >
              <div className="newchat-image">
                <img
                  src={require("./Assets/icons8-add-48.png")}
                  alt="plus sign"
                />
              </div>
              <div className="newchat-text">New Chat</div>
            </div>
            <div id="search-btn" ref={searchBtn} className="search-icon">
              <div id="iconInput" className="icon-input">
                <input type={"text"} placeholder="Search.." />
              </div>
              <div onClick={expand} className="icon-btns">
                <div className="icon-search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="icon-close">
                  <FontAwesomeIcon icon={faClose} />
                </div>
              </div>
            </div>
          </div>
          <div className="navlinks-title">
            <div>Your conversations</div>
            <div>Clear All</div>
          </div>

          <div className="prev-chat-nav">
            {chatData.map((chat) => (
              <div className="chat" key={chat.id}>
                <div className="chaticon-sentence">
                  <img
                    className="chatimg"
                    src={require("./Assets/icons8-comments-96.png")}
                    alt="comment icon"
                  />
                  <div className="chatsentence">{chat.name}</div>
                </div>
                <div className="delete">
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            ))}
          </div>
          <div className="horizontal-line">
            <div className="hr one"></div>
            <div className="hr two"></div>
          </div>
          <div className="settings-account">
            <div
              onClick={() => {
                setSettingsDisplay(true);
              }}
              className="settings"
            >
              <img
                src={require("./Assets/icons8-settings-128.png")}
                alt="settings icon"
              />
              <div>Settings</div>
            </div>
            <div className="account">
              <img src={require("./Assets/Ellipse 517.png")} alt="male user" />
              <div>{"User Icon"}</div>
            </div>
          </div>
        </div>
        <div className="chatroom">
          <div className="chatroom-textarea">
            {messages.length > 0 || chatData.length > 0 ? (
              <UserChat
                messages={messages}
                chatData={chatData}
                setChatData={setChatData}
                setMessages={setMessages}
              />
            ) : (
              <NewChat
                messages={messages}
                chatData={chatData}
                setChatData={setChatData}
                setMessages={setMessages}
              />
            )}
          </div>
          <div className="textbox">
            <div className="img-textbox">
              <img
                className="brain-icon"
                src={require("./Assets/icons8-brain-96.png")}
                alt="brain icon"
              />
              {speech === "start" ? (
                <textarea
                  required
                  value={inputState}
                  className="textarea"
                  placeholder="What's in your mind?"
                  ref={textAreaRef}
                  onChange={(e) => {
                    setInputState(e.target.value);
                    resizeTextArea();
                  }}
                ></textarea>
              ) : (
                <textarea
                  required
                  value={transcript}
                  className="textarea"
                  placeholder="What's in your mind?"
                  ref={textAreaRef}
                  onChange={(e) => {
                    resizeTextArea();
                  }}
                ></textarea>
              )}
              {/* <div className="textbox-input"><div contentEditable="true" data-autoresize  id="txt" placeholder="What's in your mind?" onChange={handleChange}></div></div> */}
              <img
                className="send-icon"
                onClick={() => {
                  setSend(true);
                }}
                src={require("./Assets/icon1.png")}
                alt="paper plane"
              />
            </div>
            <div className="audio">
              {speech === "start" ? (
                <img
                  src={require("./Assets/icon2.png")}
                  onClick={() => {
                    startListening();
                    setSpeech("stop");
                    resetTranscript();
                    setInputState("");
                  }}
                  alt="microphone icon"
                />
              ) : (
                <div
                  className="stop"
                  onClick={() => {
                    setSpeech("start");
                    SpeechRecognition.stopListening();
                    setInputState(transcript);
                  }}
                >
                  <div className="pulse"></div>
                  <FontAwesomeIcon icon={faStop} />
                </div>
              )}
            </div>
          </div>
          <div className="transparent-bar"></div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
