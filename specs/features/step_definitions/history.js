const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let subcontext = ""
let range = 10
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
  When(/^I click Next to go to history (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
  })

  When(/^I navigate to the history (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'history'
    const sectionTitle = 'Your history'
    navigateToSection(sectionTitle)
    return navigateToSubsection(section, subsection)
  })

  When(/^I fill in the history (.*?) section$/, (subsection) => {
    switch (subsection) {
    case 'residence':
      return completeResidence(client)
    case 'employment':
      return completeEmployment(client)
    case 'education':
      return completeEducation(client)
    case 'federal':
      return completeFederal(client)
    default:
      return client
    }
  })

  Then(/^I should be in the history (.*?) section$/, (subsection) => {
    subcontext = subsection
    return shouldBeInSubsection('history', subsection)
  })
})

const completeResidence = (promise) => {
  return promise
    .then(() => { return setDomesticAddress('.residence .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return checkValue('.history .stats .fraction .completed', '0') })
    .then(() => { return setText('.residence .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.residence .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.residence .daterange .datecontrol.from .year input', getCurrentYear()-range) })
    .then(() => { return setOption('.residence .daterange .from-present .block label') })
    .then(() => { return setOption('.residence .role.option-list .block label') })
    .then(() => { return setText('.residence .reference .first input', 'John') })
    .then(() => { return setText('.residence .reference .middle input', 'Quincy') })
    .then(() => { return setText('.residence .reference .last input', 'Public') })
    .then(() => { return setText('.residence .component .datecontrol.reference-last-contact .usa-form-group.month input', '1') })
    .then(() => { return setText('.residence .component .datecontrol.reference-last-contact .usa-form-group.day input', '1') })
    .then(() => { return setText('.residence .component .datecontrol.reference-last-contact .usa-form-group.year input', getCurrentYear()-range) })
    .then(() => { return setOption('.residence .relationship .block label') })
    .then(() => { return setDomesticTelephone('.residence .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setOption('.residence .telephone.reference-phone-day .nonumber.block') })
    .then(() => { return setOption('.residence .telephone.reference-phone-mobile .nonumber.block') })
    .then(() => { return setText('.residence .reference-email input', 'test@test.com') })
    .then(() => { return setDomesticAddress('.residence .reference-address .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOptionWithPause('.residence .branch.addendum .no.block') })
    .then(() => { return checkValue('.history .stats .fraction .completed', range) })
}

const completeEmployment = (promise) => {
  return promise
    .then(() => { return setOption('.employment .employment-activity-nongovernment.block label') })
    .then(() => { return setText('.employment .field .text.employment input', 'Test Employer') })
    .then(() => { return setText('.employment .field .text.employment-title input', 'Lead Tester') })
    .then(() => { return setOption('.employment .employment-status.option-list .block label') })
    .then(() => { return setText('.employment .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.employment .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.employment .daterange .datecontrol.from .year input', getCurrentYear()-range) })
    .then(() => { return setOption('.employment .daterange .from-present .block label') })
    .then(() => { return setDomesticAddress('.employment .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDomesticTelephone('.employment .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setOption('.employment .physical-address .option-list .no.block') })
    .then(() => { return setText('.employment .supervisor .field input', 'Test Supervisor') })
    .then(() => { return setText('.employment .supervisor .field .supervisor-title input', 'Lead Supervisor') })
    .then(() => { return setText('.employment .supervisor .field .supervisor-email input', 'supervisor@test.com') })
    .then(() => { return setDomesticAddress('.employment .supervisor-address .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDomesticTelephone('.employment .telephone.supervisor-telephone', '703', '333', '4444', 'Cell') })
    .then(() => { return setOption('.employment .activity .field .no.block label') })
    .then(() => { return setOption('.employment .reason-leaving .reason-options .branch .option-list .yes.block') })
    .then(() => { return setOption('.employment .reason-leaving .reason-options .employment-left .block') })
    .then(() => { return setText('.employment .reason-leaving .explanation-left textarea', 'Reason for leaving text 1') })
    .then(() => { return setText('.employment .reason-leaving .date-left .datecontrol .month input', '1') })
    .then(() => { return setText('.employment .reason-leaving .date-left .datecontrol .day input', '1') })
    .then(() => { return setText('.employment .reason-leaving .date-left .datecontrol .year input', getCurrentYear()) })
    .then(() => { return setOption('.employment .reason-leaving .reason-options .branch .no.block') })
    .then(() => { return setOption('.employment .reason-leaving .field .yes.block label') })
    .then(() => { return setOption('.employment .reason-leaving .employment-left.option-list .block label') })
    .then(() => { return setText('.employment .reason-leaving .explanation-left textarea', 'Reason for leaving text 2') })
    .then(() => { return setText('.employment .date-left .datecontrol .month input', '1') })
    .then(() => { return setText('.employment .date-left .datecontrol .day input', '1') })
    .then(() => { return setText('.employment .date-left .datecontrol .year input', getCurrentYear()) })
    .then(() => { return setOptionIndex('.employment .reason-leaving .reason-options .no.block label', 1) })
    .then(() => { return setOption('.employment .reprimand-branch .branch .option-list .yes.block') })
    .then(() => { return setText('.employment .reprimand-branch .explanation-left textarea', 'Reason for reprimand text') })
    .then(() => { return setText('.employment .reprimand-branch .date-left .datecontrol .month input', '1') })
    .then(() => { return setText('.employment .reprimand-branch .date-left .datecontrol .year input', getCurrentYear()) })
    .then(() => { return checkValue('.history .stats .fraction .completed', range) })
}

const completeEducation = (promise) => {
  return promise
    .then(() => { return setOption('.history .section-view .field.branch .yes.block label') })
    .then(() => { return setText('.education .school-name input', 'My School') })
    .then(() => { return setText('.education .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.education .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.education .daterange .datecontrol.from .year input', getCurrentYear()-range) })
    .then(() => { return setText('.education .daterange .datecontrol.to .month input', '1') })
    .then(() => { return setText('.education .daterange .datecontrol.to .day input', '1') })
    .then(() => { return setText('.education .daterange .datecontrol.to .year input', getCurrentYear()) })
    .then(() => { return checkValue('.history .summary-counter.education .schools', '1') })
    .then(() => { return setDomesticAddress('.education .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOption('.education .option-list .type-college.block label') })
    .then(() => { return setText('.education .reference .first input', 'John') })
    .then(() => { return setText('.education .reference .middle input', 'Quincy') })
    .then(() => { return setText('.education .reference .last input', 'Public') })
    .then(() => { return setText('.education .datecontrol.reference-last-contact .month input', '1') })
    .then(() => { return setText('.education .datecontrol.reference-last-contact .day input', '1') })
    .then(() => { return setText('.education .datecontrol.reference-last-contact .year input', getCurrentYear()-range) })
    .then(() => { return setOption('.education .relationship .reference-relationship-neighbor.block label') })
    .then(() => { return setDomesticTelephone('.education .telephone.reference-phone', '703', '555', '6666', 'Cell') })
    .then(() => { return setText('.education .email.reference-email input', 'test@test.com') })
    .then(() => { return setDomesticAddress('.education .location.reference-address .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOption('.education .receive-degree .field.branch .yes.block label') })
    .then(() => { return setOption('.education .diploma.option-list .diploma-bachelor.block label') })
    .then(() => { return setText('.education .datecontrol.date-awarded .month input', '1') })
    .then(() => { return setText('.education .datecontrol.date-awarded .year input', "2016") })
    .then(() => { return checkValue('.history .summary-counter.education .diplomas', '1') })
}

const completeFederal = (promise) => {
  return promise
    .then(() => { return setOption('.federal .field.branch .option-list.branch .yes.block label') })
    .then(() => { return setText('.federal .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.federal .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.federal .daterange .datecontrol.from .year input', getCurrentYear()-range) })
    .then(() => { return setText('.federal .daterange .datecontrol.to .month input', '1') })
    .then(() => { return setText('.federal .daterange .datecontrol.to .day input', '1') })
    .then(() => { return setText('.federal .daterange .datecontrol.to .year input', getCurrentYear()) })
    .then(() => { return setText('.federal .field.federal-agency input', 'General Services Administration') })
    .then(() => { return setText('.federal .field.federal-position input', 'Usability Test Engineer') })
    .then(() => { return setDomesticAddress('.federal .federal-agency-address .address', '1800 F ST NW', 'Washington', 'DC', '20006') })
}

const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
    .saveScreenshot('./screenshots/History/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const setDomesticAddress = (selector, street, city, state, zipcode) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .mailing input', street)
    .setValue(selector + ' .city input', city)
    .setValue(selector + ' .state input', state)
    .setValue(selector + ' .zipcode input', zipcode)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-address.png')
}

const setDomesticTelephone = (selector, first, second, third) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' input[name="domestic_first"]', first)
    .setValue(selector + ' input[name="domestic_second"]', second)
    .setValue(selector + ' input[name="domestic_third"]', third)
    .click(selector + ' .phonetype-option.cell label')
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-telephone.png')
}

const tab = (selector) => {
  return client
    .assert.visible(selector)
    .sendKeys(selector, client.Keys.TAB)
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-option.png')
}

const setOptionIndex = (selector, idx) => {
  element = client.elements('css selector', selector)[idx]
  return client
    .assert.visible(element)
    .click(element)
    .pause(500)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-option.png')
}

const setOptionWithPause = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(2000)
    .click(selector)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-text.png')
}

const click = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
    .saveScreenshot('./screenshots/History/' + filenum() + '-click.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-date.png')
}

const setCountry = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, [text, client.Keys.ENTER])
    .saveScreenshot('./screenshots/History/' + filenum() + '-set-country.png')
}

const checkValue = (selector, value) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .assert.containsText(selector, value)
    .saveScreenshot('./screenshots/History/' + filenum() + '-check-value.png')
}

const getCurrentYear = () => {
  return new Date().getFullYear();
}
