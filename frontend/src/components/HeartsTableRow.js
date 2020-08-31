import React from "react";
import { Table, Button } from "semantic-ui-react";
import { useRealmApp } from "../realm/RealmApp";
import axios from "axios";
import { useHistory } from "react-router-dom";
const DEBUG = true;

export default function TableDisplay({ table }) {
  const app = useRealmApp();
  const baseURL = `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/${app.id}/service/cards/incoming_webhook`;
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
        `joinging table ${table._id} at position ${pos} user ${app.user._id}`
      );
      const res = await axios.post(
        `${baseURL}/joinTable`,
        {
          user: app.user._id,
          table: table._id,
          position: pos,
        },
        {
          headers: { Authorization: app.user.profile.identities[0].id },
        }
      );
      console.log(res);
      await app.fetchUserData();
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
                disabled={!app.user?.profile?.email}
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
