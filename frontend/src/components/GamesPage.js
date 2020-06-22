import React from "react";
import { Segment, Container, Icon, Button, Header } from "semantic-ui-react";
import Navbar from "./Navbar";
import { useRealmApp } from "../realm/RealmApp";

export default function GamesPage() {
  const { user } = useRealmApp();
  async function doClick() {
    console.log("click");
    console.log(user);
  }
  return (
    <Segment
    // inverted
    // textAlign="center"
    // style={{ minHeight: 700, padding: "1em 0em" }}
    // vertical
    >
      <Navbar />
      <div>
        <Button onClick={() => doClick()}>Click Me!</Button>
      </div>
    </Segment>
  );
}
