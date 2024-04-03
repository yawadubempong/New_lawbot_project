import "./CSS/NewChat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faBolt,
  faGlobe,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const NewChat = () => {
 
  return (
    <>
      <div className="new-chat-room">
        <div className="greetings">
          <div className="greetings-logo">
            <img src={require("./Assets/image 1.png")} alt="weighing scale" />
            <div>Law Chatbot</div>
          </div>
          <div className="greetings-text">
            Good day! How may I assist you today?
          </div>
        </div>
        <div className="option-cards">
          <div className="cards first-row">
            <div className="main-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <div className="card-title">Explore</div>
              <p className="card-paragraph">
                Learn how to use chat.ai platform for your needs
              </p>
            </div>
            <div className="vertical-lines">
              <div className="vline"></div>
              <div className="vline"></div>
              <div className="vline"></div>
            </div>
            <div className="secondary-card">
              <div className="title-img-paragraph">
                <img src={require("./Assets/explain.png")} alt="" />
                <div className="card-title">"Explain"</div>
              </div>
              <div className="paragraph-arrow">
                <p className="card-paragraph">
                  Quantum computing in single terms"
                </p>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
              </div>
            </div>
            <div className="secondary-card">
              <div className="title-img-paragraph">
                <img src={require("./Assets/how-to.png")} alt="" />
                <div className="card-title">"How to"</div>
              </div>
              <div className="paragraph-arrow">
                <p className="card-paragraph">
                  Make a search engine plaform like google"
                </p>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
              </div>
            </div>
          </div>
          <div className="cards second-row">
            <div className="main-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <div className="card-title">Capabilities</div>
              <p className="card-paragraph">
                How much capable chat.ai to full-fill your needs
              </p>
            </div>
            <div className="vertical-lines">
              <div className="vline"></div>
              <div className="vline"></div>
              <div className="vline"></div>
            </div>
            <div className="secondary-card">
              <div className="title-img-paragraph">
                <img src={require("./Assets/remember.png")} alt="" />
                <div className="card-title">"Remember"</div>
              </div>
              <div className="paragraph-arrow">
                <p className="card-paragraph">
                  Quantum computing in single terms"
                </p>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
              </div>
            </div>
            <div className="secondary-card">
              <div className="title-img-paragraph">
                <img src={require("./Assets/allows.png")} alt="" />
                <div className="card-title">"Allows"</div>
              </div>
              <div className="paragraph-arrow">
                <p className="card-paragraph">
                  Use to provide follow-up corrections"
                </p>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
              </div>
            </div>
          </div>
          <div className="cards third-row">
            <div className="main-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>
              <div className="card-title">Limitation</div>
              <p className="card-paragraph">
                How much capable chat.ai to full-fill your needs
              </p>
            </div>
            <div className="vertical-lines">
              <div className="vline"></div>
              <div className="vline"></div>
              <div className="vline"></div>
            </div>
            <div className="secondary-card">
              <div className="title-img-paragraph">
                <img src={require("./Assets/may.png")} alt="" />
                <div className="card-title">"May"</div>
              </div>
              <div className="paragraph-arrow">
                <p className="card-paragraph">
                  Occasionally generate incorrect information"
                </p>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
              </div>
            </div>
            <div className="secondary-card">
              <div className="title-img-paragraph">
                <img src={require("./Assets/limited.png")} alt="" />
                <div className="card-title">"Limited"</div>
              </div>
              <div className="paragraph-arrow">
                <p className="card-paragraph">
                  Knowledge of world and events after 2021"
                </p>
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChat;
