exports = async function (user, table) {
  const newTable = {
    name: table.name,
    gameType: table.gameType,
    rules: {
      players: table.rules.players,
    },
    createdBy: user._id,
    status: "created",
    playerUserIds: [],
    tableLogs: ["Created Table"],
    lastModified: new Date(),
  };
  const response = await context.services
    .get("mongodb-atlas")
    .db("cards")
    .collection("active-tables")
    .insertOne(newTable);
  return { tableId: response.insertedId };
};
