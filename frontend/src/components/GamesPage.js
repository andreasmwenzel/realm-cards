import React from "react";
import {
  Segment,
  Container,
  Icon,
  Button,
  Header,
  Loader,
} from "semantic-ui-react";
import Navbar from "./Navbar";
import { useRealmApp } from "../realm/RealmApp";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TABLES } from "../realm/graphql-operations";

export default function GamesPage() {
  const { user } = useRealmApp();
  const { loading, error, data, refetch } = useQuery(GET_TABLES);

  if (loading) return <Loader active inline="centered" />;
  if (error) return `Error! ${error.message}`;

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
      <Container>
        <Button onClick={() => doClick()}>Click Me!</Button>
        <p>{JSON.stringify(data)}</p>
      </Container>
    </Segment>
  );
}
