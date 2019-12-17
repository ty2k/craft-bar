import React, { Component, useCallback, useEffect, useState }  from 'react';
import './LoginPanel.css';

export default function LoginPanel(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [url, setUrl] = useState('/login');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response)
  }, [url]);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: '',
  //     password: ''
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }



  // handleChange(event) {
  //   const name = event.target.name;
  //   this.setState({ [name]: event.target.value });
  // }

  // handleSubmit(event) {
  //   // const [message, setMessage] = useState(null);
  //   // const [isAuthenticating, setIsAuthenticating] = useState(false);
  //   // const [beers, setBeers] = useState([]);
  //   // const [url, setUrl] = useState('/login');

  //   // console.log('event: ', event);

  //   // const fetchData = useCallback(() => {
  //   //   fetch(url)
  //   //     .then(response => {
  //   //       if (!response.ok) {
  //   //         throw new Error(`status ${response.status}`);
  //   //       }
  //   //       return response.json();
  //   //     })
  //   //     .then(json => {
  //   //       setBeers(json);
  //   //       // setMessage(`${json.beers.length} beers and counting!`);
  //   //       // setIsFetching(false);
  //   //     }).catch(e => {
  //   //       setMessage(`API call failed: ${e}`);
  //   //       // setIsFetching(false);
  //   //     })
  //   // }, [url]);

  //   // useEffect(() => {
  //   //   // setIsFetching(true);
  //   //   fetchData();
  //   // }, [fetchData]);

  //   alert('A name was submitted: ' + this.state.username + ' ' + this.state.password);
  //   event.preventDefault();
  // }

  return (
    <form className="LoginPanel" onSubmit={handleSubmit}>
      <div className="LoginField">
        <label htmlFor="username">
          Username:&nbsp;
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          />
      </div>
      <div className="LoginField">
        <label htmlFor="password">
          Password:&nbsp;
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
      </div>
      <button disabled={isSubmitting || !validateForm()} type="submit">
        Submit
      </button>
    </form>
  );
}
