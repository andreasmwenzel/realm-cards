//TODO: Replace these definitions with something less hard-coded
const GameTypes = ["Hearts"];
const playerCounts = {
  Hearts: [4],
};
// This function is the webhook's request handler.
exports = async function (payload, response) {
  // //Verify integrity of payload
  //     //payload.body includes a table with properties: name as string, gameType as string in
  //     //GameTypes, rules as object with players as number
  const body = EJSON.parse(payload.body.text());
  if (!body.table) {
    throw new Error("Missing table in body");
  }
  if (!typeof body.table.name === "string") {
    throw new Error("Missing string body.table.name");
  }
  if (!GameTypes.includes(body.table.gameType)) {
    throw new Error("body.gameType not formatted correctly");
  }
  if (
    !(
      body.table.rules &&
      playerCounts[body.table.gameType].includes(body.table.rules.players)
    )
  ) {
    throw new Error(
      "body.rules.players not an allowed value for specified gameType"
    );
  }
  if (await context.functions.execute("isInGame", context.user.id)) {
    throw new Error("user is already in a game");
  }
  response.setHeader("Content-Type", "application/json");
  response.setBody(
    JSON.stringify(
      await context.functions.execute(
        "createNewTable",
        context.user.id,
        body.table
      )
    )
  );
};
