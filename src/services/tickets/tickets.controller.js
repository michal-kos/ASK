/**
 * @module TicketService/tickets
 */

const ticketService = require('./tickets.service')
var passport = require('passport')
// require('jsonwebtoken');
// require('./pass');
// require('./index');

const unAuthMsg = 'You are not authorized for this endpoint.';

// const ensureAuthenticated = (req, res, next) => {
// if (req.isAuthenticated()) {
//     next();
// } else {
//     res.status(401).json({"message": unAuthMsg});
// }
// };

module.exports = {
    bind: function (server) {
        //server.post('/tickets/login', login)
        server.post('/ticket/create', create)
        server.get('/tickets', passport.authenticate('jwt', {session: false}), getAll)
        server.get('/ticket/:id', getById)
        server.put('/ticket/:id', update)
        server.delete('/ticket/:id', _delete)
    }
}

// function login(req, res, next) {
//     ticketService.login(req.body)
//         .then(ticket => res.status(201).send(ticket))
//         .catch(err => res.status(422).send({"message": err}))
// }

/**
 * @api {post} /tickets/register Register new tickets
 * @apiDescription Provides means to register new ticket in the system.
 * @apiName PostTicketRegister
 * @apiGroup Tickets
 * @apiGroup Ticket
 * @apiParam {String} first_name First name of registering ticket.
 * @apiParam {String} last_name Last name of registering ticket.
 * @apiParam {String} email_address Email address of registering ticket (used as login - must be unique).
 * @apiParam {Number} account_type Registering ticket's type (1 - Patient, 2 - Employee, 3 - Admin).
 * @apiParam {String} address Tickets's address.
 * @apiParam {String} password Tickets's password.
 * @apiSuccess {Ticket[]} tickets Array of tickets.
 * @apiExample {curl} Example usage
 *  curl --header "Content-Type: application/json" \
 *  -X POST \
 *  --data '{"first_name":"Jan",last_name":"Kowalski","email_address":"testowy@test.pl",account_type":"1","address": "ul.Promienna 12 Tarnów","password":"Test1234"}}' http://localhost/ticket/register
 * @apiSuccessExample {json} Success response
 *   HTTP/1.1 200 Ok
 *   {
 *     "_id": "5e1df9428afdd7001ea50e30",
 *     "first_name": "Jan",
 *     "last_name": "Kowalski",
 *     "email_address": "v7gmzitf5o@gmail.com",
 *     "account_type": 1,
 *     "address": "ul.Promienna 12 Tarnów",
 *     "password": "$2b$10$G0pwI1OV4GGUjAtQYc2fCeFIPhbKDTJijTpjbJEXqmOBbXLdo4.8W",
 *     "creation_date": "2020-01-14T17:24:18.435Z",
 *     "__v": 0
 *   }
 * @apiErrorExample {json} Unprocessable entity response
 *   HTTP/1.1 422 Unprocessable entity
 *   {
 *     "message": <reason>
 *   }
 */
function create(req, res, next) {
    ticketService.create(req.body)
        .then(ticket => res.status(201).send(ticket))
        .catch(err => res.status(422).send({"message": err}))
}

/**
 * @api {get} /tickets Get all tickets
 * @apiDescription Provides means to get all tickets with filtering capabilities (see parameters).
 * @apiName GetTickets
 * @apiGroup Tickets
 * @apiParam {Number} account_type Account type of searched ticket (1 - Patient, 2 - Employee, 3 - Admin) (filtering).
 * @apiParam {Date} after Date after which the ticket was added (filtering).
 * @apiParam {Date} before Date before which the ticket was added (filtering).
 * @apiSuccess {Ticket[]} tickets Array of tickets.
 * @apiExample {curl} Example usage
 *  curl http://localhost/tickets?account_type=1&before=2018-12-30&after=2020-01-01
 * @apiSuccessExample {json} Success response
 *   HTTP/1.1 200 Ok
 *   [
 *     {
 *        "_id": "5e1df9278afdd7001ea50e2f",
 *        "first_name": "Jakub",
 *        "last_name": "Bochenek",
 *        "email_address": "id95i5i0ucr@gmail.com",
 *        "account_type": 2,
 *        "address": "ul.Krakowska 12 Tarnów",
 *        "password": "$2b$10$dJ91CcekKeWtc49iCRPDuOjPwGCPhYjknB0F9eUUWAZGW7fXUbc22",
 *        "creation_date": "2020-01-14T17:23:51.576Z"
 *     },
 *     ...
 *   ]
 * @apiErrorExample {json} Not found response
 *   HTTP/1.1 404 Not found
 *   {
 *     "message": <reason>
 *   }
 */
