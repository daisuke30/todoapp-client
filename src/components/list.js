import React from 'react';
import PropTypes from 'prop-types';
import { authHeader } from '../helpers/auth-header';
import { history } from '../helpers/history';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginTop: 20,
  }
});

class TaskList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
      offset: 0,
      parPage: 10,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchTasks()
  }

  // fetch all tasks
  fetchTasks() {
    const requestOptions = {
      headers: {
        'Authorization': authHeader()
      },
      mode: 'cors',
    };
    fetch(process.env.SERVER_URL + '/api/tasks', requestOptions)
    .then(x => x.json())
    .then(res => {
      this.setState({
        tasks: res,
        isLoading: false,
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }

  // update a task for checking that task is done or not
  handleToggle = value => () => {
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      },
      mode: 'cors',
      method: 'PUT',
      body: value,
    };
    fetch( process.env.SERVER_URL + `/api/tasks/${value.ID}/completed`, requestOptions)
    .then(res => {
      this.fetchTasks()
    })
    .catch((error) => {
      console.error(error);
    })
  };

  createLink() {
    history.push('/new');
  }

  deleteItem = value => () => {
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      },
      mode: 'cors',
      method: 'DELETE',
      body: value,
    };
    fetch(process.env.SERVER_URL + `/api/tasks/${value.ID}`, requestOptions)
    .then(res => {
      this.fetchTasks()
    })
    .catch((error) => {
      console.error(error);
    })
  };

  handleClickPagination = offset => {
    this.setState({ offset })
  };


  render() {
    const { classes } = this.props;
    const tasks = this.state.tasks;
    const isLoading = this.state.isLoading;
    const offset = this.state.offset;
    const parPage = this.state.parPage;

    if (!isLoading) {
      return (
        <div>
          <Button
            className={classes.button}
            color="primary"
            onClick={this.createLink}
            type="button"
            variant="contained">
            Create
          </Button>
          <List dense className={classes.root}>
            {tasks.slice(offset, offset + parPage).map((task, index) => (
              <ListItem key={index} button>
                <ListItemIcon>
                  <Checkbox
                    onChange={this.handleToggle(task)}
                    checked={task.Completed == true}
                  />
                </ListItemIcon>
                <ListItemText primary={task.Description} />
                <ListItemSecondaryAction>
                  <DeleteIcon
                    onClick={this.deleteItem(task)}/>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Pagination
            limit={this.state.parPage}
            offset={this.state.offset}
            total={this.state.tasks.length}
            onClick={(e, offset) => this.handleClickPagination(offset)}
          />
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);