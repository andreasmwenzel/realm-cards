import React, { Component } from "react";

import { Grid, Button, Icon } from "semantic-ui-react";

const handleJoin = (tableID) => {
  console.log(`Joining Game with id: ${tableID}`);
};

export default class TableDisplay extends Component {
  state;

  render() {
    const table = this.props.table;
    console.log(this.props.table);
    return (
      <Grid.Row divided color="grey">
        <Grid.Column width={12}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Grid.Row>
                  <h4>{table.name}</h4>
                </Grid.Row>
                <Grid.Row>
                  <strong>Host:</strong> {table.createdBy.username}
                </Grid.Row>
                <Grid.Row>
                  Players:{" "}
                  {table.players.map((p) => {
                    return <span key={p.username}>{p.username} , </span>;
                  })}
                </Grid.Row>
                <Grid.Row>
                  <strong>Seats:</strong> {table.players.length} /{" "}
                  {table.maxPlayers}
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={8}>
                <Grid.Row>
                  <strong>Game:</strong> {table.gameType}
                </Grid.Row>
                <Grid.Row>
                  <strong>Rules:</strong>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={3} verticalAlign="middle">
          {table.password ? <Icon name="lock" color="red" /> : null}
          <Button>Join</Button>
          {/* {table.hasPassord ? <Icon name="lock" /> : null} */}
        </Grid.Column>
      </Grid.Row>
    );
  }
}
