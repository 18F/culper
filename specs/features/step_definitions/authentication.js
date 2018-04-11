const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')
const fs = require('fs')
const Png = require('png-js')
const url = require('url')
const notp = require('notp')
const base32 = require('thirty-two')
const QrCode = require('qrcode-reader')

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
      //.then(() => { return getQrCode(credentials.token, (token) => { credentials.token = token }) })
      //.then(() => { return provideToken(credentials.token) })
      .then(() => { return acceptIntroduction() })
      .then(() => { return haveAccess() })
  })

  When(/^I go to the login page$/, () => {
    return goToLoginPage()
  })

  Then(/^sign in$/, () => {
    return signIn(credentials.username, credentials.password)
  })

  Then(/^I should be presented with a request for two factor authentication$/, () => {
    return getQrCode(credentials.token, (token) => { credentials.token = token })
  })

  Then(/^provide my token$/, () => {
    return provideToken(credentials.token)
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

    // Two factor token key is taken from an environment variable called `FEATURE_SPEC_2FA`
    credentials.token = process.env.FEATURE_SPEC_2FA || ''
  }

  const goToLoginPage = () => {
    return client
      .url(client.launch_url + '/#/login')
      .waitForElementVisible('body', 1000)
      .assert.visible('.consent-legal')
      .saveScreenshot('./screenshots/Authentication/00-consent.png')
      .click('.consent-acceptance')
      .pause(500)
      .saveScreenshot('./screenshots/Authentication/01-login.png')
  }

  const signIn = (username, password) => {
    return client
      .setValue('input[type="text"]', username)
      .setValue('input[type="password"]', password)
      .saveScreenshot('./screenshots/Authentication/02-credentials.png')
      .click('.auth.basic button[type="submit"]')
      .pause(1000)
      .saveScreenshot('./screenshots/Authentication/03-submitted.png')
  }

  const screenshot = './screenshots/Authentication/qr.png'
  const getQrCode = (token, assignToken) => {
    return client
      .assert.urlContains('/login')
      .assert.visible('.twofactor-component')
      .saveScreenshot('./screenshots/Authentication/04-twofactor.png')
      .isVisible('.twofactor-component', (result) => {
        // If there is no value, which in most cases this is ideal, then we need to scan the
        // QR code and retrieve the token each time.
        //
        // For feature spec testing we want to reset the two-factor authentication
        // on each scenario so it is a true test as well as reduces the possibilities
        // of sensitive data stored within the commit history.
        if (!token) {
          client.click('.reset').pause(2000)
        }
      })
      .saveScreenshot('./screenshots/Authentication/06-twofactor-reset.png')
      .saveScreenshot(screenshot, () => {
        // If we do not have the token (i.e. they were not provided via environment
        // variable) then we need to take a screenshot to scan the QR code.
        if (!token) {
          let c = fs.readFileSync(screenshot)
          let p = new Png(c)

          p.decode(data => {
            let qr = new QrCode()
            qr.callback = (t, err) => {
              if (err) {
                return
              }

              // The QR code returns a URI with the information we are looking for
              // found as a query parameter that is Base32 encoded.
              if (assignToken) {
                assignToken(base32.decode(decodeURI(url.parse(t, true).query['secret'])))
              }
            }
            qr.decode(p, data)
          })
        } else {
          // The token should come Base32 encoded.
          if (assignToken) {
            assignToken(base32.decode(credentials.token))
          }
        }
      })
      .pause(1000)
  }

  const provideToken = (token) => {
    return client
      .setValue('.twofactor-component input[type="text"]', notp.totp.gen(token))
      .saveScreenshot('./screenshots/Authentication/07-insert-token.png')
      .click('.twofactor-component button[type="submit"]')
      .pause(3000)
  }

  const acceptIntroduction = () => {
    return client
      .assert.urlContains('/form')
      .saveScreenshot('./screenshots/Authentication/08-accept-introduction.png')
      .click('.introduction-acceptance .yes label')
      .pause(500)
  }

  const haveAccess = () => {
    return client
      .assert.urlContains('/form')
      .saveScreenshot('./screenshots/Authentication/09-logged-in.png')
  }

  const logout = () => {
    return client
      .isVisible('a.logout', (result) => {
        client.click('a.logout').pause(1000)
      })
      .end()
  }
})
