exports = async function (payload, response) {
  const body = EJSON.parse(payload.body.text());

  const userId = BSON.ObjectId(body.user); //throws error if body.user is not in right form

  const user = await context.functions.execute("removeTableFromUser", userId); //returns user before removing table
  const table = user.currentTable
    ? await context.function.execute("removeUserFromTable", user)
    : null;

  response.setHeader("Content-Type", "application/json");
  response.setBody(
    JSON.stringify({
      user: user._id,
      table: table._id,
    })
  );
};
