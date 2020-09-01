exports = async function (id) {
  const collection = context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("players");
  const doc = await collection.findOne({ user: BSON.ObjectId(id) });
  return doc;
};
