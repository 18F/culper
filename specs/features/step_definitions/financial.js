const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

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

defineSupportCode(({Given, Then, When}) => {
  When(/^I go to the financial section$/, () => {
    return navigateToSection('financial')
  })

  When(/^I go to the financial (.*?) section$/, (subsection) => {
    const section = 'financial'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the financial (.*?) section$/, (subsection) => {
    const section = 'financial'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'bankruptcy':
      return completeBankruptcy(promise)
    case 'gambling':
      return completeGambling(promise)
    case 'taxes':
      return completeTaxes(promise)
    case 'card':
      return promise
    case 'credit':
      return promise
    case 'delinquent':
      return promise
    case 'nonpayment':
      return promise
    default:
      return promise
    }
  })

  Then(/^I should be in the financial (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('financial', subsection)
  })
})

const completeBankruptcy = (promise) => {
  return promise
    .then(() => { return setOption('.bankruptcies .branch.bankruptcy-branch .yes') })
    .then(() => { return setOption('.petition-chapters label') })
    .then(() => { return setText('input[name="CourtNumber"]', '1234567890') })
    .then(() => { return setText('.datecontrol.datefiled .month input', '1') })
    .then(() => { return setText('.datecontrol.datefiled .year input', '2001') })
    .then(() => { return setText('.datecontrol.datedischarged .month input', '1') })
    .then(() => { return setText('.datecontrol.datedischarged .year input', '2001') })
    .then(() => { return setText('input[name="TotalAmount"]', '1000000') })
    .then(() => { return setText('.namedebt .first input', 'Bruce') })
    .then(() => { return setText('.namedebt .middle input', 'F') })
    .then(() => { return setText('.namedebt .last input', 'Wayne') })
    .then(() => { return setText('input[name="CourtInvolved"]', 'Hall of Justice') })
    .then(() => { return setText('.address .fields .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.address .fields .city input', 'Metropolis') })
    .then(() => { return setText('.address .fields .state input', 'NY') })
    .then(() => { return setText('.address .fields .zipcode input', '85010') })
    .then(() => { return tab('.address .fields .zipcode input') })
    .then(() => { return client.pause(3000) })
    .then(() => { return click('.dismiss a') })
    .then(() => { return setOption('.has-discharge-explanation .branch .yes') })
    .then(() => { return setText('.discharge-explanation textarea', 'This is a test explanation') })
}

const completeGambling = (promise) => {
  return promise
    .then(() => { return setOption('.gambling .blocks.branch .yes') })
    .then(() => { return setText('.daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.daterange .datecontrol.from .year input', '2001') })
    .then(() => { return setText('.daterange .datecontrol.to .month input', '1') })
    .then(() => { return setText('.daterange .datecontrol.to .day input', '1') })
    .then(() => { return setText('.daterange .datecontrol.to .year input', '2002') })
    .then(() => { return setText('input[name="Losses"]', '1000000') })
    .then(() => { return setText('.content .description textarea', 'This is a test description') })
    .then(() => { return setText('.content .actions textarea', 'This is a test action') })
}

const completeTaxes = (promise) => {
  return promise
    .then(() => { return setOption('.taxes .taxes-branch .yes') })
    .then(() => { return setOption('.failure-file label') })
    .then(() => { return setText('input[name="Year"]', '2001') })
    .then(() => { return setText('.content .taxes-reason textarea', 'This is a test reason') })
    .then(() => { return setText('input[name="Agency"]', 'Offended Agency') })
    .then(() => { return setText('input[name="TaxType"]', 'Type of tax that was not paid') })
    .then(() => { return setText('input[name="Amount"]', '1000000') })
    .then(() => { return setText('.datecontrol.taxes-date .month input', '1') })
    .then(() => { return setText('.datecontrol.taxes-date .year input', '2001') })
    .then(() => { return setText('.content .taxes-description textarea', 'This is a test descriptions of actions taken') })
}

const navigateToSection = (section) => {
  const selector = '.section a[href="#/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="#/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-navigate-next.png')
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
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-set-text.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-set-date.png')
}

const setDomesticAddress = (selector, street, city, state, zipcode) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .mailing input', street)
    .setValue(selector + ' .city input', city)
    .setValue(selector + ' .state input', state)
    .setValue(selector + ' .zipcode input', zipcode)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-set-address.png')
}

const tab = (selector) => {
  return client
    .assert.visible(selector)
    .sendKeys(selector, client.Keys.TAB)
}
