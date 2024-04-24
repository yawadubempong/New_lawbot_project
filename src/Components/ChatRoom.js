import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/ChatRoom.css";
import NewChat from "./NewChat";
import UserChat from "./UserChat";
import Chats from "./Chats";
import { useEffect, useRef, useState } from "react";
import {
  faClose,
  faMagnifyingGlass,
  faStop,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition/lib/SpeechRecognition";
import Settings from "./Settings";

const ChatRoom = () => {
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const {
    transcript,
    resetTranscript
  } = useSpeechRecognition();
  const [speech, setSpeech] = useState("start");
  const [inputState, setInputState] = useState("");
  const textAreaRef = useRef(null);
  const newChat = useRef();
  const searchBtn = useRef();
  const [chatData, setChatData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState([]);
  const [settingDisplay, setSettingsDisplay] = useState(false);
  const [sending, setsending] = useState(false);
  const [startChat, setStartChat] = useState(false);
  const sidenav = useRef(null);
  const sidenavBg = useRef(null);
  const searchFieldRef = useRef(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(false)

  const expand = () => {
    document.getElementById("newChat").classList.toggle("collapse");
    document.getElementById("search-btn").classList.toggle("expand");
  };

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize.width > "900px") {
      document.querySelector(".sidenav").style.display = "flex";
    }
  }, [screenSize]);

  const handleSlideIn = () => {
    sidenav.current.style.transform = "translateX(0px)";
    sidenav.current.style.transition = "0.4s ease-out";
    sidenavBg.current.style.display = "block";
    sidenavBg.current.style.animation = "fadeIn 0.3s";
  };

  const handleSlideOut = () => {
    sidenav.current.style.transform = "translateX(-400px)";
    sidenav.current.style.transition = "0.4s ease-out";
    sidenavBg.current.style.display = "none";
    sidenavBg.current.style.animation = "fadeIn 0.3s";
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
      if (messages.length > 0) {
        setStartChat(false);
      } else {
        setStartChat(true);
      }
    });
  },[]);

  const handleSend = async () => {
    try {
      if(sending){
        return;
      }
      if(error){
        setError(false)
        setMessages((prevMessages) => [
          ...prevMessages, { authur: "LAWBOT"}
        ]);
        setsending(true)
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: String(inputState), 
            authur: "User",
            like: false,
            dislike: false,
          }, { authur: "LAWBOT"}
        ]);
        setsending(true);
      }

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

        console.log(messages);

        const response = await fetch(url, options);
        const data = await response.json();
        // Check if the response is successful
        if (response.ok) {
          // Append the new message to the messages array
          
          console.log("Message sent successfully!");
          setsending(false);
          setMessages((prevMessages) => [...prevMessages.slice(0, -1), data]);
          setStartChat(false);
          setInputState("");
        } else {
          setMessages((prevMessages) => [...prevMessages.slice(0, -1)]);
          console.error("Error sending message:", response.statusText);
          setError(true)
        }
      }
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages.slice(0, -1)]);
      console.error("Error sending message:", error);
      setError(true)
    }
    setsending(false);
  };

  const handleAddChatOnServer = async () => {
    try {
      // Send POST request to the /chat endpoint
      const url = "/chat/";
      const options = {
        method: "POST",
      };

      const response = await fetch(url, options);

      // Check if the response is successful
      if (!response.ok) {
        console.error("Error sending message to server:", response.statusText);
        setError(true)
      } else {
        const data = response.json();
        return data;
      }
    } catch (error) {
      console.error("Error sending message to server:", error);
      setError(true)
    }
  };

  const startNewChat = () => {
    handleAddChatOnServer().then((data) => {
      if (data) {
        // Assuming chatData is the state variable to store the chat data
        setChatData(data.chats);
        setMessages(data.messages);
        setStartChat(true);
      }
    });
  };

  // Search logic
  const filteredChats = () => {
    if (searchFieldRef.current.value.trim() !== "") {
      setSearching(true);
      setResults(
        chatData.filter((elem) => {
          return elem.name.toLowerCase().includes(searchFieldRef.current.value.toLowerCase());
        })
      );
    } else {
      setSearching(false);
      setResults([]);
    }
  };

  const handleLoadChat = async (id) => {
    try {
      const response = await fetch("/loadchat/", {
        method: "POST",
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching latest chat data:", error);
      return null;
    }
  };

function loadChat(id) {
    handleLoadChat(id).then((data) => {
      if (data) {
        // Assuming chatData is the state variable to store the chat data
        setChatData(data.chats);
        setMessages(data.messages);
        if (data.messages.length > 0) {
          setStartChat(false);
        }
      }
    });
  };

  const handleDeleteChat = async (id) => {
    try {
      const response = await fetch("/deletechat/", {
        method: "POST",
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not delete chat:", error);
      return null;
    }
  };

  function deleteChat(id) {
    if(chatData.length > 1) {
    handleDeleteChat(id).then((data) => {
      if (data) {
        // Assuming chatData is the state variable to store the chat data
        setChatData(data.chats);
        if (data.messages) {
          setMessages(data.messages);
        }
      }
    });
  }
  };

  //

  function resizeTextArea() {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.style.height = "40px";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  const resetSearch = () => {
    searchFieldRef.current.value = "";
  }

  return (
    <>
      {settingDisplay === true ? (
        <Settings setSettingsDisplay={setSettingsDisplay} />
      ) : null}
      <div className="chatroom-page">
        <div ref={sidenavBg} className="sidenav-background">
          <div className="slideOut" onClick={handleSlideOut}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <div className="sidenav" ref={sidenav}>
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
              ref={newChat}
              onClick={startNewChat}
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
                <input
                  type={"text"}
                  placeholder="Search.."
                  ref={searchFieldRef}
                  onChange={filteredChats}
                />
              </div>
              <div onClick={expand} className="icon-btns">
                <div className="icon-search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="icon-close" onClick={resetSearch}>
                  <FontAwesomeIcon icon={faClose} />
                </div>
              </div>
            </div>
          </div>
          <div className="navlinks-title">
            <div>Your conversations</div>
          </div>

          <div className="prev-chat-nav">
            {searching === true ? (
              <Chats chats={results} deleteChat={deleteChat} loadChat={loadChat}/>
            ) : (
              <Chats chats={chatData} deleteChat={deleteChat} loadChat={loadChat} />
            )}
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
            <div className="bars-logo">
              <div className="bars-div" onClick={handleSlideIn}>
                <FontAwesomeIcon icon={faBars} />
              </div>
              <div className="logo-div">
                <div className="nav-logo">
                  <img
                    src={require("./Assets/image 1.png")}
                    alt="weighing scale"
                  />
                  <div>Law Chatbot</div>
                </div>
              </div>
            </div>
            {startChat ? (
              <NewChat
                messages={messages}
                chatData={chatData}
                setChatData={setChatData}
                setMessages={setMessages}
              />
            ) : (
              <UserChat
                handleSend={handleSend}
                error={error}
                sending={sending}
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
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && inputState !== "") {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
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
                onClick={(event) => {
                  event.preventDefault();
                  handleSend();
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
