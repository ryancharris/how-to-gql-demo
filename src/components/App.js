import React from "react";
import "../styles/App.css";

import { Switch, Route } from "react-router-dom";

import CreateLink from "./CreateLink";
import Header from "./Header";
import LinkList from "./LinkList";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/create" component={CreateLink} />
      </Switch>
    </div>
  );
}

export default App;
