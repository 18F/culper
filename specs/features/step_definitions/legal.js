const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let counter = 0

defineSupportCode(({Given, Then, When}) => {
  When(/^I go to the legal section$/, () => {
    return navigateToSection('legal')
  })

  When(/^I go to the legal (.*?) section$/, (subsection) => {
    const section = 'legal'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the legal (.*?) section$/, (subsection) => {
    const section = 'legal'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'police':
      return completePoliceRecord(promise)
    default:
      return promise
    }
  })

  Then(/^I should be in the legal (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('legal', subsection)
  })
})

const completePoliceRecord = (promise) => {
  return promise
    .then(() => { return setOption('.police .branch.summons .no') })
    .then(() => { return setOption('.police .branch.arrests .no') })
    .then(() => { return setOption('.police .branch.charges .no') })
    .then(() => { return setOption('.police .branch.probation .no') })
    .then(() => { return setOption('.police .branch.trial .yes') })
    .then(() => { return click('.accordion .item a.toggle') })
    .then(() => { return setText('.offense-date .month input', '1') })
    .then(() => { return setText('.offense-date .day input', '1') })
    .then(() => { return setText('.offense-date .year input', '2001') })
    .then(() => { return setText('.offense-description textarea', 'Loitering') })
    .then(() => { return setOption('.offense .branch.offense-violence .no') })
    .then(() => { return setOption('.offense .branch.offense-firearms .no') })
    .then(() => { return setOption('.offense .branch.offense-substances .yes') })
    .then(() => { return setText('.offense-address .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.offense-address .city input', 'Phoenix') })
    .then(() => { return setText('.offense-address .state input', 'AZ') })
    .then(() => { return setText('.offense-address .zipcode input', '85010') })
    .then(() => { return setOption('.offense .branch.offense-cited .yes') })
    .then(() => { return setText('.offense-citedby input', 'Police') })
    .then(() => { return setText('.offense-agencyaddress .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.offense-agencyaddress .city input', 'Phoenix') })
    .then(() => { return setText('.offense-agencyaddress .state input', 'AZ') })
    .then(() => { return setText('.offense-agencyaddress .zipcode input', '85010') })
    .then(() => { return setOption('.offense .branch.offense-charged .yes') })
    .then(() => { return setText('.offense-courtname input', 'Grand court') })
    .then(() => { return setText('.offense-courtaddress .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.offense-courtaddress .city input', 'Phoenix') })
    .then(() => { return setText('.offense-courtaddress .state input', 'AZ') })
    .then(() => { return setText('.offense-courtaddress .zipcode input', '85010') })
    .then(() => { return setOption('.offense-courttype .charge-misdemeanor label') })
    .then(() => { return setText('.offense-courtcharge input', 'Loitering') })
    .then(() => { return setText('.offense-courtoutcome input', 'Guilty') })
    .then(() => { return setText('.offense-courtdate .month input', '2') })
    .then(() => { return setText('.offense-courtdate .year input', '2001') })
    .then(() => { return setOption('.offense .branch.offense-sentenced .yes') })
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
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="#/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-navigate-next.png')
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
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-set-text.png')
}
