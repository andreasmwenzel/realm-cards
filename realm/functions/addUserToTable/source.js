//This function should only ever be called from the requestTableSeat webhook in cards service,
//which the table exists, has an open seat at the positon and the user is not in another game
exports = function(tableId, user, position){
  const cluster = context.services.get("mongodb-atlas");
  var tables = cluster.db("cards").collection("active-tables");
  const updatedTable = tables.findOneAndUpdate(
    { _id: BSON.ObjectId(tableId) },
    {
      $addToSet: { players: BSON.ObjectId(userId) },
      $set: { [`positions.${position}`]: { player: username } },
    }
  );
  if (updatedTable.value.rules.players === updatedTable.value.players.length) {
    //no longer joinable
    this.tables.updateOne(
      { _id: table._id },
      {
        $set: { status: "waiting for start" },
      }
    );
  }
  return; 
};