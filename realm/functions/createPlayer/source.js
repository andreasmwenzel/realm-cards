exports = async function (tableId, userId) {
  const playersCollection = context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("players");
  return await playersCollection.insertOne({
    table: BSON.ObjectId(tableId),
    user: BSON.ObjectId(userId),
  });
};
