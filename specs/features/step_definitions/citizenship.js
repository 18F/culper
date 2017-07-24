const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let range = 7
let counter = 0

const filenum = () => {
  const size = 4
  const num = counter++

  let s = '' + num
  while (s.length < size) {
    s = '0' + s
  }

  return s
}

defineSupportCode(({Given, Then, When}) => {

  When(/^I fill in the citizenship (.*?) section$/, (subsection) => {
    const section = 'Citizenship'
    let promise = navigateToSection(section)
      .then(() => { return navigateToSubsection(section.toLowerCase(), subsection) })

    switch (subsection) {
      case 'status':
        return completeCitizenshipStatus(promise)
      default:
        return promise
    }
  })

  When(/^I click Next (.*?)$/, (section) => {
    return navigateToNext()
  })

  Then(/^I should be in the citizenship (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('citizenship', subsection)
  })
})

const completeCitizenshipStatus = (promise) => {
  return promise
    .then(() => { return setOption('.status .blocks.citizenship-status .citizenship-status-naturalized label') })
    .then(() => { return setText('.status .datecontrol.entry-date .month input', '1') })
    .then(() => { return setText('.status .datecontrol.entry-date .day input', '1') })
    .then(() => { return setText('.status .datecontrol.entry-date .year input', '1980') })
    .then(() => { return setText('.status .location.entry-location .city input', 'Fairfax') })
    .then(() => { return setText('.status .location.entry-location .state input', 'VA') })
    .then(() => { return setText('.status .country.prior-citizenship input', 'Canada') })
    .then(() => { return setOption('.status .branch.has-alien-registration .yes.block label') })
    .then(() => { return setText('.status .alien-registration-number input', '123456789') })
    .then(() => { return setText('.status .certificate-number input', '987654321') })
    .then(() => { return setText('.status .certificate-court-name input', 'Immigration Court Name') })
    .then(() => { return setDomesticAddress('.status .certificate-court-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setTextWithPause('.status .datecontrol.certificate-issued .month input', '2') })
    .then(() => { return setText('.status .datecontrol.certificate-issued .day input', '2') })
    .then(() => { return setText('.status .datecontrol.certificate-issued .year input', '1990') })
    .then(() => { return setText('.status .certificate-name .field .first input', 'CertFirst') })
    .then(() => { return setText('.status .certificate-name .field .middle input', 'CertMiddle') })
    .then(() => { return setText('.status .certificate-name .field .last input', 'CertLast') })
    .then(() => { return setOption('.status .blocks.citizenship-basis .citizenship-basis-other.block label') })
    .then(() => { return setText('.status .with-comments .comments textarea', 'This is a test explanation') })
}

const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const setDomesticAddress = (selector, street, city, state, zipcode) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .street input', street)
    .setValue(selector + ' .city input', city)
    .setValue(selector + ' .state input', state)
    .setValue(selector + ' .zipcode input', zipcode)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-address.png')
}

const setDomesticTelephone = (selector, first, second, third) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' input[name="domestic_first"]', first)
    .setValue(selector + ' input[name="domestic_second"]', second)
    .setValue(selector + ' input[name="domestic_third"]', third)
    .click(selector + ' .phonetype-option.cell')
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-telephone.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-text.png')
}

const setTextWithPause = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .pause(5000)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-text.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-date.png')
}
