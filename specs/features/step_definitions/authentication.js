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
  })

  Then(/^sign in$/, () => {
    return client
      .setValue('input[type="text"]', credentials.username)
      .setValue('input[type="password"]', credentials.password)
      .click('#basic button[type="submit"]')
      .pause(3000)
      .getLog('browser', (entries) => {
        if (!entries) {
          return
        }

        entries.forEach(e => {
          console.log('[' + e.level + '] ' + e.timestamp + ' : ' + e.message)
        })
      })
  })

  Then(/^I should be presented with a request for two factor authentication$/, () => {
    const screenshot = './screenshots/Authentication/qr.png'

    return client
      .assert.urlContains('/login')
      .assert.visible('#twofactor-component')
      .isVisible('#twofactor-component', (result) => {
        // If the QR code is not present then we need to reset two factor
        // authentication to continue with our flow.
        client.click('.reset').pause(2000)
      })
      .saveScreenshot(screenshot, () => {
        var token = process.env.FEATURE_SPEC_2FA || ''

        if (!token) {
          let c = fs.readFileSync(screenshot)
          let p = new Png(c)

          p.decode(data => {
            let qr = new QrCode()
            qr.callback = (t, err) => {
              if (err) {
                return
              }

              credentials.token = base32.decode(decodeURI(url.parse(t, true).query['secret']))
            }
            qr.decode(p, data)
          })
        } else {
          credentials.token = base32.decode(token)
        }
      })
      .pause(1000)
  })

  Then(/^provide my token$/, () => {
    // Two factor token key is taken from an environment variable called `FEATURE_SPEC_2FA`
    // It is also not persisted in the `credentials` object to reduce risk of storing sensitive
    // data in memory.
    return client
      .setValue('#twofactor-component input[type="text"]', notp.totp.gen(credentials.token))
      .click('#twofactor-component button[type="submit"]')
      .pause(3000)
  })

  Then(/^I should be presented with the form$/, () => {
    return client
      .assert.urlContains('/form')
      .saveScreenshot('./screenshots/Authentication/success.png')
  })
})
