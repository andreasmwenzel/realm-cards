exports = async function (table, user, position) {
  console.log("running addUserToTable");

  const db = context.services.get("mongodb-atlas").db("cards");
  const tables = db.collection("active-tables");

  const player = {
    id: user._id,
    username: user.username,
    position: NumberInt(position),
    ready: false,
  };

  let newStatus = table.status;

  switch (table.status) {
    case "created":
      newStatus = "waiting for players";
      break;
    case "waiting for players":
      if (table.players.length === table.rules.players - 1) {
        newStatus = "waiting for start";
      }
      break;
    default:
      throw new Error(
        `addUserToTable: tried to add player to table with unexpected status - ${table.status}`
      );
  }

  return await tables.findOneAndUpdate(
    { _id: table._id },
    {
      $push: {
        players: {
          $each: [player],
          $sort: { position: 1 },
        },
        tableLogs: `Added ${user.username} to table. Status is now ${newStatus}`,
      },
      $set: { status: newStatus },
      $currentDate: { lastModified: true },
    },
    {
      projection: { _id: 1, players: 1, status: 1 },
      returnNewDocument: true,
    }
  );
};
