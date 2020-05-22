import { authHeader, handleResponse } from '../_helpers';

const API_URL = 'http://localhost:80'

export const userService = {
    getAll,
    getById,
    createComment,
    deleteComment
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${API_URL}/tickets`, requestOptions)
        .then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${API_URL}/tickets/${id}`, requestOptions)
        .then(handleResponse);
}

async function createComment(id, comment) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", authHeader().Authorization)

    const requestOptions = { method: 'POST', headers: headers, body: JSON.stringify({ body: comment }) };
    return fetch(`${API_URL}/tickets/${id}/comment`, requestOptions)
        .then(handleResponse);
}

async function deleteComment(id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return await fetch(`${API_URL}/tickets/comment/${id}`, requestOptions)
        .then(handleResponse);
}
