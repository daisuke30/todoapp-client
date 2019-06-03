 import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { history } from './helpers/history';
import { authenticationService } from './services/authentication';
// components
import List from './components/list';
import Login from './components/login';
import NavBar from './components/NavBar';
import TaskNew from './components/new';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/signup';

export default class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        currentUser: null
      };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({currentUser: x }));
  }

  render() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/list' component={List} />
          <PrivateRoute exact path='/new' component={TaskNew} />
          <Redirect from="/" to="/list" component={List}/>
        </Switch>
      </Router>
    );
  }
}