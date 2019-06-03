import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { authenticationService } from '../services/authentication';
import { history } from '../helpers/history';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
class NavBar extends Component {
  handleSubmit() {
    authenticationService.logout();
    history.push('/login');
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={this.props.classes.root}
              color="inherit"
              variant="h6">
              To Do
            </Typography>
            <Button
              color="inherit"
              onClick={this.handleSubmit}
              style={{ display: authenticationService.currentUserValue ? '' : 'none' }}
              type="button">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);