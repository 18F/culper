const { defineSupportCode } = require('cucumber')

defineSupportCode(({setDefaultTimeout}) => {
  setDefaultTimeout(120 * 1000)
})
