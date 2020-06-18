import React, { Component } from "react";
import { useRealmApp } from "../realm/RealmApp";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TABLES } from "../realm/graphql-operations";
import {
  Loader,
  Container,
  Grid,
  Button,
  Icon,
  GridColumn,
} from "semantic-ui-react";

import TableDisplay from "./TableDisplay";

export default function CurrentTable() {
  const { user } = useRealmApp();
  const { loading, error, data, refetch } = useQuery(GET_TABLES);

  if (loading) return <Loader active inline="centered" />;
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <Grid divided="vertically" padded>
        <Grid.Row color="black" verticalAlign="middle">
          <Grid.Column width={6} textAlign="right">
            <Button size="small">Add New Table</Button>
          </Grid.Column>
          <Grid.Column width={4} textAlign="center">
            <h3 style={{ display: "inline" }}> Current Tables </h3>
          </Grid.Column>
          <Grid.Column width={6} textAlign="left">
            <Button
              size="small"
              onClick={() => {
                console.log("refetch");
                refetch();
              }}
            >
              Refresh List
            </Button>
          </Grid.Column>
        </Grid.Row>
        {data.activeTables.map((table) => (
          <TableDisplay key={table._id} table={table} />
          // <Grid.Row key={table._id} color="grey">
          //   <TableDisplay table={table} />
          // </Grid.Row>
        ))}
        <Grid.Row color="teal" key="no more">
          {" "}
          No Additional Tables
        </Grid.Row>
      </Grid>
    </Container>
  );
}
