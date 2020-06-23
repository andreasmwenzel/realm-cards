exports = async function (payload, response) {
  const body = EJSON.parse(payload.body.text());

  const db = context.services.get("mongodb-atlas").db("cards");
  const users = db.collection("users");
  const tables = db.collection("active-tables");

  const tableId = BSON.ObjectId(body.table); //throws error of body.table is not in the right form
  const userId = BSON.ObjectId(body.user); //throws error if body.user is not in right form
  const position = body.position;
  //check that position is a number
  if (!typeof position === "number") {
    throw new Error("Missing table (string) or position (number) in body");
  }

  const [user, table] = await Promise.all(
    users.findOne({ id: userId }, { username: 1, currentTable: 1 }),
    tables.findOne({ id: tableId }, { rules: 1, players: 1, status: 1 })
  );

  console.log(JSON.stringify(user));
  console.log(JSON.stringify(table));

  //check if user is in a game
  if (user.table) {
    throw new Error("Unable to join table : user is already in a game");
  }

  //check if table exists and is it in the right state and position is in range of accepted players
  if (!table) {
    throw new Error("Unable to join table : table does not exists");
  }

  //make sure table is accepting players
  if (!(table.status === "created" || table.status === "waiting for players")) {
    throw new Error(
      `Unable to join table : Table found in unjoinable state ${foundTable.status}`
    );
  }

  //make sure position is valid
  const maxPlayers = table.rules.players;
  if (position < 0 || position + 1 > maxPlayers) {
    throw new Error(
      "Unable to join table: specified position is out of range for the table"
    );
  }

  let takenSeats = [];
  for (let i in table.players) {
    //can't use for.. of in realms
    if (typeof table.players[i].position === "number") {
      //players in queue don't have position / account for 0
      takenSeats.push(playersAtTable[i].position);
    }
  }

  console.log(JSON.stringify(takenSeats));

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

  await context.functions.execute("addUserToTable", table, user, position);

  response.setHeader("Content-Type", "application/json");
  response.setBody(
    JSON.stringify({
      user: userId,
      table: tableId,
      position: position,
    })
  );
};
