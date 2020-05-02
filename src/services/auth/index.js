/**
 * @module AuthService
 */

var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require("passport");

module.exports = {
    name: "AuthService",
  
    bind(server, db) {
        // server = newServer;
        // db = newdb;

        /* POST login. */
        server.post('/auth/login', function (req, res, next) {
            passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
                if (err || !user) {
                    return res.status(400).json({
                        message: err,
                        user   : user,
                        info : info
                    });
                }
                req.login(user, {session: false}, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    // generate a signed json web token with the contents of user object and return it in the response
                    const token = jwt.sign(user, 'your_jwt_secret', {expiresIn: '30s'});
                    console.log(user)
                    return res.json({user, token});
                });
            })(req, res, next);
        });

        server.get('/auth/test', passport.authenticate('jwt', {session: false}), (req, res) => {
            console.log(req.user.gidNumber)
            return res.status(200).send({ "user gidNumber: ": req.user.gidNumber })
        })
    }
  }