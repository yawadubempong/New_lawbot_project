import { faClone, faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "./CSS/UserChat.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useSpeechSynthesis } from "react-speech-kit";

const UserChat = ({ messages, sending }) => {
    const { speak, voices } = useSpeechSynthesis()
    const room = useRef()


    useEffect(() => {
        if(messages) {
            room.current?.scrollIntoView({
                behavior: "smooth",
                block: "end"
            })
        }
       }, [messages])

    useEffect(() => {
        console.log(messages);
    },[messages])

    return (
        <>
            {messages.map((message, index) => (
                <div key={index} className={message.authur === "LAWBOT" ? "user-bot-chat bot-response" : "user-bot-chat user-response"}>
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
                    <div className={message.authur === "LAWBOT" ? "bot-text" : "user-text"}>
                        {(message.authur == "Sending") ? (
                            <div className="loading">
                            <div className="load"></div>
                            <div className="load"></div>
                            <div className="load"></div>
                            </div>
                        ) : (
                            <div>
                            <p>{message.message}</p>
                            <br></br>
                            </div>
                        )}

                    </div>
                    {message.authur === "LAWBOT" && (
                        <div className="like-copy-regen">
                            <div className="like-copy">
                                <div><FontAwesomeIcon icon={faThumbsUp} /></div>
                                <div><FontAwesomeIcon icon={faThumbsDown} /></div>
                                <div><FontAwesomeIcon icon={faClone} /></div>
                            </div>
                            <div  className="read-text" onClick={(e)=> {
                            speak({text: message.message, voice: voices[3]})
                            }}>
                                <div id={`${index}`} style={{display: "flex"}} className="speak">
                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                </div>  
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default UserChat;