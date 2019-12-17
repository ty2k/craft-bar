import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/auth";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = props.location && props.location.state && props.location.state.referer
                    ? props.location.state.referer
                    : '/';

  function postLogin() {
    const requestBody = {
      username,
      password
    }
    axios.post("/login", requestBody)
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      }).catch(e => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Card>
      <Form>
        <Input
          type="username"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;