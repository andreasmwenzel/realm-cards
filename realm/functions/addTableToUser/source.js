exports = async function (user, table) {
  console.log("running addUserToTable");

  const db = context.services.get("mongodb-atlas").db("cards");
  const users = db.collection("users");
  return await users.findOneAndUpdate(
    { _id: user._id },
    { $set: { currentTable: table._id } },
    {
      projections: { _id: 1, currentTable: 1 },
      returnNewDocument: true,
    }
  );
};
