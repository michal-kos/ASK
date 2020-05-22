import { authHeader, handleResponse } from '../_helpers';

const API_URL = 'http://localhost:80'

export const ticketService = {
    getAll,
    getById,
    createTicket
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


function createTicket(ticket){
    // var header = {
    //     "Content-Type": "application/json",
    // }
    // header.push(authHeader())
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authHeader().Authorization)
    //myHeaders.append("Content-Type", "text/plain");
    console.log(ticket)

    var raw = "{\n    \"summary\": \"Testowy issue2\",\n    \"description\": \"desc\",\n    \"environment\":\"IOS\",\n    \"priority\": \"Critical\"\n}";

    const requestOptions = { method: 'POST', headers: myHeaders, body: JSON.stringify(ticket)};
    return fetch(`${API_URL}/tickets/create`, requestOptions).then(handleResponse);
}