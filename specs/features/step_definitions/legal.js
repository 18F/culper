const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let subcontext = ""
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
  When(/^I click Next to go to legal (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
    })

  When(/^I navigate to the legal (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'legal'
    const sectionTitle = 'Investigative and criminal history'
    navigateToSection(sectionTitle)
    return navigateToSubsection(section, subsection)
    })

  When(/^I fill in the legal (.*?) section$/, (subsection) => {
    switch (subsection) {
    case 'police':
      return completePoliceRecord(promise)
    case 'court':
      return completeCourt(promise)
    default:
      return promise
    }
  })

  When(/^I fill in the legal (.*?) section (.*?) subsection$/, (section, subsection) => {
    switch (subsection) {
    // "investigations" subsections
    case 'history':
      return completeInvestigationsHistory(promise)
    case 'revoked':
      return completeInvestigationsRevoked(promise)
    case 'debarred':
      return completeInvestigationsDebarred(promise)
    // "technology" subsections
    case 'unauthorized':
      return completeTechnologyUnauthorized(promise)
    case 'manipulating':
      return completeTechnologyManipulating(promise)
    case 'unlawful':
      return completeTechnologyUnlawful(promise)
    // "associations" subsections
    case 'terrorist-organization':
      return completeAssociationsTerroristOrganization(promise)
    case 'engaged-in-terrorism':
      return completeAssociationsEngagedInTerrorism(promise)
    case 'advocating':
      return completeAssociationsAdvocating(promise)
    case 'membership-overthrow':
      return completeAssociationsMembershipOverthrow(promise)
    case 'membership-violence-or-force':
      return completeAssociationsMembershipViolence(promise)
    case 'activities-to-overthrow':
      return completeAssociationsActivitiesToOverthrow(promise)
    case 'terrorism-association':
      return completeAssociationsTerrorism(promise)
    default:
      return promise
    }
  })

  Then(/^I should be in the legal (.*?) section$/, (subsection) => {
    subcontext = subsection
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

const completeTechnologyUnauthorized = (promise) => {
  return promise
    .then(() => { return setOption('.legal-technology-unauthorized-has-unauthorized .branch .yes') })
    .then(() => { return setDate('.legal-technology-unauthorized-date', '1', '1', '2010') })
    .then(() => { return setText('.legal-technology-unauthorized-incident textarea', 'This is a description of the incident') })
    .then(() => { return setDomesticAddress('.legal-technology-unauthorized-location', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.legal-technology-unauthorized-action textarea', 'This is the actions taken') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeTechnologyManipulating = (promise) => {
  return promise
    .then(() => { return setOption('.legal-technology-manipulating-has-manipulating .branch .yes') })
    .then(() => { return setDate('.legal-technology-manipulating-date', '1', '1', '2010') })
    .then(() => { return setText('.legal-technology-manipulating-incident textarea', 'This is a description of the incident') })
    .then(() => { return setDomesticAddress('.legal-technology-manipulating-location', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.legal-technology-manipulating-action textarea', 'This is the actions taken') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeTechnologyUnlawful = (promise) => {
  return promise
    .then(() => { return setOption('.legal-technology-unlawful-has-unlawful .branch .yes') })
    .then(() => { return setDate('.legal-technology-unlawful-date', '1', '1', '2010') })
    .then(() => { return setText('.legal-technology-unlawful-incident textarea', 'This is a description of the incident') })
    .then(() => { return setDomesticAddress('.legal-technology-unlawful-location', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.legal-technology-unlawful-action textarea', 'This is the actions taken') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeAssociationsTerroristOrganization = (promise) => {
  return promise
    .then(() => { return setOption('.legal-associations-terrorist-has-terrorist .branch .yes') })
    .then(() => { return setText('.legal-associations-terrorist-organization input', 'Donut brigade') })
    .then(() => { return setDomesticAddress('.legal-associations-terrorist-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDate('.legal-associations-terrorist-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.legal-associations-terrorist-dates .to', '1', '1', '2011') })
    .then(() => { return setText('.legal-associations-terrorist-positions input', 'Chef') })
    .then(() => { return setText('.legal-associations-terrorist-contributions input', '2 dollars') })
    .then(() => { return setText('.legal-associations-terrorist-reasons textarea', 'No reason') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeAssociationsEngagedInTerrorism = (promise) => {
  return promise
    .then(() => { return setOption('.legal-associations-engaged-has-engaged .branch .yes') })
    .then(() => { return setText('.legal-associations-engaged-reasons textarea', 'No reason') })
    .then(() => { return setDate('.legal-associations-engaged-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.legal-associations-engaged-dates .to', '1', '1', '2011') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeAssociationsAdvocating = (promise) => {
  return promise
    .then(() => { return setOption('.legal-associations-advocating-has-advocated .branch .yes') })
    .then(() => { return setText('.legal-associations-advocating-reasons textarea', 'No reason') })
    .then(() => { return setDate('.legal-associations-advocating-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.legal-associations-advocating-dates .to', '1', '1', '2011') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeAssociationsMembershipOverthrow = (promise) => {
  return promise
    .then(() => { return setOption('.legal-associations-overthrow-has-overthrow .branch .yes') })
    .then(() => { return setText('.legal-associations-overthrow-organization input', 'Donut brigade') })
    .then(() => { return setDomesticAddress('.legal-associations-overthrow-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDate('.legal-associations-overthrow-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.legal-associations-overthrow-dates .to', '1', '1', '2011') })
    .then(() => { return setText('.legal-associations-overthrow-positions input', 'Chef') })
    .then(() => { return setText('.legal-associations-overthrow-contributions input', '2 dollars') })
    .then(() => { return setText('.legal-associations-overthrow-reasons textarea', 'No reason') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeAssociationsMembershipViolence = (promise) => {
  return promise
    .then(() => { return setOption('.legal-associations-violence-has-violence .branch .yes') })
    .then(() => { return setText('.legal-associations-violence-organization input', 'Donut brigade') })
    .then(() => { return setDomesticAddress('.legal-associations-violence-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDate('.legal-associations-violence-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.legal-associations-violence-dates .to', '1', '1', '2011') })
    .then(() => { return setText('.legal-associations-violence-positions input', 'Chef') })
    .then(() => { return setText('.legal-associations-violence-contributions input', '2 dollars') })
    .then(() => { return setText('.legal-associations-violence-reasons textarea', 'No reason') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeAssociationsActivitiesToOverthrow = (promise) => {
  return promise
    .then(() => { return setOption('.legal-associations-activities-has-activities .branch .yes') })
    .then(() => { return setText('.legal-associations-activities-reasons textarea', 'No reason') })
    .then(() => { return setDate('.legal-associations-activities-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.legal-associations-activities-dates .to', '1', '1', '2011') })
    .then(() => { return setOption('.addendum .branch .no') })
}

const completeAssociationsTerrorism = (promise) => {
  return promise
    .then(() => { return setOption('.legal-associations-terrorism-has-terrorism .branch .yes') })
    .then(() => { return setText('.legal-associations-terrorism-explanation textarea', 'No explanation') })
}

const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-navigate-section.png')
}

const navigateToSectionTitle = (section) => {
  const selector = '.subsection a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-navigate-sectiontitle.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
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
    .pause(500)
    .saveScreenshot('./screenshots/Legal/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
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

const setDomesticAddress = (selector, street, city, state, zipcode) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .mailing input', street)
    .setValue(selector + ' .city input', city)
    .setValue(selector + ' .state input', state)
    .setValue(selector + ' .zipcode input', zipcode)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-address.png')
}
