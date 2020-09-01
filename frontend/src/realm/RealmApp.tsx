import * as React from "react";
import * as Realm from "realm-web";
import * as attachUserData from "./RealmCardsUser";
import { from } from "apollo-boost";

const REALM_APP_ID = "realm-card-zacxr";
const app = new Realm.App({ id: REALM_APP_ID });

const RealmAppContext = React.createContext<IRealmApp | void>(undefined);

interface IRealmApp {
  id: string;
  user: Realm.User | null;
  logIn: (email: string, password: string) => Promise<void>;
  logInAnon: () => Promise<void>;
  logOut: () => Promise<void>;
  registerUser(email: string, password: string): Promise<void>;
  confirmUser(token: string, tokenId: string): Promise<void>;
}

const RealmApp: React.FC = ({ children }) => {

  const appRef = React.useRef(app);
  const [user, setUser] = React.useState(app.currentUser);

  React.useEffect(() => {
    //attachUserData(app, app.currentUser);
    //app.currentUser.fetchUserData();
    setUser(app.currentUser);
  }, [appRef.current.currentUser]);

  // Let new users register an account
  const registerUser = async (email: string, password: string) => {
    return await app.emailPasswordAuth.registerUser(email, password);
  };

  //confirm user registration
  const confirmUser = async (token: string, tokenId: string) => {
    return await app.emailPasswordAuth.confirmUser(token, tokenId);
  };

  // Let registered users log in
  const logIn = async (email: string, password: string) => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    await app.logIn(credentials);
    setUser(app.currentUser);
  };

  //Log anon-user in
  const logInAnon = async () => {
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    setUser(app.currentUser);
  };

  // Let logged in users log out
  const logOut = async () => {
    await app.currentUser?.logOut();
    setUser(app.currentUser);
  };

  // Provide the current user and authentication methods to the wrapped tree
  const context: IRealmApp = {
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
