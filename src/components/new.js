import PropTypes from 'prop-types';
import React from 'react';
import { authHeader } from '../helpers/auth-header';
import { history } from '../helpers/history';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class TaskNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({description: event.target.value});
  }

  handleSubmit() {
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      },
      mode: 'cors',
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(this.state),
    };
    fetch(process.env.SERVER_URL + '/api/tasks', requestOptions)
    .then(response => response.json())
    .then(res => {
      history.push('/list');
    })
    .catch((error) => {
      console.error(error);
    })
  };


  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <TextField
          className={classes.textField}
          label="Description"
          margin="normal"
          onChange={this.handleChange}
          value={this.state.description}
          required
        />
        <Button
          className={classes.button}
          color="primary"
          onClick={this.handleSubmit}
          type="button"
          variant="contained">
          Create
        </Button>
      </form>
    );
  }
}

TaskNew.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskNew);