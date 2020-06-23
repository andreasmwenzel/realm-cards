exports = async function (user, players) {
  console.log(`User: ${user} of type ${typeof user}`);
  console.log(`players ${JSON.stringify(players)}`);
  for (let i in players) {
    console.log(`checking ${players[i].id} of type ${typeof players[i].id}`);
    if (user === players[i].id) {
      console.log("true");
      return true;
    }
  }
  return false;
};
