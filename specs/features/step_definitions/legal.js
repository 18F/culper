const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

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
    case 'investigations/history':
      return completeInvestigationsHistory(promise)
    case 'investigations/revoked':
      return completeInvestigationsRevoked(promise)
    case 'investigations/debarred':
      return completeInvestigationsDebarred(promise)
    case 'court':
      return completeCourt(promise)
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

const completeInvestigationsHistory = (promise) => {
  return promise
    .then(() => { return setOption('.legal-investigations-history-has-history .branch .yes') })
    .then(() => { return setOption('.legal-investigations-history-agency .investigative-agency-dod') })
    .then(() => { return setDate('.legal-investigations-history-completed', '7', '10', '2001') })
    .then(() => { return setDate('.legal-investigations-history-granted', '9', '11', '2001') })
    .then(() => { return setOption('.legal-investigations-history-clearance .clearance-level-sci') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeInvestigationsRevoked = (promise) => {
  return promise
    .then(() => { return setOption('.legal-investigations-revoked-has-revocations .branch .yes') })
    .then(() => { return setDate('.legal-investigations-revoked-date', '1', '1', '2010') })
    .then(() => { return setText('.legal-investigations-revoked-agency input', 'DoD') })
    .then(() => { return setText('.legal-investigations-revoked-explanation textarea', 'This is the explanation') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeInvestigationsDebarred = (promise) => {
  return promise
    .then(() => { return setOption('.legal-investigations-debarred-has-debarment .branch .yes') })
    .then(() => { return setText('.legal-investigations-debarred-agency input', 'DoD') })
    .then(() => { return setDate('.legal-investigations-debarred-date', '1', '1', '2010') })
    .then(() => { return setText('.legal-investigations-debarred-explanation textarea', 'This is the explanation') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeCourt = (promise) => {
  return promise
    .then(() => { return setOption('.has-court-actions .branch .yes') })
    .then(() => { return setDate('.civil-action-date', '1', '1', '2010') })
    .then(() => { return setText('.court-name input', 'The Court of Courts') })
    // Address
    .then(() => { return setText('.court-address .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.court-address .city input', 'Arlington') })
    .then(() => { return setText('.court-address .state input', 'VA') })

    .then(() => { return setText('.nature-of-action textarea', 'The nature of the action') })
    .then(() => { return setText('.results-of-action textarea', 'The results of the action') })
    .then(() => { return setText('.principal-party-names textarea', 'John Doe and Jane Doe') })
}

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

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-set-date.png')
}
