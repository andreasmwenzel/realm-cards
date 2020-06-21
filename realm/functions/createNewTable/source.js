exports = async function (userId, table) {
  const newTable = {
    name: table.name,
    gameType: table.gameType,
    rules: {
      players: table.rules.players,
    },
    createdBy: BSON.ObjectId(userId),
    status: "created",
    playerUserIds: [],
    tableLogs: ["Created Table"],
    lastModified: new Date(),
  };
  const response = await context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("active-tables")
    .insertOne(newTable);
  return { tableId: response.insertedId };
};
