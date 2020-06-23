exports = async function (user, players) {
  console.log(`User: ${user}`);
  console.log(`players ${JSON.stringify(players)}`);
  for (let i in players) {
    console.log(`${player[i].id}`);
    if (user === players[i].id) {
      console.log("true");
      return true;
    }
  }
  return false;
};
