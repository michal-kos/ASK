var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');

var passportJWT = require("passport-jwt")
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

var OPTS = {
    server: {
        url: 'ldap://ask_openldap:389',
        bindDn: 'cn=admin,dc=askproject,dc=com',
        bindCredentials: 'admin',
        searchBase: 'dc=askproject,dc=com',
        searchFilter: '(uid={{username}})'
    }
};

passport.use(new LdapStrategy(OPTS));

passport.use(new JWTStrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey : 'your_jwt_secret'
    },
    function (jwtPayload, cb){
        
        return cb(null, true)
    }
));