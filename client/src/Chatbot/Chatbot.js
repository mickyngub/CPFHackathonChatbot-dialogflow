import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Chatbot = () => {
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

      conversation = {
        who: "bot",
        content: content,
      };
      console.log("text bot sent", conversation);
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
      const content = response.data.fulfillmentMessages[0];

      let conversation = {
        who: "bot",
        content: content,
      };
      console.log(conversation);
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
  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
        margin: "auto",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}></div>
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
