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

  When(/^I click Next to go to identification (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
  })

  When(/^I navigate to the identification (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'identification'
    const sectionTitle = 'Information about you'
    navigateToSection(sectionTitle)
    return navigateToSubsection(section, subsection)
  })

  When(/^I fill in the identification (.*?) section$/, (subsection) => {
    subcontext = subsection
    switch (subsection) {
    case 'name':
      return completeFullName(client)
    case 'othernames':
      return completeOtherNamesUsed(client)
    case 'contacts':
      return completeContacts(client)
    case 'birthdate':
      return completeBirthDate(client)
    case 'birthplace':
      return completeBirthPlace(client)
    case 'ssn':
      return completeSocialSecurityNumber(client)
    case 'physical':
      return completePhysicalAttributes(client)
    default:
      return client
    }
  })

  Then(/^I should be in the identification (.*?) section$/, (subsection) => {
    subcontext = subsection
    return shouldBeInSubsection('identification', subsection)
  })
})

const completeFullName = (promise) => {
  return promise
      .then(() => { return setName('.name', 'Charles', 'Francis', 'Xavier') })
}

const completeOtherNamesUsed = (promise) => {
  return promise
      .then(() => { return setOption('.other-names .branch .yes') })
      .then(() => { return setName('.name', 'Chuck', 'Frank', 'Xavier') })
      .then(() => { return setOption('.maiden-name .no.block') })
      .then(() => { return setText('.datecontrol.from .month input', '1') })
      .then(() => { return setText('.datecontrol.from .day input', '1') })
      .then(() => { return setText('.datecontrol.from .year input', '2010') })
      .then(() => { return setText('.datecontrol.to .month input', '1') })
      .then(() => { return setText('.datecontrol.to .day input', '1') })
      .then(() => { return setText('.datecontrol.to .year input', '2011') })
      .then(() => { return setText('textarea[name="Reason"]', 'Just a nickname I go by') })
      .then(() => { return setOption('.other-names .branch.addendum .no')})
}

const completeContacts = (promise) => {
  return promise
      // .then(() => { return click('.contact .email-collection .accordion .item .toggle.fa.fa-chevron-down') })
      .then(() => { return setText('input[name="Email"]', 'professor@xmen.org')})
      // .then(() => { return scrollToItem('.telephone-collection .items .summary-container .summary .button-with-icon') })
      // .then(() => { return click('.contact .telephone-collection .items .summary-container .summary .button-with-icon') })
      .then(() => { return scrollToItem('input[name="domestic_first"]') })
      .then(() => { return setText('input[name="domestic_first"]', '202') })
      .then(() => { return setText('input[name="domestic_second"]', '867') })
      .then(() => { return setText('input[name="domestic_third"]', '5309') })
      .then(() => { return setOption('.timeofday .day label') })
      .then(() => { return setOption('.phonetype .work label') })
}

const completeBirthDate = (promise) => {
  return promise
      .then(() => { return setText('input[name="month"]', '11')})
      .then(() => { return setText('input[name="day"]', '10') })
      .then(() => { return setText('input[name="year"]', '1990') })
}

const completeBirthPlace = (promise) => {
  return promise
      .then(() => { return setOption('.applicant-birthplace .branch .yes.block') })
      .then(() => { return setText('input[name="state"]', 'New York') })
      .then(() => { return setText('input[name="city"]', 'New York City') })
      .then(() => { return setText('input[name="county"]', 'Manhattan') })
}

const completeSocialSecurityNumber = (promise) => {
  return promise
      .then(() => { return setText('.applicant-ssn-initial input[name="first"]', '123') })
      .then(() => { return setText('.applicant-ssn-initial input[name="middle"]', '12') })
      .then(() => { return setText('.applicant-ssn-initial input[name="last"]', '1234') })
      .then(() => { return setText('.applicant-ssn-verification input[name="first"]', '123') })
      .then(() => { return setText('.applicant-ssn-verification input[name="middle"]', '12') })
      .then(() => { return setText('.applicant-ssn-verification input[name="last"]', '1234') })
}

const completePhysicalAttributes = (promise) => {
  return promise
      .then(() => { return setText('input[name="feet"]', '6') })
      .then(() => { return setText('input[name="inches"]', '0') })
      .then(() => { return setText('input[name="pounds"]', '190') })
      .then(() => { return setOption('.hair-colors .bald.block.extended label') })
      .then(() => { return setOption('.eye-colors .black.block.extended label') })
      .then(() => { return setOption('.sex .male label') })
}

const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
  //  .saveScreenshot('./screenshots/Identification/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(500)
  //  .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(500)
  //  .saveScreenshot('./screenshots/Identification/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const click = (selector) => {
  return client
    .click(selector)
    .pause(500)
    //.saveScreenshot('./screenshots/Identification/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
    //.saveScreenshot('./screenshots/Identification/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    //.saveScreenshot('./screenshots/Identification/' + filenum() + '-set-text.png')
}

const setName = (selector, first, middle, last) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .first input', first)
    .setValue(selector + ' .middle input', middle)
    .setValue(selector + ' .last input', last)
    //.saveScreenshot('./screenshots/Identification/' + filenum() + '-set-name.png')
}

const scrollToItem = (selector) => {
  return client.getLocationInView(selector)
  //.saveScreenshot('./screenshots/Identification/' + filenum() + '-scrolltoview.png')
}
