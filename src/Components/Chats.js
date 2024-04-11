import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/ChatRoom.css";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";

const Chats = ({ chats , loadChat , deleteChat }) => {

  useEffect(() => {
    console.log(chats);
},[chats])

    return (
        <>
            {(chats.map((chat) => (
                  <div
                    className="chat"
                    key={chat.id}
                    onClick={() => {
                      loadChat(chat.id);
                    }}
                  >
                    <div className="chaticon-sentence">
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