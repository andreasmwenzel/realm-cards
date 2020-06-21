exports = async function deleteUserDocument({ user }) {
  const usersCollections = context.services
    .get("mongodb-atlas")
    .collection("users");
  return await users.deleteOne({ _id: BSON.ObjectId(user.id) });
};
