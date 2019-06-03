import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handle-response';
import { history } from '../helpers/history';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(state) {
  fetch('http://localhost:1313/login', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    redirect: 'follow',
    body:  JSON.stringify(state)
  })
  .then(handleResponse)
  .then(user => {
      // store jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);
      history.push('/list');

      return user;
  });
}

function logout() {
  // remove jwt token from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}