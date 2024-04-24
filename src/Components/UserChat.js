import {
  faClone,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import "./CSS/UserChat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { faRotateForward, faTriangleExclamation, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useSpeechSynthesis } from "react-speech-kit";

const UserChat = ({ messages, sending, error, handleSend}) => {
  const { speak, voices } = useSpeechSynthesis();
  const room = useRef();

  useEffect(() => {
    if (messages) {
      room.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.authur === "LAWBOT"
              ? "user-bot-chat bot-response"
              : "user-bot-chat user-response"
          }
        >
          {message.authur === "LAWBOT" ? (
            <div className="bot-profile">
              <div className="bot-name">
                <p>CHAT A.I +</p>
              </div>
              <div className="bot-arrow">
                <img src={require("./Assets/arrow icon.png")} alt="arrow" />
              </div>
            </div>
          ) : (
            <div className="user-profile">
              <img src={require("./Assets/Ellipse 517.png")} alt="user" />
            </div>
          )}
          <div
            className={message.authur === "LAWBOT" ? "bot-text" : "user-text"}
          >
            {sending && message.authur === "LAWBOT" && (index === messages.length-1) ? (
              <div className="loading">
                <div className="load"></div>
                <div className="load"></div>
                <div className="load"></div>
              </div>
            ) : ( 
              <div>             
                <p>{message.message}</p>
                {message.authur === "LAWBOT" && (
                  <div className="like-copy-regen">
                    <div className="like-copy">
                      <div>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faThumbsDown} />
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faClone} />
                      </div>
                    </div>
                    <div
                      className="read-text"
                      onClick={(e) => {
                        speak({ text: message.message, voice: voices[3] });
                      }}
                    >
                      <div
                        id={`${index}`}
                        style={{ display: "flex" }}
                        className="speak"
                      >
                        <FontAwesomeIcon icon={faVolumeHigh} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {error ? (
        <div className="user-bot-chat bot-response">
          <div className="bot-text">
            <div className="bot-profile">
              <div className="bot-name">
                <p>CHAT A.I +</p>
              </div>
              <div className="bot-arrow">
                <img src={require("./Assets/arrow icon.png")} alt="arrow" />
              </div>
            </div>
            <div className="warning-text">
                <div><FontAwesomeIcon icon={faTriangleExclamation} /></div>
                <p>Couldn't fetch - Check your internet connection</p>
            </div>
            <div className="regenerate">
                <div><FontAwesomeIcon icon={faRotateForward} /></div>
                <p onClick={handleSend}>Regenerate</p>
            </div>
          </div>
        </div>
      ) : 
        null
      }
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default UserChat;
