exports = async function (userId) {
  const db = context.services.get("mongodb-atlas").db("cards");
  const users = db.collection("users");

  return await users.findOneAndUpdate(
    { _id: userId },
    { $unset: currentTable },
    {
      projection: { _id: 1, currentTable: 1, username: 1 },
    }
  );
};
