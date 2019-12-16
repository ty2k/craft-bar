const request = require('request')

module.exports = {
  // Return a Promise that is resolved/rejected based on API response
  callAPI: (url) => {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, body) => {
        if (err) {
          reject(err)
        }

        resolve(body)
      })
    })
  }
}
