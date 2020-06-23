exports = async function (user, players) {
  for (let i in players) {
    if (BSON.ObjectId(user) === players[i].id) {
      return true;
    }
  }
  return false;
};
