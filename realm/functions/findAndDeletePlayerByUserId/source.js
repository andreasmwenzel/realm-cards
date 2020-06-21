exports = async function (userId) {
  return await context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("players")
    .findOneAndDelete({ user: BSON.ObjectId(userId) });
};
