const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let counter = 0

defineSupportCode(({Given, Then, When}) => {
  When(/^I go to the identification section$/, () => {
    return navigateToSection('identification')
  })

  When(/^I go to the identification (.*?) section$/, (subsection) => {
    const section = 'identification'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the identification (.*?) section$/, (subsection) => {
    const section = 'identification'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'name':
      return completeFullName(promise)
    case 'othernames':
      return completeOtherNamesUsed(promise)
    case 'birthdate':
      return completeBirthDate(promise)
    case 'birthplace':
      return completeBirthPlace(promise)
    case 'contacts':
      return completeContacts(promise)
    case 'ssn':
      return completeSocialSecurityNumber(promise)
    case 'physical':
      return completePhysicalAttributes(promise)
    default:
      return promise
    }
  })

  Then(/^I should be in the identification (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('identification', subsection)
  })
})

const completeFullName = (promise) => {
  return promise
      .then(() => { return setText('input[name="first"]', 'Charles') })
      .then(() => { return setText('input[name="middle"]', 'F') })
      .then(() => { return setText('input[name="last"]', 'Xavier') })
}

const completeOtherNamesUsed = (promise) => {
  return promise
      .then(() => { return setOption('.other-names .branch .yes') })
      .then(() => { return click('.other-names .accordion .item a.toggle') })
      .then(() => { return setText('input[name="first"]', 'Professor') })
      .then(() => { return click('input[name="noMiddleName"]') })
      .then(() => { return setText('input[name="last"]', 'X') })
      .then(() => { return setOption('.maiden-name label') })
      .then(() => { return setText('.datecontrol.from .month input', '1') })
      .then(() => { return setText('.datecontrol.from .day input', '1') })
      .then(() => { return setText('.datecontrol.from .year input', '2010') })
      .then(() => { return setText('.datecontrol.to .month input', '1') })
      .then(() => { return setText('.datecontrol.to .day input', '1') })
      .then(() => { return setText('.datecontrol.to .year input', '2011') })
      .then(() => { return setText('textarea[name="Reason"]', 'Just a nickname I go by') })
}

const completeBirthDate = (promise) => {
  return promise
      .then(() => { return setText('input[name="month"]', '11') })
      .then(() => { return setText('input[name="day"]', '10') })
      .then(() => { return setText('input[name="year"]', '1775') })
}

const completeBirthPlace = (promise) => {
  return promise
      .then(() => { return setOption('.birthplace .branch .yes') })
      .then(() => { return setText('input[name="state"]', 'New York') })
      .then(() => { return setText('input[name="city"]', 'New York City') })
      .then(() => { return setText('input[name="county"]', 'Manhattan') })
}

const completeContacts = (promise) => {
  return promise
      .then(() => { return click('.contact .email-collection .item a.toggle') })
      .then(() => { return setText('input[name="Email"]', 'professor@xmen.org') })
      .then(() => { return click('.contact .telephone-collection .item a.toggle') })
      .then(() => { return setText('input[name="domestic_first"]', '202') })
      .then(() => { return setText('input[name="domestic_second"]', '867') })
      .then(() => { return setText('input[name="domestic_third"]', '5309') })
      .then(() => { return setOption('.timeofday .day label') })
      .then(() => { return setOption('.phonetype .work label') })
}

const completeSocialSecurityNumber = (promise) => {
  return promise
      .then(() => { return setText('input[name="first"]', '123') })
      .then(() => { return setText('input[name="middle"]', '45') })
      .then(() => { return setText('input[name="last"]', '6789') })
}

const completePhysicalAttributes = (promise) => {
  return promise
      .then(() => { return setText('input[name="feet"]', '6') })
      .then(() => { return setText('input[name="inches"]', '0') })
      .then(() => { return setText('input[name="pounds"]', '190') })
      .then(() => { return setOption('.hair-colors .bald.eapp-blocks-checkbox label') })
      .then(() => { return setOption('.eye-colors .brown.eapp-blocks-radio label') })
      .then(() => { return setOption('.sex .male label') })
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
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="#/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const click = (selector) => {
  return client
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-set-text.png')
}
