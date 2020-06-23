exports = async function (payload, response) {
  const body = EJSON.parse(payload.body.text());

  const userId = BSON.ObjectId(body.user); //throws error if body.user is not in right form

  const user = await context.functions.execute("removeTableFromUser", userId); //returns user before removing table
  const resp = { user: user._id };
  const table = user.currentTable
    ? await context.functions.execute("removeUserFromTable", user)
    : null;
  if (table) {
    resp.table = table._id;
  }
  response.setHeader("Content-Type", "application/json");
  response.setBody(JSON.stringify(resp));
};
