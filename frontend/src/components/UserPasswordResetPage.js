import React from "react";
import { useRealmApp } from "../realm/RealmApp";
import { useHistory } from "react-router-dom";

export default function UserConfirm({ token, tokenId }) {
  // console.log(token);
  // console.log(tokenId);
  // let history = useHistory();

  // const { sendResetPasswordEmail, resetPassword } = useRealmApp();
  // const [mode, setMode] = React.useState(token && tokenId);
  // const [message, setMessage] = React.useState("");

  // React.useEffect(() => {
  //   setMessage("");
  // }, [mode]);

  // const handleRequestPasswordReset = async (email) => {
  //   await sendResetPasswordEmail(email);
  // };

  // const handleResetPassword = async (token, tokenId, password) => {
  //   try {
  //     await resetPassword(token, tokenId, password);
  //     return history.push("/");
  //   } catch (err) {
  //     console.log(err);
  //     setMessage("Invalid token information");
  //   }
  // };

  // if (mode) {
  //   setMode(false);
  //   handleConfirmation(token, tokenId);
  // }

  return <div></div>;
}
