import React, { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from '../PrivateRoute';
import BeerList from './BeerList';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Login from "../pages/Login";
import { AuthContext } from "../context/auth";
import logo from '../images/mugs.svg';
import './App.css';

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Admin} />
          <header className="App-header">
            <h1 className="App-name">Craft Bar</h1>
            <img src={logo} className="App-logo" alt="Craft Bar logo" />
            <BeerList/>
          </header>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
