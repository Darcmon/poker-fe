import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthContextProvider } from "./AuthContext";
import { CssBaseline } from "@material-ui/core";
import Game from "./Game";
import Home from "./Home";
import Lobby from "./Lobby";
import React from "react";

export default function App() {
  return (
    <>
      <CssBaseline />
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/lobby/:gameId">
              <Lobby />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </>
  );
}
