exports = async function (user, players) {
  console.log(`User: ${user} of type ${typeof user}`);
  console.log(`players ${JSON.stringify(players)}`);
  for (let i in players) {
    const playerStr = players[i].id.toString();
    console.log(`checking ${playerStr} of type ${typeof playerStr}`);
    if (user === playerStr) {
      console.log("true");
      return true;
    }
  }
  return false;
};
