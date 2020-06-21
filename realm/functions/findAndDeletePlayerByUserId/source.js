exports = async function (userId) {
  return await context.services
    .get("mongodb-atlas")
    .db("cards")
    .collection("players")
    .findOneAndDelete({ user: BSON.ObjectId(userId) });
};
