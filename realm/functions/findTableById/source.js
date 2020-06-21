exports = async function (id) {
  console.log("running findTableById");
  const tables = context.services
    .get("mongodb-atlas")
    .db(context.values.get("db-name"))
    .collection("active-tables");
  return await tables.findOne({ _id: BSON.ObjectId(id) });
};
