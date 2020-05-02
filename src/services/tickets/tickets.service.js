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
    delete: _delete,
    createComment,
    updateComment,
    deleteComment
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

async function create(ticketParam, user) {
    var ticket = new Ticket(ticketParam)
    ticket.creator_id = user.uidNumber
    ticket.creator_display_name = user.cn

    return await ticket.save()
}

async function update(ticket_id, ticketParam, user_id) {
    if (!ObjectId.isValid(ticket_id)) {
        throw 'Provided ticket_id is invalid'
    }

    const existingTicket = await Ticket.findOne(new ObjectId(ticket_id))

    if (!existingTicket) throw 'Ticket not found'

    Object.assign(existingTicket, ticketParam)

    existingTicket.updated_date = Date.now

    return await existingTicket.save()
}

async function _delete(ticket_id, user_id) {
    if (!ObjectId.isValid(ticket_id)) {
        throw 'Ticket_id is invalid'
    }

    const existingTicket = await Ticket.findOne(new ObjectId(ticket_id))

    if (existingTicket.creator_id != user_id) {
        throw 'You do not have permissions to delete this ticket'
    }

    return await Ticket.deleteOne({ '_id': new ObjectId(ticket_id) })
}

async function createComment(ticket_id, commentParam, user) {
    if (!ObjectId.isValid(ticket_id)) {
        throw 'Provided ticket_id is invalid'
    }

    const ticket = await Ticket.findOne(new ObjectId(ticket_id))

    if (!ticket) {
        throw 'Ticket with given ID does not exist'
    }

    var comment = ticket.comments.create(commentParam)
    comment.author_id = user.uidNumber
    comment.author_display_name = user.cn

    ticket.comments.push(comment)

    return await ticket.save()
}

async function updateComment(comment_id, appParam, user_id) {
    if (!ObjectId.isValid(comment_id)) {
        throw 'Provided comment_id is invalid'
    }

    const ticket = await Ticket.findOne({ 'comments._id': new ObjectId(comment_id) })

    if (!ticket) {
        throw 'Comment with given ID does not exist'
    }

    var set = {}
    for (var field in appParam) {
        set['comments.$.' + field] = appParam[field]
    }
    set['comments.$.updated_at'] = new Date(Date.now())

    const comment = ticket.comments.id(comment_id)

    if (comment.author_id != user_id) {
        throw 'You do not have permissions to edit this comment'
    }

    const updatedRecord = await Ticket.findOneAndUpdate({ 'comments._id': new ObjectId(comment_id) }, { $set: set }, { new: true })
    if (!updatedRecord) {
        throw 'Comment with given ID does not exist'
    }

    updatedRecord.save()

    return updatedRecord
}

async function deleteComment(comment_id, user_id) {
    if (!ObjectId.isValid(comment_id)) {
        throw 'Provided comment_id is invalid'
    }

    const ticket = await Ticket.findOne({ 'comments._id': new ObjectId(comment_id) })

    if (!ticket) {
        throw 'Comment with given ID does not exist'
    }

    const comment = ticket.comments.id(comment_id)

    if (comment.author_id != user_id) {
        throw 'You do not have permissions to delete this comment'
    }

    await comment.remove()

    return ticket.save()
}
