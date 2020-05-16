import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const API_URL = 'http://localhost:80'

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {

    var payload = {
        'username': username,
        'password': password
    }

    var formBody = []
    for (var property in payload) {
        var encodedKey = encodeURIComponent(property);
        var encodeValue = encodeURIComponent(payload[property])
        formBody.push(encodedKey + "=" + encodeValue);
    }
    formBody = formBody.join("&")

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: formBody//JSON.stringify({ username, password })
    };

    return fetch(`${API_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}