function getAll(req, res, next) {
    ticketService.getAll(req.query)
        .then(tickets => res.json(tickets))
        .catch(err => res.status(404).send({"message": err}))
}

/**
 * @api {get} /ticket/:id Get ticket by id
 * @apiDescription Provides means to get ticket with provided identifier (see parameters).
 * @apiName GetTicket
 * @apiGroup Ticket
 * @apiParam {ObjectId} :id is the unique identifier of the searched ticket.
 * @apiSuccess {Ticket} ticket Ticket with provided Id.
 * @apiExample {curl} Example usage
 *  curl http://localhost/ticket/5df131e10d15a2021a265b2d
 * @apiSuccessExample {json} Success response
 *   HTTP/1.1 200 Ok
 *   {
 *     "_id": "5e1df9428afdd7001ea50e30",
 *     "first_name": "Jan",
 *     "last_name": "Kowalski",
 *     "email_address": "v7gmzitf5o@gmail.com",
 *     "account_type": 1,
 *     "address": "ul.Promienna 12 Tarnów",
 *     "password": "$2b$10$G0pwI1OV4GGUjAtQYc2fCeFIPhbKDTJijTpjbJEXqmOBbXLdo4.8W",
 *     "creation_date": "2020-01-14T17:24:18.435Z",
 *     "__v": 0
 *   }
 * @apiErrorExample {json} Not found response
 *   HTTP/1.1 404 Not found
 *   {
 *     "message": <reason>
 *   }
 */
function getById(req, res, next) {
    ticketService.getById(req.params.id)
        .then(tickets => tickets ? res.json(tickets[0]) : res.sendStatus(404))
        .catch(err => res.status(404).send({"message": err}))
}

/**
 * @api {put} /ticket/:ticket_id Update existing ticket
 * @apiDescription Provides means to update ticket already existing in the system.
 * @apiName PutTicketUpdate
 * @apiGroup Ticket
 * @apiParam { ObjectId } ticket_id is the unique identifier of updated ticket.
 * @apiParam {String} [first_name] New first name of already registered ticket.
 * @apiParam {String} [last_name] New last name of already registered ticket.
 * @apiParam {String} [email_address] New email address of registered ticket (used as login - must be unique).
 * @apiParam {Number} [account_type] New registered ticket's type (1 - Patient, 2 - Employee, 3 - Admin).
 * @apiParam {String} [address] New registered tickets's address.
 * @apiParam {String} [password] New registered tickets's password.
 * @apiSuccess {Ticket} ticket Updated ticket object.
 * @apiExample {curl} Example usage
 *  curl --header "Content-Type: application/json" \
 *  -X PUT \
 *  --data '{"first_name":"Jan",last_name":"Kowalski","email_address":"testowy@test.pl",account_type":"1","address": "ul.Promienna 12 Tarnów","password":"Test1234"}}' http://localhost/ticket/5e1df9428afdd7001ea50e30
 * @apiSuccessExample {json} Success response
 *   HTTP/1.1 200 Ok
 *   {
 *     "_id": "5e1df9428afdd7001ea50e30",
 *     "first_name": "Jan",
 *     "last_name": "Kowalski",
 *     "email_address": "v7gmzitf5o@gmail.com",
 *     "account_type": 1,
 *     "address": "ul.Promienna 12 Tarnów",
 *     "password": "$2b$10$G0pwI1OV4GGUjAtQYc2fCeFIPhbKDTJijTpjbJEXqmOBbXLdo4.8W",
 *     "creation_date": "2020-01-14T17:24:18.435Z",
 *     "__v": 0
 *   }
 * @apiErrorExample {json} Unprocessable entity response
 *   HTTP/1.1 422 Unprocessable entity
 *   {
 *     "message": <reason>
 *   }
 */
function update(req, res, next) {
    ticketService.update(req.params.id, req.body)
        .then(ticket => res.json(ticket))
        .catch(err => res.status(404).send({"message": err}))
}

/**
 * @api {delete} /ticket/:id Delete ticket with id
 * @apiDescription Provides means to delete ticket with provided identifier.
 * @apiName DeleteTicket
 * @apiGroup Ticket
 * @apiParam {ObjectId} :id is the unique identifier for the searched ticket.
 * @apiSuccess (204) Empty response
 * @apiExample {curl} Example usage
 *  curl -X Delete http://localhost/ticket/5df131e10d15a2021a265b2d
 * @apiSuccessExample {} Empty response
 *   HTTP/1.1 204 No content
 * @apiErrorExample {json} Not found response
 *   HTTP/1.1 404 Not found
 *   {
 *     "message": <reason>
 *   }
 */
function _delete(req, res, next) {
    ticketService.delete(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(404).send({"message": err}))
}
