import React from "react";
import { Segment, Container, Icon, Button, Header } from "semantic-ui-react";
import Navbar from "./Navbar";
import { useRealmApp } from "../realm/RealmApp";

import { useHistory } from "react-router-dom";
import CurrentTables from "./CurrentTables";

export default function GamesPage() {
  const { user } = useRealmApp();
  let history = useHistory();
  console.log("from game's page: ", user.customData);

  const handleLeave = async () => {
    await user.functions.leaveTable();
    await user.refreshCustomData();
    history.push("/games");
  }

  return (
    <Segment>
      <Navbar />
      {user.customData?.currentTable ? (
        <Container>
          <div>Hello Current Game
            <button onClick={() => handleLeave()}>Leave</button> </div>
        </Container>
      ) : (
          <Container>
            <CurrentTables />
          </Container>
        )}
    </Segment>
  );
}
