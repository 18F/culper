const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

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
    return navigateToSubsection('foreign', subsection)
  })

  When(/^I click next$/, () => {
    return navigateToNext()
  })

  Then(/^I should be in the foreign (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('foreign', subsection)
  })
})

const navigateToSection = (section) => {
  return client
    .useXpath()
    .click('//a[@href="#/form/' + section + '"]')
    .useCss()
    .pause(3000)
}

const navigateToSubsection = (section, subsection) => {
  return client
    .useXpath()
    .click('//a[@href="#/form/' + section + '/' + subsection + '"]')
    .useCss()
    .pause(3000)
}

const navigateToNext = () => {
  return client
    .click('button.next')
    .pause(3000)
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}
