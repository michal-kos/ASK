/**
 * @module TicketsService
 */

const ticketsCrud = require('./tickets.service')
const ticketsRouter = require('./tickets.controller')

module.exports = {
  name: "TicketsService",

  bind(server, db) {
    ticketsCrud.bind(db)
    ticketsRouter.bind(server)
  }
}