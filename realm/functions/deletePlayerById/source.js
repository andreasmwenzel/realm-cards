exports = async function (playerId) {
  await context.services
    .get("mongodb-atlas")
    .db("cards")
    .collection("players")
    .deleteOne({ _id: BSON.ObjectId(playerId) });
};
