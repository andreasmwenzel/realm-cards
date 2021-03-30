exports = async function () {
  const db = context.services.get("mongodb-atlas").db("cards");
  const users = db.collection("users");
  console.log(context.user.id)
  return await users.findOne({ _id: BSON.ObjectId(context.user.id) })
  //return context.user;
};
