import React, { Component } from 'react';
import './App.css';
import Registration from './Container/Registration';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import AboutYou from './Container/AboutYou';
import Schedule from './Container/Schedule';
import Accounting from './Container/Accounting';
import Final from './Container/Final';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" render={props => <Registration {...props} />} />
              <Route exact path="/aboutYou" render={props => <AboutYou {...props} />} />
              <Route exact path="/schedule" render={props => <Schedule {...props} />} />
              <Route exact path="/accounting" render={props => <Accounting {...props} />} />
              <Route exact path="/final" render={props => <Final {...props} />} />              
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
