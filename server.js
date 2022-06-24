// Imports bspw. Express API
const express = require('express')
const middlewares = require('./middlewares.js')


// neue Instanz/Applikation zum Verwenden des express Servers
const server = express()

server.use(middlewares.myCounterMiddleware)
server.use(express.json())


server.get('/', (req, res) => {
    res.send('Hello World')
})

server.get('/todays-date', (req, res) => {
    // return todays date
    res.send(new Date().toDateString())
})

server.get('/hour', middlewares.myCounterMiddleware, (req, res) => {
    // return todays date
    const date = new Date()
    const hours = date.getHours()
    res.json(hours)
})

server.get('/numbers', middlewares.notCounterMiddleware, middlewares.userIpMiddleware, (req, res) => {
    const ip = res.locals.ip
    if (ip !== '::1')
        console.log('WARNING! this ip is trying to use an admin endpoint', ip)
        
    const count = res.locals.count
    res.json(count)
})

server.get('/ip', middlewares.userIpMiddleware, (req, res) => {
    res.json(res.locals.ip)
})


server.post('/', function (req, res) {
    // Work with the user's body string here.
    const newBodyObject = {}
    Object.entries(req.body).forEach(function (entry) {
        const key = entry[0]
        const value = entry[1]
        if (typeof value === 'string')
            newBodyObject[key] = value.toUpperCase()
        else
            newBodyObject[key] = value

    })

    // Working with the user's query string here.
    const newQueryObject = {}
    Object.entries(req.query).forEach(function (entry) {
        const key = entry[0]
        const value = entry[1]
        if (typeof value === 'string')
            newQueryObject[key] = value.toLowerCase()
        else
            newQueryObject[key] = value
    })

    res.send({
        body: newBodyObject,
        query: newQueryObject,
    })

})



server.get('/disabled', function (req, res, next) {
    var date_ob = new Date();

    var day = ("0" + date_ob.getDate()).slice(-2);

    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    var year = date_ob.getFullYear();

    res.write('<p>Todays date: ' + day + '.' + month + '.' + year + '</p>');
    next();
}, function (req, res, next) {
    var date_ob = new Date();

    var hours = date_ob.getHours();

    res.write('<p>Current hour: ' + hours + '</p>')
    next();

}, function (req, res, next) {

    console.log("No.3", req.session.views)
    if (req.session.views) {

        // Increment the number of views.
        req.session.views++

        // Print the views.
        res.write('<p> No. of views: '
            + req.session.views + '</p>')
    } else {
        req.session.views = 1
        res.end(' New session started.')
    }
    next()
}, function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.write('<p>User IP: ' + ip + '</p>');
    res.end()
})

server.get('/session', function (req, res, next) {
    console.log("No.", req.session.views)
    if (req.session.views) {

        // Increment the number of views.
        req.session.views++

        // Print the views.
        res.write('<p> Number of views: '
            + req.session.views + '</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end(' New session.')
    }
})


server.listen('3000', () => console.log("Server started. Listening on Port 3000."))
