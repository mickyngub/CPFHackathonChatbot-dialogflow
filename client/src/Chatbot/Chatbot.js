import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../_actions/message_actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Adb from "@material-ui/icons/Adb";
import AccountCircle from "@material-ui/icons/AccountCircle";

const Chatbot = () => {
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);
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
    return (
      <List key={i} style={{ padding: "1rem" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {message.who === "bot" ? <Adb /> : <AccountCircle />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={message.content.text.text}
            secondary={message.who}
          />
        </ListItem>
      </List>
    );
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
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
        margin: "auto",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {renderMessage(messagesFromRedux)}
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
