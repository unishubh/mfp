import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from './pages/dashboard.page';
import Login from './pages/login.page';

class App extends Component {

  constructor(){
    super();

    this.state = {
      isLoggedIn: false,
      client: {
        id: null,
        name: ''
      }
    };
  }

  loadClient = (res) =>{
    console.log(" in app",res);
    let client = {
      id: res.client.id,
      name: res.client.name
    }
    this.updateClient(client);
    this.updateIsLoggedIn(true);
    localStorage.setItem('LoggedIn',this.state.isLoggedIn);
    localStorage.setItem('token',res.token);
    localStorage.setItem('client', JSON.stringify(this.state.client));
  }

  updateClient = (value) =>{
    this.setState({client: value});
  }

  updateIsLoggedIn = (value) =>{
    this.setState({isLoggedIn: value});
  }

  render() {
    console.log("in app", this.state.client);
    return (
      
         <Switch>
          <Route exact path = '/' render={(props) =>
            <Login {...props}
              loadClient = {this.loadClient}
            />
          } />
          <Route exact path = '/dashboard' render = {(props) =>
            <Dashboard {...props}
              updateClient = {this.updateClient}
              clientData = {this.state.client}
              isLoggedIn = {this.state.client}
              />    
          } />
        </Switch>
    );
  }
}

export default App;
