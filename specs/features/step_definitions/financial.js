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
  When(/^I click Next to go to financial (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
  })

  When(/^I navigate to the financial (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'financial'
    const sectionTitle = 'Financial record'
    navigateToSection(sectionTitle)
    return navigateToSubsection(section, subsection)
  })

  When(/^I fill in the financial (.*?) section$/, (subsection) => {
    switch (subsection) {
    case 'bankruptcy':
      return completeBankruptcy(promise)
    case 'gambling':
      return completeGambling(promise)
    case 'taxes':
      return completeTaxes(promise)
    case 'card':
      return completeCard(promise)
    case 'credit':
      return completeCredit(promise)
    case 'delinquent':
      return completeDelinquent(promise)
    case 'nonpayment':
      return completeNonpayment(promise)
    default:
      return promise
    }
  })

  Then(/^I should be in the financial (.*?) section$/, (subsection) => {
    subcontext = subsection
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

const completeCard = (promise) => {
  return promise
    .then(() => { return setOption('.card-abuse .card-branch .yes') })
    .then(() => { return setText('.details .card-agency input', 'Card Abuse Agency') })
    .then(() => { return setText('.address.card-address .fields .mailing input', '1234 Some Rd') })
    .then(() => { return setText('.address.card-address .fields .city input', 'Metropolis') })
    .then(() => { return setText('.address.card-address .fields .state input', 'NY') })
    .then(() => { return setText('.address.card-address .fields .zipcode input', '85010') })
    .then(() => { return tab('.address.card-address .fields .zipcode input') })
    .then(() => { return client.pause(3000) })
    .then(() => { return click('.dismiss a') })
    .then(() => { return setText('.datecontrol.card-date .month input', '1') })
    .then(() => { return setText('.datecontrol.card-date .year input', '2001') })
    .then(() => { return setText('.content .card-reason textarea', 'This is a test reason') })
    .then(() => { return setText('input[name="Amount"]', '1000000') })
    .then(() => { return setText('.content .card-description textarea', 'This is a test description') })
}

const completeCredit = (promise) => {
  return promise
    .then(() => { return setOption('.credit-counseling .credit-branch .yes') })
    .then(() => { return setText('.credit-counseling .credit-explanation textarea', 'This is a test explanation') })
    .then(() => { return setText('input[name="Name"]', 'Credit Counseling Organization Name') })
    .then(() => { return setDomesticTelephone('.credit-counseling .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setDomesticAddress('.credit-counseling .credit-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.credit-counseling .credit-description textarea', 'This is a test description') })
}

const completeDelinquent = (promise) => {
  return promise
    .then(() => { return setOption('.delinquent .delinquent-branch .yes') })
    .then(() => { return setText('input[name="Name"]', 'Organization debt was owed') })
    .then(() => { return setOption('.delinquent .delinquent-infractions .delinquent-alimony') })
    .then(() => { return setText('input[name="AccountNumber"]', '123456789') })
    .then(() => { return setText('input[name="PropertyType"]', 'Property type for which debt is owed') })
    .then(() => { return setText('input[name="Amount"]', '1000000') })
    .then(() => { return setText('.delinquent .delinquent-reason textarea', 'This is a test reason') })
    .then(() => { return setText('input[name="Status"]', 'This is a sample status') })
    .then(() => { return setText('.delinquent .delinquent-date .month input', '1') })
    .then(() => { return setText('.delinquent .delinquent-date .year input', '2001') })
    .then(() => { return setText('input[name="CourtName"]', 'Sample Court Name') })
    .then(() => { return setDomesticAddress('.delinquent .delinquent-courtaddress', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.delinquent .delinquent-description textarea', 'This is a test description') })
}

const completeNonpayment = (promise) => {
  return promise
    .then(() => { return setOption('.nonpayment .nonpayment-branch .yes') })
    .then(() => { return setText('input[name="Name"]', 'Organization debt is or was owed') })
    .then(() => { return setOption('.nonpayment .nonpayment-infractions .nonpayment-repossession') })
    .then(() => { return setText('input[name="AccountNumber"]', '123456789') })
    .then(() => { return setText('input[name="PropertyType"]', 'Property type for which debt is owed') })
    .then(() => { return setText('input[name="Amount"]', '1000000') })
    .then(() => { return setText('.nonpayment .nonpayment-reason textarea', 'This is a test reason') })
    .then(() => { return setText('input[name="Status"]', 'This is the non-payment status') })
    .then(() => { return setText('.nonpayment .datecontrol.nonpayment-resolved .month input', '1') })
    .then(() => { return setText('.nonpayment .datecontrol.nonpayment-resolved .year input', '2002') })
    .then(() => { return setText('.nonpayment .datecontrol.nonpayment-date .month input', '1') })
    .then(() => { return setText('.nonpayment .datecontrol.nonpayment-date .year input', '2001') })
    .then(() => { return setText('.nonpayment .nonpayment-description textarea', 'This is a test description') })
}

const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-navigate-subsection.png')

}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
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
    .pause(500)
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
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

const setDomesticTelephone = (selector, first, second, third) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' input[name="domestic_first"]', first)
    .setValue(selector + ' input[name="domestic_second"]', second)
    .setValue(selector + ' input[name="domestic_third"]', third)
    .click(selector + ' .phonetype-option.cell')
    .saveScreenshot('./screenshots/Financial/' + filenum() + '-set-telephone.png')
}

const tab = (selector) => {
  return client
    .assert.visible(selector)
    .sendKeys(selector, client.Keys.TAB)
}
