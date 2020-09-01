import * as React from "react";
import * as RealmWeb from "realm-web";
import * as attachUserData from "./RealmCardsUser";
import { from } from "apollo-boost";

const REALM_APP_ID = "realm-card-zacxr";
const app = new RealmWeb.App({ id: REALM_APP_ID });

const RealmAppContext = React.createContext(undefined);

const RealmApp = ({ children }) => {
  const appRef = React.useRef(app);
  console.log(appRef);

  const [user, setUser] = React.useState(app.currentUser);
  React.useEffect(() => {
    attachUserData(app, app.currentUser);
    app.currentUser.fetchUserData();
    setUser(app.currentUser);
  }, [appRef.current.currentUser]);

  // Let new users register an account
  const registerUser = async (email, password) => {
    return await app.auth.emailPassword.registerUser(email, password);
  };

  //confirm user registration
  const confirmUser = async (token, tokenId) => {
    return await app.auth.emailPassword.confirmUser(token, tokenId);
  };

  // Let registered users log in
  const logIn = async (email, password) => {
    if (app.currentUser) {
      await app.logOut();
    }
    const credentials = RealmWeb.Credentials.emailPassword(email, password);
    await app.logIn(credentials);
    return await setUser(app, app.currentUser);
  };

  //Log anon-user in
  const logInAnon = async () => {
    const credentials = RealmWeb.Credentials.anonymous();
    await app.logIn(credentials);
    setUser(app.currentUser);
  };

  // Let logged in users log out
  const logOut = async () => {
    // TODO: Log the current user out
    await app.logOut();
    setUser(app.currentUser);
  };

  // Provide the current user and authentication methods to the wrapped tree
  const context = {
    id: REALM_APP_ID,
    user,
    logIn,
    logOut,
    logInAnon,
    registerUser,
    confirmUser,
  };
  return (
    <RealmAppContext.Provider value={context}>
      {children}
    </RealmAppContext.Provider>
  );
};

export default RealmApp;

export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error("You must call useRealmApp() inside of a <RealmApp />.");
  }
  return app;
};

//================================
