const { defineSupportCode } = require('cucumber')

defineSupportCode(({setDefaultTimeout}) => {
  setDefaultTimeout(60 * 1000)
})
