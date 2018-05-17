module.exports = getListId

const url = require('url')

function getListId (req) {
  if (!req.headers.referer) {
    throw new Error('Referer header is not set')
  }

  // "http://localhost:3000/sHBjj8C" => "sHBjj8C"
  return url.parse(req.headers.referer).pathname.replace(/[^\w]/g, '')
}
