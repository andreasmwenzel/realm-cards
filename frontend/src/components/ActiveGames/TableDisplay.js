import React from "react";
import { Table } from "semantic-ui-react";

export default function TableDisplay(props) {
  return (
    <Table.Row>
      <Table.Cell>{props.table.name}</Table.Cell>
      <Table.Cell>
        {Object.entries(props.table.rules).map((entry) => (
          <div key={entry[0]}>{entry[1]}</div>
        ))}
      </Table.Cell>
      <Table.Cell>{JSON.stringify(props.table.players)}</Table.Cell>
      <Table.Cell>{}</Table.Cell>
    </Table.Row>
  );
}
