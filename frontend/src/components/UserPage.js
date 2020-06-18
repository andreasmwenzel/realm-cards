import React from "react";
import { Segment, Container, Icon, Button, Header } from "semantic-ui-react";
import Navbar from "./Navbar";

export default function UserPage() {
  return (
    <Segment
    // inverted
    // textAlign="center"
    // style={{ minHeight: 700, padding: "1em 0em" }}
    // vertical
    >
      <Navbar />
      <div>User's Page</div>
    </Segment>
  );
}
