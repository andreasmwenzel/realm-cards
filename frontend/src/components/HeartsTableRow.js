import React from "react";
import { Table, Button } from "semantic-ui-react";
import { useRealmApp } from "../realm/RealmApp";
import { useHistory } from "react-router-dom";
import { useSubscription } from "@apollo/react-hooks";
const DEBUG = true;

export default function TableDisplay({ table }) {
  const { user } = useRealmApp();
  let history = useHistory();

  const playersLengthArray = Array(table.rules.players)
    .fill(null)
    .map((_, i) => i);

  const playerInPos = (pos) => {
    for (const player of table.players) {
      if (player.position === pos) {
        return player.username;
      }
    }
  };

  const handleJoinGame = async (pos) => {
    try {
      console.log(
        `joinging table ${table._id} at position ${pos} user ${user?.profile?.email}`
      );
      const res = await user.functions.joinTable(table._id, pos)
      history.push("/games");
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <Table.Row>
      <Table.Cell>{table.name}</Table.Cell>
      <Table.Cell>Players: {table.rules.players}</Table.Cell>
      <Table.Cell>
        {playersLengthArray.map((pos) => (
          <div key={pos}>
            {playerInPos(pos) ? (
              <span>user: {playerInPos(pos)}</span>
            ) : (
                <Button
                  disabled={!user?.profile?.email}
                  size="mini"
                  onClick={() => handleJoinGame(pos)}
                >
                  join
                </Button>
              )}
          </div>
        ))}
      </Table.Cell>
      <Table.Cell>{}</Table.Cell>
    </Table.Row>
  );
}
