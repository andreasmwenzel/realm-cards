import React from "react";
import { useRealmApp } from "../realm/RealmApp";
import { useHistory } from "react-router-dom";
import parseAuthenticationError from "../realm/parseAuthenticationError";

export default function UserConfirm({ token, tokenId }) {
  console.log(token);
  console.log(tokenId);
  let history = useHistory();

  const { confirmUser } = useRealmApp();
  const [mode, setMode] = React.useState(token && tokenId);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setMessage("");
  }, [mode]);

  const handleConfirmation = async (token, tokenId) => {
    try {
      console.log("Sending Confirmation");
      await confirmUser(token, tokenId);
      setMessage("Success! Redirecting");
      return history.push("/");
    } catch (err) {
      const { status, message } = parseAuthenticationError(err);
      setMessage(message);
      console.log(err);

      //handleAuthenticationError(err);
    }
  };

  if (mode) {
    setMode(false);
    handleConfirmation(token, tokenId);
  }

  return (
    <div>
      {token && tokenId ? (
        <h3>
          Confirming Registration :{" "}
          {message ? <span>{message}</span> : <span>No Message</span>}{" "}
        </h3>
      ) : (
        <h3>Check your email for a confirmation message</h3>
      )}
    </div>
  );
}
