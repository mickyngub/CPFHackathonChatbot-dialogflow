import React from "react";
//Normal message
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Adb from "@material-ui/icons/Adb";
import AccountCircle from "@material-ui/icons/AccountCircle";
//Card message
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

const Message = (props) => {
  const renderCard = (cardArray) => {
    return cardArray.map((card, i) => {
      return (
        <Card key={i} style={{ width: 200 }}>
          <CardActionArea
            href={card.structValue.fields.link.stringValue}
            rel="noopener"
            target="_blank"
          >
            <CardMedia
              component="img"
              alt={card.structValue.fields.description.stringValue}
              image={card.structValue.fields.image.stringValue}
            ></CardMedia>
          </CardActionArea>
          <CardContent>
            <Typography component="h3">
              {card.structValue.fields.description.stringValue}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <List style={{ padding: "1rem" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>{props.who === "bot" ? <Adb /> : <AccountCircle />}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.text ? props.text : renderCard(props.card)}
          secondary={props.who}
        />
      </ListItem>
    </List>
  );
};

export default Message;
