import axios from "axios";

import BSON from "bson";

export default function (app, user) {
  user.fetchUserData = async () => {
    //custom data not implemented ... do it ourselves
    try {
      const customData = await app.services
        .mongodb("mongodb-atlas")
        .db("cards")
        .collection("users")
        .findOne({
          _id: BSON.ObjectId.createFromHexString(app.currentUser.id),
        });
      if (
        user?.username != customData.username ||
        user?.currentTable != customData.currentTable
      ) {
        app.currentUser.currentTable = customData.currentTable;
        app.currentUser.username = customData.username;
      }
    } catch (e) {
      console.log(`Error :${e}`);
    }

    return app.currentUser;
  };

  user.joinTablec = async (table, pos) => {
    try {
      console.log(
        `joinging table ${table._id} at position ${pos} user ${app.user._id}`
      );
      const res = await axios.post(
        `${baseURL}/joinTable`,
        {
          user: app.user._id,
          table: table._id,
          position: pos,
        },
        {
          headers: { Authorization: app.user.profile.identities[0].id },
        }
      );
      console.log(res);
      await app.fetchUserData();
      history.push("/games");
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
}
