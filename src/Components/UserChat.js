import { faClone, faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "./CSS/UserChat.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserChat = () => {
    return (
        <>
            <div className="user-bot-chat">
                <div className="user-response">
                    <div className="user-profile">
                        <img src={require("./Assets/Ellipse 517.png")} alt="user" />
                    </div>
                    <div className="user-text">
                        <p>{"Create a chatgpt using python language what will the be step for that"}</p>
                    </div>
                </div>
                <div className="bot-response">
                    <div className="bot-profile">
                        <div className="bot-name">
                            <p>CHAT A.I +</p>
                        </div>
                        <div className="bot-arrow">
                            <img src={require("./Assets/arrow icon.png")} alt="arrow"/>
                        </div>
                    </div>
                    <div className="bot-text">
                            <p className="first-bot-response">Sure, I can help you get started with creating a chatbot using
                                 GPT in Python. Here are the basic steps you'll need to follow:
                            </p>
                            <ol>
                                <li>
                                <p>Install the required libraries:</p> You'll need to install the 
                                transformers library from Hugging Face to use GPT. You can install it using pip.
                                </li>
                                <li>
                                <p>Load the pre-trained model:</p> GPT comes in several sizes and versions, so you'll
                                 need to choose the one that fits your needs. You can load a pre-trained GPT
                                  model. This loads the 1.3B parameter version of GPT-Neo, which is a 
                                  powerful and relatively recent model.
                                </li>
                                <li>
                                <p>Create a chatbot loop:</p> You'll need to create a loop that takes user input, 
                                generates a response using the GPT model, and outputs it to the user. 
                                Here's an example loop that uses the input() function to get user 
                                input and the gpt() function to generate a response, This loop will 
                                keep running until the user exits the program or the loop is interrupted.
                                </li>
                                <li>
                                <p>Some personality to the chatbot:</p> While GPT can generate text, it doesn't 
                                have any inherent personality or style. You can make your chatbot more interesting 
                                by adding custom prompts or responses that reflect your desired personality. 
                                You can then modify the chatbot loop to use these prompts and responses when 
                                appropriate. This will make the chatbot seem more human-like and engaging.
                                </li>
                            </ol>
                            <p className="last-bot-response">
                            These are just the basic steps to get started with a GPT chatbot in Python. Depending on 
                            your requirements, you may need to add more features or complexity to the chatbot. Good luck!
                            </p>
                    </div>
                    <div className="like-copy-regen">
                        <div className="like-copy">
                            <div><FontAwesomeIcon icon={faThumbsUp} /></div>
                            <div><FontAwesomeIcon icon={faThumbsDown} /></div>
                            <div><FontAwesomeIcon icon={faClone} /></div>
                        </div>
                        <div className="regen">
                            <div className="regen-img">
                                <img src={require("./Assets/icons8-sync-50.png")} alt="synic icon" />
                            </div>
                            <div className="regen-text">
                                <p>Regenerate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-bot-chat">
                <div className="user-response">
                    <div className="user-profile">
                        <img src={require("./Assets/Ellipse 517.png")} alt="user" />
                    </div>
                    <div className="user-text">
                        <p>{"Create a chatgpt using python language what will the be step for that"}</p>
                    </div>
                </div>
                <div className="bot-response">
                    <div className="bot-profile">
                        <div className="bot-name">
                            <p>CHAT A.I +</p>
                        </div>
                        <div className="bot-arrow">
                            <img src={require("./Assets/arrow icon.png")} alt="arrow"/>
                        </div>
                    </div>
                    <div className="bot-text">
                            <p className="first-bot-response">Sure, I can help you get started with creating a chatbot using
                                 GPT in Python. Here are the basic steps you'll need to follow:
                            </p>
                            <ol>
                                <li>
                                <p>Install the required libraries:</p> You'll need to install the 
                                transformers library from Hugging Face to use GPT. You can install it using pip.
                                </li>
                                <li>
                                <p>Load the pre-trained model:</p> GPT comes in several sizes and versions, so you'll
                                 need to choose the one that fits your needs. You can load a pre-trained GPT
                                  model. This loads the 1.3B parameter version of GPT-Neo, which is a 
                                  powerful and relatively recent model.
                                </li>
                                <li>
                                <p>Create a chatbot loop:</p> You'll need to create a loop that takes user input, 
                                generates a response using the GPT model, and outputs it to the user. 
                                Here's an example loop that uses the input() function to get user 
                                input and the gpt() function to generate a response, This loop will 
                                keep running until the user exits the program or the loop is interrupted.
                                </li>
                                <li>
                                <p>Some personality to the chatbot:</p> While GPT can generate text, it doesn't 
                                have any inherent personality or style. You can make your chatbot more interesting 
                                by adding custom prompts or responses that reflect your desired personality. 
                                You can then modify the chatbot loop to use these prompts and responses when 
                                appropriate. This will make the chatbot seem more human-like and engaging.
                                </li>
                            </ol>
                            <p className="last-bot-response">
                            These are just the basic steps to get started with a GPT chatbot in Python. Depending on 
                            your requirements, you may need to add more features or complexity to the chatbot. Good luck!
                            </p>
                    </div>
                    <div className="like-copy-regen">
                        <div className="like-copy">
                            <div><FontAwesomeIcon icon={faThumbsUp} /></div>
                            <div><FontAwesomeIcon icon={faThumbsDown} /></div>
                            <div><FontAwesomeIcon icon={faClone} /></div>
                        </div>
                        <div className="regen">
                            <div className="regen-img">
                                <img src={require("./Assets/icons8-sync-50.png")} alt="synic icon" />
                            </div>
                            <div className="regen-text">
                                <p>Regenerate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-bot-chat">
                <div className="user-response">
                    <div className="user-profile">
                        <img src={require("./Assets/Ellipse 517.png")} alt="user" />
                    </div>
                    <div className="user-text">
                        <p>{"Create a chatgpt using python language what will the be step for that"}</p>
                    </div>
                </div>
                <div className="bot-response">
                    <div className="bot-profile">
                        <div className="bot-name">
                            <p>CHAT A.I +</p>
                        </div>
                        <div className="bot-arrow">
                            <img src={require("./Assets/arrow icon.png")} alt="arrow"/>
                        </div>
                    </div>
                    <div className="bot-text">
                            <p className="first-bot-response">Sure, I can help you get started with creating a chatbot using
                                 GPT in Python. Here are the basic steps you'll need to follow:
                            </p>
                            <ol>
                                <li>
                                <p>Install the required libraries:</p> You'll need to install the 
                                transformers library from Hugging Face to use GPT. You can install it using pip.
                                </li>
                                <li>
                                <p>Load the pre-trained model:</p> GPT comes in several sizes and versions, so you'll
                                 need to choose the one that fits your needs. You can load a pre-trained GPT
                                  model. This loads the 1.3B parameter version of GPT-Neo, which is a 
                                  powerful and relatively recent model.
                                </li>
                                <li>
                                <p>Create a chatbot loop:</p> You'll need to create a loop that takes user input, 
                                generates a response using the GPT model, and outputs it to the user. 
                                Here's an example loop that uses the input() function to get user 
                                input and the gpt() function to generate a response, This loop will 
                                keep running until the user exits the program or the loop is interrupted.
                                </li>
                                <li>
                                <p>Some personality to the chatbot:</p> While GPT can generate text, it doesn't 
                                have any inherent personality or style. You can make your chatbot more interesting 
                                by adding custom prompts or responses that reflect your desired personality. 
                                You can then modify the chatbot loop to use these prompts and responses when 
                                appropriate. This will make the chatbot seem more human-like and engaging.
                                </li>
                            </ol>
                            <p className="last-bot-response">
                            These are just the basic steps to get started with a GPT chatbot in Python. Depending on 
                            your requirements, you may need to add more features or complexity to the chatbot. Good luck!
                            </p>
                    </div>
                    <div className="like-copy-regen">
                        <div className="like-copy">
                            <div><FontAwesomeIcon icon={faThumbsUp} /></div>
                            <div><FontAwesomeIcon icon={faThumbsDown} /></div>
                            <div><FontAwesomeIcon icon={faClone} /></div>
                        </div>
                        <div className="regen">
                            <div className="regen-img">
                                <img src={require("./Assets/icons8-sync-50.png")} alt="synic icon" />
                            </div>
                            <div className="regen-text">
                                <p>Regenerate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default UserChat;