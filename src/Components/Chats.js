import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/ChatRoom.css";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

const Chats = ({ chats , loadChat , deleteChat }) => {
  const [activeId, setAciveId] = useState()
  useEffect(() => {
    console.log(chats);
},[chats])

    return (
        <>
            {(chats.map((chat) => (
                  <div
                    id = {`${chats.indexOf(chat)}`}
                    className={`chat ${activeId === chats.indexOf(chat)? "active": ""}`}
                    key={chat.id}
                    onClick={(e) => {
                      loadChat(chat.id);
                      setAciveId(chats.indexOf(chat))
                    }}
                  >
                    <div className="chaticon-sentence">
                      <img className="blue-dot" src={require("./Assets/Ellipse 513.png")} alt="blue dot"/>
                      <img
                        className="chatimg"
                        src={require("./Assets/icons8-comments-96.png")}
                        alt="comment icon"
                      />
                      <div className="chatsentence">{chat.name}</div>
                    </div>
                    <div className="delete" onClick={() => deleteChat(chat.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                  </div>
                )))}
        </>);
};


export default Chats;