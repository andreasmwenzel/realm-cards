exports = async function (id) {
  console.log("running findTableById");
  const tables = context.services
    .get("mongodb-atlas")
    .db("cards")
    .collection("active-tables");
  return await tables.findOne({ _id: BSON.ObjectId(id) });
};
