exports = async function (id) {
  console.log("running findPlayersAtTable");
  const playersCollection = context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("players");

  const players = await playersCollection
    .find({ table: BSON.ObjectId(id) })
    .toArray();
  return players;
};
