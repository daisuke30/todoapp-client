import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { authenticationService } from '../services/authentication';

class PrivateRoute extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { component : Component, ...rest } = this.props

    return (
      <Route {...rest} render={() => {
        // redirect to login if the user didn't log in
        if (!authenticationService.currentUserValue) {
          return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
        // redirect to any private component if the user already logged in
        return <Component {...this.props} />
      }}
      />
    )
  }
}

export default PrivateRoute
