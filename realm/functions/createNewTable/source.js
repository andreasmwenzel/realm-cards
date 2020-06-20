//This function should only ever be called from the requestNewTable webhook in cards service, which verifies integrity of table
exports = function(table){
  const cluster = context.services.get("mongodb-atlas");
  var tables = cluster.db("cards").collection("active-tables");
  tables.insertOne(table);
  return; 
};