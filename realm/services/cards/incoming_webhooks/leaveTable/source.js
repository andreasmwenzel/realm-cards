exports = async function (payload, response) {
  const body = EJSON.parse(payload.body.text());
  userId = body.user; //This is guaranteed to be right from pre-function checks

  const player = await context.functions.execute(
    "findAndDeletePlayerByUserId",
    userId
  );
  console.log(JSON.stringify(player));

  playerId = player._id.toString();
  tableId = player.table.toString();

  const table = await context.functions.execute(
    "removeUserFromTable",
    userId,
    playerId,
    tableId
  );

  response.setHeader("Content-Type", "application/json");
  response.setBody(
    JSON.stringify({
      user: userId,
      player: playerId,
      table: tableId,
    })
  );
};
