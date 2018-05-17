// require npm modules, see "dependencies" in package.json
const express = require('express') // see http://expressjs.com/
const bodyParser = require('body-parser') // see http://ghub.io/body-parser
const randomString = require('random-string') // see https://ghub.io/random-string
const JSONStore = require('json-store') // see https://ghub.io/json-store

// require app-specific module
const getListId = require('./get-list-id')

// initialize the express server
const app = express()

// initialize data store
const storeDataPath = require('path').join(__dirname, '..', '.data', 'store.json')
const store = JSONStore(storeDataPath)

// when opening root path, redirect to random path.
// Different todos are stored at different paths.
app.get('/', (req, res) => {
  const uniquId = randomString({length: 7})
  res.redirect(`/${uniquId}`)
})

// Load todos array. Get list id from request header
app.get('/todos', (req, res) => {
  const listId = getListId(req)
  res.json(store.get(listId) || [])
})

// Save todos array. Get list id from request header
app.post('/todos', bodyParser.json(), (req, res) => {
  const listId = getListId(req)
  store.set(listId, req.body)
  res.end()
})

// serve static HTML, CSS & JavaScript when a path is set.
app.use('/:id', express.static('frontend'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
