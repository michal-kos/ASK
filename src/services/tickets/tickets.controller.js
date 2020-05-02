/**
 * @module TicketService/tickets
 */

const ticketService = require('./tickets.service')

module.exports = {
    bind: function (server) {
        server.post('/tickets/create', create)
        server.get('/tickets', getAll)
        server.get('/tickets/:id', getById)
        server.put('/tickets/:id', update)
        server.delete('/tickets/:id', _delete)
        server.post('/tickets/:id/comment', createComment)
        server.put('/tickets/comment/:id', updateComment)
        server.put('/tickets/comment/:id', deleteComment)
    }
}

/**
 * @api {post} /tickets/create Create new tickets
 * @apiDescription Provides means to create new ticket in the system.
 * @apiName PostTicketCreate
 * @apiGroup Tickets
 * @apiGroup Ticket
 * @apiParam {String} first_name First name of createing ticket.
 * @apiParam {String} last_name Last name of createing ticket.
 * @apiParam {String} email_address Email address of createing ticket (used as login - must be unique).
 * @apiParam {String} password Tickets's password.
 * @apiSuccess {Ticket[]} tickets Array of tickets.
 * @apiExample {curl} Example usage
 *  curl --header "Content-Type: application/json" \
 *  -X POST \
 *  --data '{"first_name":"Jan",last_name":"Kowalski","email_address":"testowy@test.pl",account_type":"1","address": "ul.Promienna 12 Tarnów","password":"Test1234"}}' http://localhost/ticket/create
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
 * @api {get} /tickets/:id Get ticket by id
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
        .then(ticket => res.json(ticket))
        .catch(err => res.status(404).send({"message": err}))
}

/**
 * @api {put} /tickets/:ticket_id Update existing ticket
 * @apiDescription Provides means to update ticket already existing in the system.
 * @apiName PutTicketUpdate
 * @apiGroup Ticket
 * @apiParam { ObjectId } ticket_id is the unique identifier of updated ticket.
 * @apiParam {String} [first_name] New first name of already createed ticket.
 * @apiParam {String} [last_name] New last name of already createed ticket.
 * @apiParam {String} [email_address] New email address of createed ticket (used as login - must be unique).
 * @apiParam {Number} [account_type] New createed ticket's type (1 - Patient, 2 - Employee, 3 - Admin).
 * @apiParam {String} [address] New createed tickets's address.
 * @apiParam {String} [password] New createed tickets's password.
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
 * @api {delete} /tickets/:id Delete ticket with id
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

/**
 * @api {post} /api/v1/tickets/:id/comment Add new comment to existing ticket
 * @apiDescription Provides means to add new comment to existing ticket in the system.
 * @apiName PostCommentAdd
 * @apiGroup Tickets
 * @apiGroup Comments
 * @apiParam {ObjectId} :id Unique identifier of existing ticket to which new comment should be added.
 * @apiParam {String} name Official name of new application.
 * @apiParam {String} platform Platform on which new applicatons is working.
 * @apiSuccess {Applications[]} applications Array of applications.
 * @apiExample {curl} Example usage
 *  curl --header "Content-Type: application/json" \
 *  -X POST \
 *  --data '{"name":"Test application 1","platform":"PC/Linux"}}' http://localhost/api/v1/applications/5eac1e3c564449c5046a00cd
 * @apiSuccessExample {json} Success response
 *   HTTP/1.1 200 Ok
 *     {
 *        "_id": "5eac1e3c564449c5046a00cd",
 *       "project_name": "Testowy projekt 2",
 *       "description": "To jest opis testowego projektu",
 *       "applications": [
 *           {
 *               "created_at": "2020-05-01T13:04:32.540Z",
 *               "updated_at": "2020-05-01T13:04:32.540Z",
 *               "_id": "5eac1e6056444953476a00ce",
 *               "name": "Test application 1",
 *               "platform": "PC/Linux"
 *           }
 *       ],
 *       "created_at": "2020-05-01T13:03:56.650Z",
 *       "updated_at": "2020-05-01T13:03:56.650Z"
 *   }
 * @apiErrorExample {json} Unprocessable entity response
 *   HTTP/1.1 422 Unprocessable entity
 *   {
 *     "message": <reason>
 *   }
 */
function createComment(req, res, next) {
    ticketService.createComment(req.params.id, req.body)
        .then(ticket => res.status(201).send(ticket))
        .catch(err => res.status(422).send({"message": err}))
}

/**
 * @api {put} /api/v1/tickets/comment/:id Update existing comment
 * @apiDescription Provides means to modify exisitng comment in the system.
 * @apiName PutCommentUpdate
 * @apiGroup Comment
 * @apiParam {ObjectId} :id unique identifier of modified application.
 * @apiParam {String} name New official name of modified application.
 * @apiParam {String} platofrm New platform for modified application.
 * @apiSuccess {Application} application Modified application.
 * @apiExample {curl} Example usage
 *  curl --header "Content-Type: application/json" \
 *  -X POST \
 *  --data '{"name":"AP2","platform":"PC/Unix"}}' http://localhost/api/v1/applications/5eac1e6056444953476a00ce
 * @apiSuccessExample {json} Success response
 *   HTTP/1.1 200 Ok
 *   {
 *       "created_at": "2020-05-01T13:04:32.540Z",
 *       "updated_at": "2020-05-01T13:04:32.540Z",
 *       "_id": "5eac1e6056444953476a00ce",
 *       "name": "AP2",
 *       "platform": "PC/Unix"
 *   }
 * @apiErrorExample {json} Unprocessable entity response
 *   HTTP/1.1 422 Unprocessable entity
 *   {
 *     "message": <reason>
 *   }
 */
function updateComment(req, res, next){
    projectService.updateApp(req.params.id, req.body)
        .then(app => res.json(app))
        .catch(err => res.status(404).send({"message": err}))
}

/**
 * @api {delete} /api/v1/ticket/comment/:id Delete comment with given id
 * @apiDescription Provides means to delete comment with provided identifier.
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiParam {ObjectId} :id is the unique identifier for the removed comment.
 * @apiSuccess (204) Empty response
 * @apiExample {curl} Example usage
 *  curl -X Delete http://localhost/api/v1/tickets/comment/5eac1e6056444953476a00ce
 * @apiSuccessExample {} Empty response
 *   HTTP/1.1 204 No content
 * @apiErrorExample {json} Not found response
 *   HTTP/1.1 404 Not found
 *   {
 *     "message": <reason>
 *   }
 */
function deleteComment(req, res, next){
    projectService.deleteComment(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(404).send({"message": err}))
}