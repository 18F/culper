const { client } = require('nightwatch-cucumber')
const { After } = require('cucumber')

After(() => new Promise(resolve => {
  var errorCount = 0
  client
    .getLog('browser', function(results) {
      if (results.length > 0) {
        const severeErrors = results.filter((result) => {
          return result.level === 'SEVERE'
        })
        console.log(results)
        if (severeErrors.length > 0) {
          const errors = severeErrors.map((error) => {
            return '"' + error.message + '"'
          }).join(', ')
          throw 'browser log errors detected: [' + errors + ']'
        }
      }
    })

  setTimeout(() => {
    resolve()
  }, 1000)
}))
