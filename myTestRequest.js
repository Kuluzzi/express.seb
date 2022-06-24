// // make a post request to localhost:3000/
// const http = require('http')

// // http request with query string balance=100&
// const requestOptions = {
//     hostname: 'localhost',
//     port: 3000,
//     path: '/',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength('balance=100&')
//     }
// }

// const req = http.request(requestOptions,
//     (res) => {
//         console.log(res.statusCode)
//         res.on('data', (chunk) => {
//             console.log(chunk.toString())
//         })
//     })

// req.write(JSON.stringify({
//     name: 'John',
//     age: 30
// }))
// req.end()




// http request usign axios
const axios = require('axios')
const requestOptions = {
    method: 'POST',
    url: 'http://localhost:3000/?balance=100&petName=CHIP',
    data: {
        name: 'John',
        age: 30
    }
}
axios(requestOptions)
    .then((res) => {
        // output the response body
        console.log('Response data:', res.data)
    })
    .catch((err) => {
        console.log(err)
    })
