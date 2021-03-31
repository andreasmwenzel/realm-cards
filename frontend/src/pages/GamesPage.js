import React from "react";
import { Segment, Container, Icon, Button, Header } from "semantic-ui-react";
import Navbar from "../components/common/Navbar";
import { useRealmApp } from "../realm/RealmApp";
import ActiveTables from "../components/ActiveGames";
import CurrentTable from "../components/CurretntTable/CurrentTable";

export default function GamesPage() {
  const { user } = useRealmApp();

  return (
    <Segment>
      <Navbar />
      {user.customData?.currentTable ? (
        <Container>
          <CurrentTable />
        </Container>
      ) : (
          <Container>
            <ActiveTables />
          </Container>
        )}
    </Segment>
  );
}
