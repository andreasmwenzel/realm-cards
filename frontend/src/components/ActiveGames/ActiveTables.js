import React, { Component } from "react";
import { useRealmApp } from "../../realm/RealmApp";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TABLES } from "../../realm/graphql-operations";
import {
  Dimmer,
  Loader,
  Table,
  Segment,
  Button,
} from "semantic-ui-react";

import HeartsTableRow from "./HeartsTableRow";
import StartNewTable from "./StartNewTable"
import { NetworkStatus } from "apollo-boost";

export default function ActiveTables() {
  const { user } = useRealmApp();
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_TABLES, { notifyOnNetworkStatusChange: true });

  console.log(`Network Status: ${networkStatus}`);
  if (error) return `Error! ${error.message}`;
  if (data) console.log();

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
    <Dimmer.Dimmable>
      <Dimmer active={networkStatus != NetworkStatus.ready && networkStatus != NetworkStatus.error}>
        <Loader />
      </Dimmer>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan="4"
              textAlign="center"
              verticalAlign="middle"
            >
              <StartNewTable />
            Current Tables
            <Button floated="right" onClick={() => refetch()}>
                Refresh List
            </Button>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Table name</Table.HeaderCell>
            <Table.HeaderCell>Game</Table.HeaderCell>
            <Table.HeaderCell>Rules</Table.HeaderCell>
            <Table.HeaderCell>Players</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {networkStatus == NetworkStatus.error ? (
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
    </Dimmer.Dimmable>
  );
}
