exports = async function () {
  const userId = BSON.ObjectId(context.user.id); //throws error if body.user is not in right form
  const user = await context.functions.execute("removeTableFromUser", userId); //returns user before removing table

  let resp = {};
  if (user.currentTable) {
    resp.message = `Table ${user.currentTable} removed from user ${user._id}`;
    try {
      await context.functions.execute("removeUserFromTable", user);
      resp.message = resp.message + ` AND user removed from table`;
    } catch (err) {
      resp.error = err;
    }
  } else {
    resp.message = "user was not at a table";
  }
  return resp;
};
