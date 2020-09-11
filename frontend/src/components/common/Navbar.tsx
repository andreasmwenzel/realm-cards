import * as React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useRealmApp } from "../../realm/RealmApp";

interface NavBarProps {
  hideLoginButtons: boolean | undefined;
}

export default function Navbar(props: NavBarProps) {
  const { user, logOut } = useRealmApp();
  const profile: Realm.UserProfile | undefined = user?.profile
  const email = profile?.email;
  const name = profile?.name;

  let history = useHistory();

  const handleButton = async () => {
    console.log(user?.customData);
  };

  return (
    <Menu
      fixed="top"
      //inverted={!fixed}
      //pointing={!fixed}
      //secondary={!fixed}
      size="large"
      id="Navbar"
    >
      <Container>
        <Menu.Item as="a" onClick={() => history.push("/")}>
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={() => history.push("/about")}>
          About
        </Menu.Item>
        <Menu.Item as="a" onClick={() => handleButton()}>
          UserInfoToConsole
        </Menu.Item>
        {email ? (
          <Menu.Item position="right">
            <Button
              as="a"
              style={{ marginLeft: "0.5em" }}
              onClick={() => history.push("/user")}
            >
              {email}
            </Button>
            <Button
              as="a"
              style={{ marginLeft: "0.5em" }}
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </Button>
          </Menu.Item>
        ) : props.hideLoginButtons ? null : (
          <Menu.Item position="right">
            <Button as="a" onClick={() => history.push("/login")}>
              Log in
            </Button>
            <Button
              as="a"
              //inverted={!fixed}
              primary
              onClick={() => history.push("/signup")}
              style={{ marginLeft: "0.5em" }}
            >
              Sign Up
            </Button>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
}

