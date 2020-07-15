import React, { useEffect, useRef } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../_actions/message_actions";

import Message from "./Sections/Message";

const Chatbot = () => {
  const endOfMessages = useRef(null);
  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);
  useEffect(scrollToBottom, [messagesFromRedux]);

  useEffect(() => {
    eventQuery("welcomeToWebsite");
  }, []);
  const textQuery = async (text) => {
    let conversations = [];

    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };
    dispatch(saveMessage(conversation));
    console.log("text I sent", conversation);

    // conversations.push(conversation);
    const textQueryVariables = {
      text,
    };
    try {
      const response = await Axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariables
      );
      const content = response.data.fulfillmentMessages[0];

      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }

      //   console.log("text bot sent", conversation);
      //   conversations.push(conversation);
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error occurred",
          },
        },
      };
      //   conversations.push(conversation);
      dispatch(saveMessage(conversation));

      console.log(conversation);
    }
  };

  const eventQuery = async (event) => {
    // conversations.push(conversation);
    const eventQueryVariables = {
      event,
    };
    try {
      const response = await Axios.post(
        "/api/dialogflow/eventQuery",
        eventQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
      //   console.log(conversation);
      //   conversations.push(conversation);
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error occurred",
          },
        },
      };
      //   conversations.push(conversation);
      dispatch(saveMessage(conversation));

      console.log(conversation);
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("you need to type something!");
      }
      textQuery(e.target.value);
      e.target.value = "";
    }
  };

  const renderOneMessage = (message, i) => {
    console.log("Message is", message);

    if (message.content && message.content.text && message.content.text.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else if (message.content && message.content.payload.fields.card) {
      return (
        <Message
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
          key={i}
          card={message.content.payload.fields.card.listValue.values}
          who={message.who}
        />
      );
    }
  };
  const renderMessage = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 600,
        border: "3px solid black",
        borderRadius: "7px",
        margin: "auto",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {renderMessage(messagesFromRedux)}
        <div ref={endOfMessages}></div>
      </div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHandler}
        type="text"
      />
    </div>
  );
};

export default Chatbot;
