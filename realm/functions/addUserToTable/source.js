exports = async function (
  userId,
  playerId,
  tableId,
  position,
  playerCount,
  maxPlayerCount
) {
  console.log("running addUserToTable");
  const playersCollection = context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("players");
  await playersCollection.updateOne(
    { _id: BSON.ObjectId(playerId) },
    {
      $set: { position: position, ready: false },
    }
  );

  const tablesCollection = context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("active-tables");

  if (playerCount === 1) {
    await tablesCollection.updateOne(
      { _id: BSON.ObjectId(tableId) },
      {
        $set: { status: "waiting for players" },
        $addToSet: { playerUserIds: BSON.ObjectId(userId) },
        $push: {
          tableLogs:
            "Added first player to table, set state to waitng for players",
        },
        $currentDate: { lastModified: true },
      }
    );
  } else if (playerCount === maxPlayerCount) {
    await tablesCollection.updateOne(
      { _id: BSON.ObjectId(tableId) },
      {
        $set: { status: "waiting for start" },
        $addToSet: { playerUserIds: BSON.ObjectId(userId) },
        $push: {
          tableLogs:
            "Added final player to table, set state to waiting for start",
        },
        $currentDate: { lastModified: true },
      }
    );
  } else {
    await tablesCollection.updateOne(
      { _id: BSON.ObjectId(tableId) },
      {
        $addToSet: { playerUserIds: BSON.ObjectId(userId) },
        $push: { tableLogs: "Added a player to table" },
        $currentDate: { lastModified: true },
      }
    );
  }
};
