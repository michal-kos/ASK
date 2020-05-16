import { authHeader, handleResponse } from '../_helpers';

const API_URL = 'http://localhost:80'

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${API_URL}/tickets`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${API_URL}/tickets/${id}`, requestOptions).then(handleResponse);
}