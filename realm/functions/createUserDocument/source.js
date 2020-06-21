exports = async function createNewUserDocument({ user }) {
  const cluster = context.services.get("mongodb-atlas");
  const users = cluster.db(context.values.get("db-name")).collection("users");
  const email = user.data.email;
  const n = email.indexOf("@");
  let username;
  n === -1 ? (username = email) : (username = email.substring(0, n));

  console.log(
    await users.insertOne({
      _id: BSON.ObjectId(user.id),
      email: email,
      username: username,
    })
  );
};
