exports = async function (user, table) {
  console.log("running createNewTable");
  const newTable = {
    name: table.name,
    gameType: table.gameType,
    rules: {
      players: table.rules.players,
    },
    createdBy: BSON.ObjectId(user.id),
    status: "created",
    players: [],
    tableLogs: ["Created Table"],
    lastModified: new Date(),
  };
  const response = await context.services
    .get("mongodb-atlas")
    .db("cards")
    .collection("active-tables")
    .insertOne(newTable);
  return { tableId: response.insertedId.asString() };
};
