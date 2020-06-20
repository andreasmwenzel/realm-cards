import React from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RealmApp, { useRealmApp } from "./realm/RealmApp";
import RealmApolloProvider from "./realm/RealmApolloProvider";

import "./App.css";
import Body from "./components/Body";
import LandingPage from "./components/LandingPage";
import GamesPage from "./components/GamesPage";
import AboutPage from "./components/AboutPage";
import UserPage from "./components/UserPage";
import LoginPage from "./components/LoginPage";
import UserConfirmationPage from "./components/UserConfirmationPage";
import UserPasswordResetPage from "./components/UserPasswordResetPage";

import { Loader } from "semantic-ui-react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <RealmApp>
      {/* <Navbar /> */}
      <Router>
        <Routes />
      </Router>
    </RealmApp>
  );
}

export default App;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Routes() {
  console.log("Hello");
  let query = useQuery();
  //const { user, logOut, logInAnon } = useRealmApp();
  return (
    <Switch>
      <Route exact path="/" component={LandingPage}></Route>
      <Route path="/games/" component={GamesPage}></Route>
      <Route path="/signup/">
        <LoginPage initialMode="signup" />
      </Route>
      <Route path="/login">
        <LoginPage initialMode="login" />
      </Route>
      <Route path="/about/" component={AboutPage}></Route>
      <Route exact path="/user/" component={UserPage} />
      <Route exact path="/user/confirm">
        <UserConfirmationPage
          token={query.get("token")}
          tokenId={query.get("tokenId")}
        />
      </Route>
      <Route exact path="/user/reset">
        <UserPasswordResetPage
          token={query.get("token")}
          tokenId={query.get("tokenId")}
        />
      </Route>
    </Switch>
  );
}

function RequireAuthentication() {
  const app = useRealmApp();
  console.log(app);
  //console.log(app);

  if (!app.user) {
    app.logIn("joe@shmo.com", "password");
  }

  return app.user ? (
    <RealmApolloProvider>
      <div style={{ marginTop: "7em" }}>
        <Body />
      </div>
    </RealmApolloProvider>
  ) : (
    //TODO Make this a spinning loading thingy
    <Loader active inline="centered" />
  );
}
