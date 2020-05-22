import { authHeader, handleResponse } from '../_helpers';

const API_URL = 'http://localhost:80'

export const ticketService = {
    getAll,
    getById,
    createTicket,
    editTicket
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

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authHeader().Authorization)
    console.log(ticket)

    var raw = "{\n    \"summary\": \"Testowy issue2\",\n    \"description\": \"desc\",\n    \"environment\":\"IOS\",\n    \"priority\": \"Critical\"\n}";

    const requestOptions = { method: 'POST', headers: myHeaders, body: JSON.stringify(ticket)};
    return fetch(`${API_URL}/tickets/create`, requestOptions).then(handleResponse);
}

function editTicket(ticket, id){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authHeader().Authorization)
    console.log("UPDATED")
    console.log(ticket.due_date)

    const requestOptions = { method: 'PUT', headers: myHeaders, body: JSON.stringify(ticket)};
    return fetch(`${API_URL}/tickets/${id}`, requestOptions).then(handleResponse);
}