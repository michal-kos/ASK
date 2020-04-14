const bcrypt = require('bcrypt')
const ObjectId = require('mongoose').Types.ObjectId
const Ticket = require('./ticket.model')
var Tickets

module.exports = {
    bind: function (database) {
        Tickets = database.collection('tickets')
    },
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

async function getAll(query) {
    let allowedFilters = ["_id", "project_id", "reporter", "assignee", "creator", "issue_type", "environment", "priority", "resoulution", "issue_status", "creation_date", "due_date", "resolution_date", "watches"]
    let filters = {}

    Object.keys(query).forEach(key => {
        if (allowedFilters.includes(key)) {
            switch (key) {
                default:
                    filters[key] = query[key]
                    break
            }
        }
    })

    return await Ticket.find(filters)
}

async function getById(ticket_id) {
    if (!ObjectId.isValid(ticket_id)) {
        throw 'Provided ticket_id is invalid'
    }
    
    const ticket = await Ticket.findOne(new ObjectId(ticket_id))

    if (!ticket) {
        throw 'Ticket with provided id does not exist'
    }

    return ticket
}

async function create(ticketParam) {
    const ticket = new Ticket(ticketParam)
    
    return await ticket.save()
}

async function update(ticket_id, ticketParam) {
    if (!ObjectId.isValid(ticket_id)) {
        throw 'Provided ticket_id is invalid'
    }

    const existingTicket = await Ticket.findOne(new ObjectId(ticket_id))

    if (!existingTicket) throw 'Ticket not found'

    Object.assign(existingTicket, ticketParam)

    return await existingTicket.save()
}

async function _delete(ticket_id) {
    if (!ObjectId.isValid(ticket_id)) {
        throw 'Ticket_id is invalid'
    }

    return await Ticket.deleteOne({ '_id': new ObjectId(ticket_id) })
}