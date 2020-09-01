import React from "react";
import { Segment, Container, Icon, Button, Header } from "semantic-ui-react";
import Navbar from "./Navbar";
import { useRealmApp } from "../realm/RealmApp";
import CurrentTables from "./CurrentTables";

export default function GamesPage() {
  const { user } = useRealmApp();

  return (
    <Segment>
      <Navbar />
      {user.currentTable ? (
        <Container>
          <div>Hello Current Game </div>
        </Container>
      ) : (
          <Container>
            <CurrentTables />
          </Container>
        )}
    </Segment>
  );
}
