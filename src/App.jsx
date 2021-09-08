import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthContextProvider } from "./AuthContext";
import { CssBaseline } from "@material-ui/core";
import Game from "./Game";
import Lobby from "./Lobby";
import React from "react";

export default function App() {
  return (
    <>
      <CssBaseline />
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/">
              <Lobby />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </>
  );
}
