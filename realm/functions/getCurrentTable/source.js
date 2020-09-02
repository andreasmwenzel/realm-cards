exports = async function () {
  const db = context.services.get("mongodb-atlas").db("cards");
  const users = db.collection("users");
  return await users.findOne({ _id: context.user.id })
  //return context.user;
};
