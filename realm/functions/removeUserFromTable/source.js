exports = async function (user) {
  console.log("running removeUserFromTable");
  const db = context.services.get("mongodb-atlas").db("cards");
  const tables = db.collection("active-tables");

  const table = await tables.findOneAndUpdate(
    { _id: user.currentTable },
    { $pull: { players: { id: user._id } } },
    { returnNewDocument: true }
  );

  console.log(JSON.stringify(table));

  let newStatus = table.status;

  switch (table.status) {
    case "waiting for start":
      newStatus = "waiting for players";
      break;
    case "in progress":
    case "disconnected player":
      newStatus = closing;
      break;
    case "waiting for players":
    case "closing":
      if (table.players.length === 0) {
        newStatus = "archiving";
      }
      break;
    default:
      throw new Error(
        `removeUserFromTable: tried to remove player from table with unexpected status - ${table.status}`
      );
  }

  await tablesCollection.updateOne(
    { _id: table._id },
    {
      $set: { status: tableStatus },
      $push: {
        tableLogs: `Removed ${user.username}. Table status now: ${tableStatus}`,
      },
      $currentDate: { lastModified: true },
    }
  );

  if (table.players.length === 0) {
    const finishedTable = await tablesCollection.findOneAndDelete({
      _id: table._id,
    });
    //finishedTable.tableLogs.push("table closed");
    await db.collection("archived-tables").insertOne(finishedTable);
  }
  return table;
};
