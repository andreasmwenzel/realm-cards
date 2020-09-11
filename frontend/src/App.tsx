import React from "react";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RealmApp, { useRealmApp } from "./realm/RealmApp";
import RealmApolloProvider from "./realm/RealmApolloProvider";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import GamesPage from "./pages/GamesPage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import UserConfirmationPage from "./pages/UserConfirmationPage";
import UserPasswordResetPage from "./pages/UserPasswordResetPage";

import { Loader } from "semantic-ui-react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const App: React.FC = (props) => {
  return (
    <RealmApp>
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
  let query = useQuery();
  //const { user, logOut, logInAnon } = useRealmApp();
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route path="/about/" component={AboutPage}></Route>

      <Route path="/signup/">
        <LoginPage initialMode="signup" />
      </Route>
      <Route path="/login">
        <LoginPage initialMode="login" />
      </Route>

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

      <Route exact path="/user/">
        <RequireAuthentication>
          <UserPage />
        </RequireAuthentication>
      </Route>

      <Route path="/games/">
        <RequireAuthentication>
          <GamesPage />
        </RequireAuthentication>
      </Route>
    </Switch>
  );
}

const RequireAuthentication: React.FC = (props) => {
  const app = useRealmApp();
  if (!app.user) {
    app.logInAnon();
  }
  return <RealmApolloProvider>{props.children}</RealmApolloProvider>
}
