exports = async function (user) {
  console.log("running removeTableFromUser");
  const db = context.services.get("mongodb-atlas").db("cards");
  const users = db.collection("users");

  return await users.findOneAndUpdate(
    { _id: user._id },
    { $unset: { currentTable: "" } },
    {
      projection: { _id: 1, currentTable: 1, username: 1 },
    }
  );
};
