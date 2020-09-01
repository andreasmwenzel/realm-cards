exports = async function (user, players) {
  console.log(`User: ${user} of type ${typeof user}`);
  console.log(`players ${JSON.stringify(players)}`);
  console.log(`Length: ${players.length}`);
  for (let i = 0; i < players.length; i++) {
    console.log(i);
    const playerStr = players[i].id.toString();
    console.log(`checking ${playerStr} of type ${typeof playerStr}`);
    if (user === playerStr) {
      console.log("true");
      return true;
    }
  }
  return false;
};
