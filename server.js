// Imports bspw. Express API
const express = require('express')

session = require('express-session')

// neue Instanz/Applikation zum Verwenden des express Servers
const server = express()

server.use('/', function (req, res, next) {
    var date_ob = new Date();

var day = ("0" + date_ob.getDate()).slice(-2);

var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

var year = date_ob.getFullYear();

    console.log('<p>Todays date: ' + day + '.' + month + '.' + year + '</p>');

    next();
}, function (req, res, next) {
    var date_ob = new Date();

    var hours = date_ob.getHours();

    console.log('<p>Current hour: ' + hours + '</p>')
    next();

})

server.use(
    session ({
        // session secret
        secret: "geheim",

    /*    // session forced to be saved
        resave: true,

        // forces saving "uninitialized" session to the store
        saveUninitialized: false,
        cookie: {
        } */  })
);
server.get('/', function (req, res, next) {
    var date_ob = new Date();

var day = ("0" + date_ob.getDate()).slice(-2);

var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

var year = date_ob.getFullYear();

    res.write('<p>Todays date: ' + day + '.' + month + '.' + year + '</p>');
    res.end()
    next();
}, function (req, res, next) {
    var date_ob = new Date();

    var hours = date_ob.getHours();

    res.write('<p>Current hour: ' + hours + '</p>')
    res.end()
    next();

}, function (req, res, next) {

    if(req.session.views) {

        req.session.views++

        // views output
        res.write('<p> Views: ' + req.session.views + '</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('<p> New session.</p>')
    }
    next();
}, function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.write('<p>User IP: ' + ip + '</p>');
    res.end()
    next()
})

server.listen('3000', () => console.log("Server started. Listening on Port 3000."))
