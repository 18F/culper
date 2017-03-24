const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let counter = 0

defineSupportCode(({Given, Then, When}) => {
  When(/^I go to the family section$/, () => {
    return navigateToSection('family')
  })

  When(/^I go to the family (.*?) section$/, (subsection) => {
    const section = 'family'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the family (.*?) section$/, (subsection) => {
    const section = 'family'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'relatives':
      return completeRelatives(promise)
    default:
      return promise
    }
  })

  Then(/^I should be in the family (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('family', subsection)
  })
})

const completeRelatives = (promise) => {
  return promise
    .then(() => { return setOption('.relation-father label') })
    .then(() => { return setText('.relative-name .first input', 'Charles') })
    .then(() => { return setText('.relative-name .middle input', 'F') })
    .then(() => { return setText('.relative-name .last input', 'Xavier') })
    .then(() => { return setText('.relative-birthdate .month input', '1') })
    .then(() => { return setText('.relative-birthdate .day input', '1') })
    .then(() => { return setText('.relative-birthdate .year input', '2001') })
    .then(() => { return setOption('.relative-birthplace .international label') })
    .then(() => { return setText('.relative-birthplace .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.relative-birthplace .city input', 'Frankfurt') })
    .then(() => { return setText('.relative-birthplace .country input#country', 'Germany') })
    .then(() => { return client.pause(3000) })
    .then(() => { return click('.dismiss a') })
    .then(() => { return tab('.relative-birthplace .country input#country') })
    .then(() => { return setText('.relative-citizenship input', 'United States') })
    .then(() => { return tab('.relative-citizenship input') })
    .then(() => { return click('.relative-alias .yes label') })
    .then(() => { return setText('.alias-name .first input', 'Professor') })
    .then(() => { return setText('.alias-name .last input', 'X') })
    .then(() => { return setOption('.alias-maiden .yes label') })
    .then(() => { return setText('.alias-dates .datecontrol.from .month input', '1') })
    .then(() => { return setText('.alias-dates .datecontrol.from .day input', '1') })
    .then(() => { return setText('.alias-dates .datecontrol.from .year input', '2001') })
    .then(() => { return setText('.alias-dates .datecontrol.to .month input', '1') })
    .then(() => { return setText('.alias-dates .datecontrol.to .day input', '1') })
    .then(() => { return setText('.alias-dates .datecontrol.to .year input', '2005') })
    .then(() => { return setOption('.relative-deceased .no label') })
    .then(() => { return setOption('.relative-address .international label') })
    .then(() => { return setText('.relative-address .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.relative-address .city input', 'Frankfurt') })
    .then(() => { return setText('.relative-address .country input#country', 'Germany') })
    .then(() => { return client.pause(3000) })
    .then(() => { return click('.dismiss a') })
    .then(() => { return tab('.relative-address .country input') })
    .then(() => { return setOption('.relative-abroad .abroad-fs label') })
    .then(() => { return setOption('.relative-naturalized .naturalized-alien label') })
    .then(() => { return setOption('.relative-derived .derived-alien label') })
    .then(() => { return setText('.relative-documentnumber input', '1234567890') })
    .then(() => { return setText('.relative-courtname input', 'The court') })
    .then(() => { return setText('.relative-courtaddress .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.relative-courtaddress .city input', 'Phoenix') })
    .then(() => { return setText('.relative-courtaddress .state input', 'AZ') })
    .then(() => { return setText('.relative-courtaddress .zipcode input', '85010') })
    .then(() => { return tab('.relative-courtaddress .zipcode input') })
    .then(() => { return client.pause(3000) })
    .then(() => { return click('.dismiss a') })
}

const filenum = () => {
  const size = 4
  const num = counter++

  let s = '' + num
  while (s.length < size) {
    s = '0' + s
  }

  return s
}

const navigateToSection = (section) => {
  const selector = '.section a[href="#/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Family/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="#/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Family/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Family/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const click = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Family/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Family/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Family/' + filenum() + '-set-text.png')
}

const tab = (selector) => {
  return client
    .assert.visible(selector)
    .sendKeys(selector, client.Keys.TAB)
}
