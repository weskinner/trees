require('dotenv').config()

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Index from './Index.jsx'
import CreateSighting from './CreateSighting.jsx'

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <ul className="nav">
              <li className="nav-item">
                <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Sightings</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Route path="/" exact component={Index} />
            <Route path="/sighting" exact component={CreateSighting} />
          </div>
        </div>
      </div>
    </Router>
  )
}

if (process.env.NODE_ENV == 'production') {
  window. onSignIn = function onSignIn(googleUser) {
    var idToken = googleUser.getAuthResponse().id_token;
    document.cookie = 'auth='+idToken;
  }
}
else {
  document.cookie = 'auth=dev';
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
)