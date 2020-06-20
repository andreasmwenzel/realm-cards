//TODO: Replace these definitions with an uploaded document
const GameTypes = ["Hearts"]
const playerCounts = {
  "Hearts":[3,4]
}
// This function is the webhook's request handler.
exports = function(payload, response) {
  response.setHeader(
    "Content-Type",
    "application/json"
  );
    
  //Verify integrity of payload
      //payload.body includes a table with properties: name as string, gameType as string in GameTypes, rules as object with players as number
  let formatError = true;
  const body = EJSON.parse(payload.body.text());
  if(body.table && typeof(body.table.name) === "string"){
    //console.log("body.table.name is a string -- check");
    if(GameTypes.includes(body.table.gameType)){
      //console.log("body.table.gameType is in GameTypes -- check")
        if(body.table.rules && playerCounts[body.table.gameType].includes(body.table.rules.players)){
          //console.log("body.table.rules.players has proper number of players")
          formatError = false;
      }
    }
  } 
  if(formatError){
    response.setBody(JSON.stringify({error:"proplem with table format"}))
    return;
  } 
  //TODO: Make sure user is not in a game
  let positions = []
  for(let i=0; i<body.table.rules.players; i++){
    positions.push({})
  }
  //Everything that we need is here: send request to createNewTable
  
  newTable = {
    name : body.table.name,
    gameType : body.table.gameType,
    rules:{
      players : body.table.rules.players
    },
    positions:positions,
    players: [],
    createdBy: BSON.ObjectId(context.user.id)
  }
  //console.log(newTable)
  console.log(context.functions.execute("createNewTable", newTable));
  response.setStatusCode(200);
  response.setBody("")
};