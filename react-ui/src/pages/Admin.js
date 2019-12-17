import React from "react";
import { Card, Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <Card>
        <Button onClick={logOut}>Log Out</Button>
      </Card>
    </div>
  );
}

export default Admin;