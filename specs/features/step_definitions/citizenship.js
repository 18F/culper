const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let subcontext = ""
let range = 7
let counter = 0

const filenum = () => {
  const size = 4
  const num = counter++

  let s = '' + num
  while (s.length < size) {
    s = '0' + s
  }

  return s + '-' + subcontext
}

defineSupportCode(({Given, Then, When}) => {
  When(/^I click Next to go to citizenship (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
  })

  When(/^I navigate to the citizenship (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'citizenship'
    navigateToSection(section)
    return navigateToSubsection(section, subsection)
  })

  When(/^I fill in the citizenship (.*?) section$/, (subsection) => {
    switch (subsection) {
      case 'status':
        return 'pending'
        //return completeCitizenshipStatus(client)
      case 'multiple':
        return 'pending'
        //return completeCitizenshipMultiple(client)
      case 'passports':
        return 'pending'
        //return completeCitizenshipForeignPassports(client)
      default:
        return client
    }
  })

  Then(/^I should be in the citizenship (.*?) section$/, (subsection) => {
    subcontext = subsection
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
    .then(() => { return setCountry('.status .country.prior-citizenship input', 'Canada') })
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
    .then(() => { return setText('.status .citizenship-basis-explanation textarea', 'This is a test explanation') })
}

const completeCitizenshipMultiple = (promise) => {
  return promise
    .then(() => { return setOption('.multiple .branch.has-multiple .blocks .yes.block label') })
    .then(() => { return setCountry('.multiple .country.citizenship-country input', 'Canada') })
    .then(() => { return setText('.multiple .daterange.citizenship-dates .datecontrol.from .month input', '1') })
    .then(() => { return setText('.multiple .daterange.citizenship-dates .datecontrol.from .day input', '1') })
    .then(() => { return setText('.multiple .daterange.citizenship-dates .datecontrol.from .year input', '1980') })
    .then(() => { return setText('.multiple .daterange.citizenship-dates .datecontrol.to .month input', '2') })
    .then(() => { return setText('.multiple .daterange.citizenship-dates .datecontrol.to .day input', '2') })
    .then(() => { return setText('.multiple .daterange.citizenship-dates .datecontrol.to .year input', '2000') })
    .then(() => { return setText('.multiple .citizenship-how textarea', 'Citizenship how explanation') })
    .then(() => { return setOption('.multiple .citizenship-renounced .blocks .yes.block label') })
    .then(() => { return setText('.multiple .citizenship-renounced-explanation textarea', 'Citizenship renounced explanation') })
    .then(() => { return setOption('.multiple .citizenship-current .blocks .yes.block label') })
    .then(() => { return setText('.multiple .citizenship-current-explanation textarea', 'Citizenship current explanation') })
    .then(() => { return setOption('.multiple .branch.addendum .blocks .no.block label') })
}

const completeCitizenshipForeignPassports = (promise) => {
  return promise
    .then(() => { return setOption('.passports .has-foreignpassport .blocks .yes.block label') })
    .then(() => { return setCountry('.passports .country.passport-country input', 'Canada') })
    .then(() => { return setText('.passports .datecontrol.passport-issued .month input', '2') })
    .then(() => { return setText('.passports .datecontrol.passport-issued .day input', '2') })
    .then(() => { return setText('.passports .datecontrol.passport-issued .year input', '1990') })
    .then(() => { return setText('.passports .location.passport-location .city input', 'Montreal') })
    .then(() => { return setText('.passports .location.passport-location .country input', 'Canada') })
    .then(() => { return setText('.passports .name.passport-name .field .first input', 'PassportFirst') })
    .then(() => { return setText('.passports .name.passport-name .field .middle input', 'PassportMiddle') })
    .then(() => { return setText('.passports .name.passport-name .field .last input', 'PassportLast') })
    .then(() => { return setText('.passports .passport-number input', '12345678') })
    .then(() => { return setText('.passports .datecontrol.passport-expiration .month input', '2') })
    .then(() => { return setText('.passports .datecontrol.passport-expiration .day input', '2') })
    .then(() => { return setText('.passports .datecontrol.passport-expiration .year input', '2000') })
    .then(() => { return setOption('.passports .branch.passport-used .blocks .yes.block label') })
    .then(() => { return setCountry('.passports .citizenship-item .country input', 'Ireland') })
    .then(() => { return setText('.passports .citizenship-item .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.passports .citizenship-item .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.passports .citizenship-item .daterange .datecontrol.from .year input', '1995') })
    .then(() => { return setText('.passports .citizenship-item .daterange .datecontrol.to .month input', '2') })
    .then(() => { return setText('.passports .citizenship-item .daterange .datecontrol.to .day input', '2') })
    .then(() => { return setText('.passports .citizenship-item .daterange .datecontrol.to .year input', '1995') })
}

const navigateToSection = (section) => {
  const selector = '.usa-sidenav-list a[aria-controls="/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.usa-sidenav-sub_list a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
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
    .pause(500)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-text.png')
}

const setCountry = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, [text, client.Keys.ENTER])
    .saveScreenshot('./screenshots/Citizenship/' + filenum() + '-set-country.png')
}

const setTextWithPause = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .pause(1000)
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
