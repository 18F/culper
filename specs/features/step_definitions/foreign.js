const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let counter = 0

defineSupportCode(({Given, Then, When}) => {
  When(/^I go to the foreign section$/, () => {
    return navigateToSection('foreign')
  })

  When(/^I go to the foreign (.*?) section$/, (subsection) => {
    const section = 'foreign'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the foreign (.*?) section$/, (subsection) => {
    const section = 'foreign'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
      .then(() => { return setOption('.passport .branch .yes') })
      .then(() => { return setText('input[name="first"]', 'Charles') })
      .then(() => { return setText('input[name="middle"]', 'F') })
      .then(() => { return setText('input[name="last"]', 'Xavier') })
      .then(() => { return setText('input[name="number"]', 'A12345678') })
      .then(() => { return setText('input[name="month"]', '11') })
      .then(() => { return setText('input[name="day"]', '10') })
      .then(() => { return setText('input[name="year"]', '1775') })
  })

  When(/^I click next$/, () => {
    return navigateToNext()
  })

  Then(/^I should be in the foreign (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('foreign', subsection)
  })
})

const navigateToSection = (section) => {
  const selector = '.section a[href="#/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + counter++ + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="#/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + counter++ + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + counter++ + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + counter++ + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Foreign/' + counter++ + '-set-text.png')
}
