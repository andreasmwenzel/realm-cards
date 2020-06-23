exports = async function (table, user, position) {
  console.log("running addUserToTable");

  const db = context.services.get("mongodb-atlas").db("cards");
  const tables = db.collection("active-tables");

  const player = {
    id: user._id,
    username: user.username,
    position: position,
    ready: false,
  };

  let newStatus = table.status;
  switch (table.status) {
    case "created":
      newStatus = "waiting for players";
      break;
    case "waiting players":
      if (table.players.length === table.rules.players) {
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
      $addToSet: { players: player },
      $set: { status: newStatus },
      $currentDate: { lastModified: true },
      $push: {
        tableLogs: `Added ${user.username} to table. Status is now ${newStatus}`,
      },
    },
    {
      projections: { _id: 1 },
      returnNewDocument: true,
    }
  );
};
