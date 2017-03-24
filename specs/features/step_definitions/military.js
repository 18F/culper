const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let counter = 0

defineSupportCode(({Given, Then, When}) => {
  When(/^I go to the military section$/, () => {
    return navigateToSection('military')
  })

  When(/^I go to the military (.*?) section$/, (subsection) => {
    const section = 'military'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the military (.*?) section$/, (subsection) => {
    const section = 'military'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'selective':
      return completeSelectiveService(promise)
    case 'history':
      return completeMilitaryHistory(promise)
    case 'disciplinary':
      return completeDisciplinaryProcedures(promise)
    case 'foreign':
      return completeForeignMilitary(promise)
    default:
      return promise
    }
  })

  Then(/^I should be in the military (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('military', subsection)
  })
})

const completeSelectiveService = (promise) => {
  return promise
    .then(() => { return setOption('.selective .branch.born .yes') })
    .then(() => { return setOption('.selective .branch.registered .yes') })
    .then(() => { return setText('input[name="RegistrationNumber"]', '1234567890') })
}

const completeMilitaryHistory = (promise) => {
  return promise
    .then(() => { return setOption('.history .branch .yes') })
    .then(() => { return click('.accordion .item a.toggle') })
    .then(() => { return setOption('.service-marinecorps label') })
    .then(() => { return setOption('.officer-enlisted label') })
    .then(() => { return setText('.dates .datecontrol.from .month input', '1') })
    .then(() => { return setText('.dates .datecontrol.from .day input', '1') })
    .then(() => { return setText('.dates .datecontrol.from .year input', '2001') })
    .then(() => { return setText('.dates .datecontrol.to .month input', '1') })
    .then(() => { return setText('.dates .datecontrol.to .day input', '1') })
    .then(() => { return setText('.dates .datecontrol.to .year input', '2005') })
    .then(() => { return setOption('.discharged .branch .yes') })
    .then(() => { return setOption('.discharge-type-honorable label') })
    .then(() => { return setText('.discharge-date .month input', '1') })
    .then(() => { return setText('.discharge-date .year input', '2005') })
}

const completeDisciplinaryProcedures = (promise) => {
  return promise
    .then(() => { return setOption('.branch .yes') })
    .then(() => { return click('.accordion .item a.toggle') })
    .then(() => { return setText('.procedure-date .month input', '1') })
    .then(() => { return setText('.procedure-date .year input', '2005') })
    .then(() => { return setText('.procedure-offenses textarea', 'Loitering') })
    .then(() => { return setText('.procedure-name input', 'Article 42') })
    .then(() => { return setText('.procedure-court textarea', 'Congo') })
    .then(() => { return setText('.procedure-outcome input', 'Reduction in rank') })
}

const completeForeignMilitary = (promise) => {
  return promise
    .then(() => { return setOption('.branch .yes') })
    .then(() => { return setOption('.organization-military label') })
    .then(() => { return setText('.foreign-service-name input', 'Army') })
    .then(() => { return setText('.foreign-service-dates .datecontrol.from .month input', '1') })
    .then(() => { return setText('.foreign-service-dates .datecontrol.from .day input', '1') })
    .then(() => { return setText('.foreign-service-dates .datecontrol.from .year input', '2001') })
    .then(() => { return setText('.foreign-service-dates .datecontrol.to .month input', '1') })
    .then(() => { return setText('.foreign-service-dates .datecontrol.to .day input', '1') })
    .then(() => { return setText('.foreign-service-dates .datecontrol.to .year input', '2005') })
    .then(() => { return setText('.foreign-service-country input', 'Germany') })
    .then(() => { return setText('.foreign-service-rank input', 'Captain') })
    .then(() => { return setText('.foreign-service-division input', 'Luftwaffe') })
    .then(() => { return setText('.foreign-service-circumstances textarea', 'Mandatory service') })
    .then(() => { return setText('.foreign-service-left textarea', 'Moved') })
    .then(() => { return setOption('.branch.maintainscontact .yes') })
    .then(() => { return click('.foreign-service .foreign-contacts-collection .item a.toggle') })
    .then(() => { return setText('.foreign-contact .first input', 'Foo') })
    .then(() => { return setText('.foreign-contact .middle input', 'J') })
    .then(() => { return setText('.foreign-contact .last input', 'Bar') })
    .then(() => { return setOption('.foreign-contact-address .international label') })
    .then(() => { return setText('.foreign-contact-address .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.foreign-contact-address .city input', 'Munich') })
    .then(() => { return setText('.foreign-contact-address .country input', 'Germany') })
    .then(() => { return setText('.foreign-contact-title input', 'Mr.') })
    .then(() => { return setText('.foreign-contact-dates .datecontrol.from .month input', '1') })
    .then(() => { return setText('.foreign-contact-dates .datecontrol.from .day input', '1') })
    .then(() => { return setText('.foreign-contact-dates .datecontrol.from .year input', '2001') })
    .then(() => { return setText('.foreign-contact-dates .datecontrol.to .month input', '1') })
    .then(() => { return setText('.foreign-contact-dates .datecontrol.to .day input', '1') })
    .then(() => { return setText('.foreign-contact-dates .datecontrol.to .year input', '2005') })
    .then(() => { return setText('.foreign-contact-frequency input', 'Monthly') })
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
    .saveScreenshot('./screenshots/Military/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="#/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Military/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Military/' + filenum() + '-navigate-next.png')
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
    .saveScreenshot('./screenshots/Military/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Military/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Military/' + filenum() + '-set-text.png')
}
