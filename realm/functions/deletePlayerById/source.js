exports = async function (playerId) {
  await context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("players")
    .deleteOne({ _id: BSON.ObjectId(playerId) });
};
