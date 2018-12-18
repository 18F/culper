const { client } = require('nightwatch-cucumber')
const { After } = require('cucumber')

const okSevereErrorsToIgnore = [
  'Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op.'
]

After(() => new Promise(resolve => {
  var errorCount = 0
  client
    .getLog('browser', function(results) {
      if (results.length > 0) {
        const severeErrors = results.filter((result) => {
          const ignorableError = okSevereErrorsToIgnore.reduce((match, errorToSkip) => {
            return match || result.message.includes(errorToSkip)
          }, false)
          result.ignorable = ignorableError
          return !ignorableError && result.level === 'SEVERE'
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
