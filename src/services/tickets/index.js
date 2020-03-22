/**
 * @module TicketsService
 */

const ticketsCrud = require('./tickets')

module.exports = {
  name: "TicketsService",

  bind(server, db) {
    ticketsCrud.bind(server, db)
  }
}

 console.log("Hello world")