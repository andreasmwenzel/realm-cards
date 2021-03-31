import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useRealmApp } from "../realm/RealmApp";

export default function Navbar(props) {
  const { user, logOut } = useRealmApp();
  const profile = user?.profile;
  const username = user?.username;

  console.log(user);
  let history = useHistory();

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
        {user?.username ? (
          <Menu.Item position="right">
            <Button
              as="a"
              style={{ marginLeft: "0.5em" }}
              onClick={() => history.push("/user")}
            >
              {user?.username}
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
        ) : props.noLogInButtons ? null : (
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
