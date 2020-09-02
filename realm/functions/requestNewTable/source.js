//TODO: Replace these definitions with something less hard-coded
const GameTypes = ["Hearts"];
const playerCounts = {
  Hearts: [4],
};
// This function is the webhook's request handler.
exports = async function (table) {
  // //Verify integrity of payload
  //     //payload.body includes a table with properties: name as string, gameType as string in
  //     //GameTypes, rules as object with players as number

  if (!typeof table.name === "string") {
    throw new Error("name must be a string");
  }
  if (!GameTypes.includes(table.gameType)) {
    throw new Error("gameType not formatted correctly");
  }
  if (
    !(
      table.rules &&
      playerCounts[table.gameType].includes(table.rules.players)
    )
  ) {
    throw new Error(
      "rules.players not an allowed value for specified gameType"
    );
  }
  if (context.user.currentTable) {
    throw new Error("user is already in a game");
  }
  return await context.functions.execute("createNewTable", context.user.id, table)

};
