let count = 0

const myCounterMiddleware = (req, res, next) => {
    count++
    res.locals.count = count
    next()
}
const notCounterMiddleware = (req, res, next) => {
    count--
    res.locals.count = count
    next()
}
const userIpMiddleware = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.locals.ip = ip
    next()
}

module.exports = {
    myCounterMiddleware,
    notCounterMiddleware,
    userIpMiddleware
}