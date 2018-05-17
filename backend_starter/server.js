// require('http').createServer((request, response) => {
//   response.end('Hello, world!')
// }).listen(8000)

// require express framework
const express = require('express')
const randomString = require('random-string')

// initialize the express server
const app = express()

// Show "Hello, world!" at the root path
app.get('/', (req, res) => {
  const uniquId = randomString({length: 7})
  res.redirect(`/${uniquId}`)
})

app.use('/:id', express.static('frontend'))

// Start the server, listen to port 3000
app.listen(3000, () => console.log('App listening on port 3000!'))
