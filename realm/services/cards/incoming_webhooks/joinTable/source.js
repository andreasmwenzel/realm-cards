exports = async function (payload, response) {
  const body = EJSON.parse(payload.body.text());
  userId = body.user; //This is guaranteed to be right from pre-function checks

  //check that body has a table id and a user id
  if (!(body.table && typeof body.position === "number")) {
    throw new Error("Missing table (string) or position (number) in body");
  }

  const tableId = body.table;

  //check if table exists and is it in the right state and position is in range of accepted players
  const foundTable = await context.functions.execute("findTableById", tableId);
  if (!foundTable) {
    throw new Error("Table does not exists");
  }
  const maxPlayers = foundTable.rules.players;

  if (
    !(
      foundTable.status === "created" ||
      foundTable.status === "waiting for players"
    )
  ) {
    throw new Error(`Table found in unjoinable state: ${foundTable.status}`);
  }

  if (body.position < 0 || body.position + 1 > maxPlayers) {
    throw new Error("Specified Position is out of range for the table");
  }
  let position = body.position;

  //check if user is in a game
  if (await context.functions.execute("userInGame", userId)) {
    throw new Error("user is already in a game");
  }

  //create a player item to "queue" on table"
  const player = await context.functions.execute(
    "createPlayer",
    tableId,
    userId
  );

  const playerId = player.insertedId.toString();
  try {
    //grab all the players in the "queue" and check that the table is not full
    const playersAtTable = await context.functions.execute(
      "findPlayersAtTable",
      tableId
    );
    const playerCount = playersAtTable.length;
    if (playerCount > maxPlayers) {
      await context.functions.execute("deletePlayerById", playerId);
      throw new Error("The table was full");
    }
    console.log(JSON.stringify(playersAtTable));
    //record all the taken seats
    let takenSeats = [];
    for (let i in playersAtTable) {
      //can't use for.. of in realms
      if (typeof playersAtTable[i].position === "number") {
        //players in queue don't have position / account for 0
        takenSeats.push(playersAtTable[i].position);
      }
    }
    console.log(JSON.stringify(takenSeats));
    //Place the player in an open seat
    if (takenSeats.includes(position)) {
      console.log(`Preferred seat was taken`);
      for (let i = 0; i < maxPlayers; i++) {
        if (!takenSeats.includes(i)) {
          position = i;
          break;
        }
      }
      if (position === body.position) {
        //if all the avaialbe positions were taken, we messed up somewhere
        throw new Error("Table claimed to be open, but no open seats found");
      }
      //our prefered seat was taken
    }
    await context.functions.execute(
      "addUserToTable",
      userId,
      playerId,
      tableId,
      position,
      playerCount,
      maxPlayers
    );
  } catch (err) {
    await context.functions.execute(
      "deletePlayerById",
      player.insertedId.toString()
    );
    throw err;
  }

  response.setHeader("Content-Type", "application/json");
  response.setBody(
    JSON.stringify({
      user: userId,
      player: playerId,
      table: tableId,
      position: position,
    })
  );
};
