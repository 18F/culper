const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({Given, Then, When}) => {
  let credentials = {
    username: '',
    password: '',
    token: ''
  }

  Given(/^my username is "(.*?)" and my password is "(.*?)"$/, (username, password) => {
    setCredentials(username, password)
  })

  Given(/^I am a registered user$/, () => {
    setCredentials('spec01', 'password01')
  })

  When(/^I log in$/, () => {
    return goToLoginPage()
      .then(() => { return signIn(credentials.username, credentials.password) })
      .then(() => { return acceptIntroduction() })
      .then(() => { return haveAccess() })
  })

  When(/^I go to the login page$/, () => {
    return goToLoginPage()
  })

  Then(/^sign in$/, () => {
    return signIn(credentials.username, credentials.password)
  })

  Then(/^I should be presented with the introduction$/, () => {
    return acceptIntroduction()
  })

  Then(/^I should be presented with the form$/, () => {
    return haveAccess()
  })

  Then(/^I log out$/, () => {
    return logout()
  })

  const setCredentials = (username, password) => {
    credentials.username = username
    credentials.password = password
  }

  const goToLoginPage = () => {
    return client
      .url(client.launch_url)
      .waitForElementVisible('body', 1000)
      .assert.visible('.consent-legal')
      .saveScreenshot('./screenshots/Authentication/00-consent.png')
      .click('.consent-acceptance')
      .saveScreenshot('./screenshots/Authentication/01-login.png')
  }

  const signIn = (username, password) => {
    return client
      .setValue('input[type="text"]', username)
      .setValue('input[type="password"]', password)
      .saveScreenshot('./screenshots/Authentication/02-credentials.png')
      .click('.auth.basic button[type="submit"]')
      .waitForElementVisible('.introduction-modal', 5000)
      .saveScreenshot('./screenshots/Authentication/03-submitted.png')
  }

  const acceptIntroduction = () => {
    return client
      .assert.urlContains('/form')
      .saveScreenshot('./screenshots/Authentication/08-accept-introduction.png')
      .click('.introduction-acceptance .yes label')
  }

  const haveAccess = () => {
    return client
      .assert.urlContains('/form')
      .saveScreenshot('./screenshots/Authentication/09-logged-in.png')
  }

  const logout = () => {
    return client
      .isVisible('a.logout', (result) => {
        client.click('a.logout')
        .waitForElementVisible('.consent-acceptance', 5000)
      })
      .end()
  }
})
