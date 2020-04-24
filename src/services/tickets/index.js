/**
 * @module TicketsService
 */

const ticketsCrud = require('./tickets.service')
const ticketsRouter = require('./tickets.controller')
var jwt = require('jsonwebtoken');
var passport = require("passport");
require('./pass');


module.exports = {
  name: "TicketsService",

  bind(server, db) {
    ticketsCrud.bind(db)
    ticketsRouter.bind(server)

//     server.post('/tickets/login', function (req, res, next) {
//       passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
//           if (err || !user) {
//               return res.status(400).json({
//                   message: err,//'Something is not right',
//                   user   : user,
//                   info : info
//               });
//           }
//           req.login(user, {session: false}, (err) => {
//               if (err) {
//                   res.send(err);
//               }
//               // generate a signed son web token with the contents of user object and return it in the response
//               const token = jwt.sign(user, 'your_jwt_secret');
//               return res.json({user, token});
//           });
//       })(req, res, next);
//   });

//   server.get('/tickets/test', passport.authenticate('jwt', {session: false}), (req, res) => {
//     return res.status(200).send({ "message": "ack" })
// })

  }
}
