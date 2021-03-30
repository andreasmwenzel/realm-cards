import React from 'react'
import { useRealmApp } from "../../realm/RealmApp";
import { useHistory } from "react-router-dom";

export default function CurrentTable() {
  const { user } = useRealmApp();
  let history = useHistory();

  const handleLeave = async () => {
    await user?.functions.leaveTable();
    await user?.refreshCustomData();
    history.push("/games");
  }

  return (
    <div>Hello Current Game
      <button onClick={() => handleLeave()}>Leave</button>
    </div>
  )
}
