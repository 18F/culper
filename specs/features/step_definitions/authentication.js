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
    credentials.username = username
    credentials.password = password
  })

  When(/^I go to the login page$/, () => {
    return client
      .url(client.launch_url + '/#/login')
      .waitForElementVisible('body', 1000)
      .saveScreenshot('./screenshots/Authentication/01-login.png')
  })

  Then(/^sign in$/, () => {
    return client
      .setValue('input[type="text"]', credentials.username)
      .setValue('input[type="password"]', credentials.password)
      .saveScreenshot('./screenshots/Authentication/02-credentials.png')
      .click('#basic button[type="submit"]')
      .pause(3000)
      .saveScreenshot('./screenshots/Authentication/03-submitted.png')
  })

  Then(/^I should be presented with a request for two factor authentication$/, () => {
    const screenshot = './screenshots/Authentication/qr.png'

    return client
      .assert.urlContains('/login')
      .assert.visible('#twofactor-component')
      .saveScreenshot('./screenshots/Authentication/04-twofactor.png')
      .isVisible('#twofactor-component', (result) => {
        // Two factor token key is taken from an environment variable called `FEATURE_SPEC_2FA`
        credentials.token = process.env.FEATURE_SPEC_2FA || ''

        // If there is no value, which in most cases this is ideal, then we need to scan the
        // QR code and retrieve the token each time.
        //
        // For feature spec testing we want to reset the two-factor authentication
        // on each scenario so it is a true test as well as reduces the possibilities
        // of sensitive data stored within the commit history.
        if (!credentials.token) {
          client.click('.reset').pause(2000)
        }
      })
      .saveScreenshot('./screenshots/Authentication/06-twofactor-reset.png')
      .saveScreenshot(screenshot, () => {
        // If we do not have the token (i.e. they were not provided via environment
        // variable) then we need to take a screenshot to scan the QR code.
        if (!credentials.token) {
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
              credentials.token = base32.decode(decodeURI(url.parse(t, true).query['secret']))
            }
            qr.decode(p, data)
          })
        } else {
          // The token should come Base32 encoded.
          credentials.token = base32.decode(credentials.token)
        }
      })
      .pause(1000)
  })

  Then(/^provide my token$/, () => {
    return client
      .setValue('#twofactor-component input[type="text"]', notp.totp.gen(credentials.token))
      .saveScreenshot('./screenshots/Authentication/07-insert-token.png')
      .click('#twofactor-component button[type="submit"]')
      .pause(3000)
  })

  Then(/^I should be presented with the form$/, () => {
    return client
      .assert.urlContains('/form')
      .saveScreenshot('./screenshots/Authentication/08-logged-in.png')
  })
})
