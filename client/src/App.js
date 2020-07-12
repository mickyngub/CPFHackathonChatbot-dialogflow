import React from "react";
import "./App.css";
import Assistant from "@material-ui/icons/Assistant";
import Typography from "@material-ui/core/Typography";
import Chatbot from "./Chatbot/Chatbot";

function App() {
  return (
    <React.Fragment>
      <div className="App" style={{ margin: 30 }}>
        <Typography variant="h2">
          CPF Chatbot! <Assistant />
        </Typography>
      </div>
      <Chatbot />
    </React.Fragment>
  );
}

export default App;
