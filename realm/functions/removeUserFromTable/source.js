exports = async function (userId, tableId) {
  const db = context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"));
  const tablesCollection = db.collection("active-tables");
  const playersCollection = db.collection("players");
  let [table, players] = await Promise.all([
    tablesCollection.findOne({ _id: BSON.ObjectId(tableId) }),
    playersCollection.find({ table: BSON.ObjectId(tableId) }).toArray(),
  ]);

  let tableStatus = table.status;
  if (players.length === 0) {
    tableStatus = "archiving";
  } else {
    switch (table.status) {
      case "waiting for start":
        tableStatus = "waiting for players";
        break;
      case "in progress":
      case "disconnected player":
        tableStatus = "closing";
        break;
    }
  }

  await tablesCollection.updateOne(
    {
      _id: BSON.ObjectId(tableId),
    },
    {
      $set: { status: tableStatus },
      $pull: { playerUserIds: BSON.ObjectId(userId) },
      $push: { tableLogs: `Removed player. Table status now: ${tableStatus}` },
      $currentDate: { lastModified: true },
    }
  );
  if (players.length === 0) {
    const finishedTable = await tablesCollection.findOneAndDelete({
      _id: BSON.ObjectId(tableId),
    });
    console.log(JSON.stringify(finishedTable));
    //finishedTable.tableLogs.push("table closed");
    await db.collection("archived-tables").insertOne(finishedTable);
  }

  return;
};
