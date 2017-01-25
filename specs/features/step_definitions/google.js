const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({Given, Then, When}) => {
  const browser = client

  Given(/^I open Google's search page$/, () => {
    return browser
      .url('http://google.com')
      .waitForElementVisible('body', 1000)
  })

  Then(/^the title is "(.*?)"$/, (text) => {
    return browser.assert.title(text)
  })

  Then(/^the Google search form exists$/, () => {
    return browser.assert.visible('input[name="q"]')
  })
})
