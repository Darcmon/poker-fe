import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthContextProvider } from "./AuthContext";
import Lobby from "./Lobby";
import React from "react";

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/editor/:entryId">{/* <ReviewEdit /> */}</Route>
          <Route path="/">
            <Lobby />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}
