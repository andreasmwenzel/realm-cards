exports = async function (user, players) {
  console.log(`User: ${user}`);
  console.log(`players ${JSON.stringify(players)}`);
  for (let i in players) {
    if (BSON.ObjectId(user) === players[i].id) {
      return true;
    }
  }
  return false;
};
