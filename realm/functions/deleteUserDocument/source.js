exports = async function deleteUserDocument({ user }) {
  console.log(user);
  const cluster = context.services.get("mongodb-atlas");
  const users = cluster.db("cards").collection("users");
  return await users.deleteOne({_id: BSON.ObjectId(user.id)});
};