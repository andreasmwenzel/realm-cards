import React, { Component } from "react";
import { useRealmApp } from "../realm/RealmApp";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TABLES } from "../realm/graphql-operations";
import {
  Loader,
  Table,
  Segment,
  Button,
  Popup,
  Label,
} from "semantic-ui-react";

import HeartsTableRow from "./HeartsTableRow";

export default function CurrentTable() {
  const { user } = useRealmApp();
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_TABLES);

  if (error) return `Error! ${error.message}`;
  if (data) console.log();

  const handleRefetch = async () => {
    console.log("refetching data");
    refetch();
    console.log(`Network Status: ${networkStatus}`);
  };
  const handleNewTable = async () => {
    console.log("requested new table");
  };

  function renderTableType(table) {
    switch (table.gameType) {
      case "HEARTS":
        return <HeartsTableRow key={table._id} table={table} />;
      default:
        return (
          <Table.Row key={table._id}>
            <Table.Cell>A table of unknown type</Table.Cell>
          </Table.Row>
        );
    }
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            colSpan="3"
            textAlign="center"
            verticalAlign="middle"
          >
            <Button
              floated="left"
              disabled={!user.profile?.email}
              onClick={() => handleNewTable()}
            >
              Start A Table
            </Button>
            Current Tables
            <Button floated="right" onClick={() => handleRefetch()}>
              Refresh List
            </Button>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Header</Table.HeaderCell>
          <Table.HeaderCell>Header</Table.HeaderCell>
          <Table.HeaderCell>Header</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {networkStatus !== 7 ? (
          <Table.Row>
            <Table.Cell colSpan="3">
              <Segment>
                <Loader active />
              </Segment>
            </Table.Cell>
          </Table.Row>
        ) : null}
        {error ? (
          <Table.Row>
            <Table.Cell colSpan="3">
              There was an issue fetching the tables
            </Table.Cell>
          </Table.Row>
        ) : null}
        {data ? (
          data.activeTables?.length ? (
            data.activeTables.map((table) => renderTableType(table))
          ) : (
            <Table.Row>
              <Table.Cell>There are no active Tables</Table.Cell>
            </Table.Row>
          )
        ) : null}
      </Table.Body>
    </Table>
  );
}
