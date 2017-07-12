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

let range = 10

defineSupportCode(({Given, Then, When}) => {

  When(/^I fill in the relationships (.*?) section$/, (subsection) => {
    const section = 'Relationships'
    const ssheader = 'Marital & relationship status'
    let promise = navigateToSection(section)
      .then(() => { return navigateToSection(ssheader)})
      .then(() => { return navigateToSubsection(section.toLowerCase(), subsection) })

    switch (subsection) {
      case 'status/marital':
        return completeRelationshipStatusMarital(promise)
      case 'status/cohabitant':
        return completeRelationshipStatusCohabitant(promise)
      default:
        return promise
    }
  })

  When(/^I click next$/, () => {
    return navigateToNext()
  })

  Then(/^I should be in the relationships (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('relationships', subsection)
  })
})

const completeRelationshipStatusMarital = (promise) => {
  return promise
    .then(() => { return setOption('.marital .blocks.status-options .status-civil-union') })
    .then(() => { return setText('.marital .name.civil .field .first input', 'SpouseFirst') })
    .then(() => { return setText('.marital .name.civil .field .middle input', 'SpouseMiddle') })
    .then(() => { return setText('.marital .name.civil .field .last input', 'SpouseLast') })
    .then(() => { return setText('.marital .datecontrol.birthdate .month input', '1') })
    .then(() => { return setText('.marital .datecontrol.birthdate .day input', '1') })
    .then(() => { return setText('.marital .datecontrol.birthdate .year input', '1980') })
    .then(() => { return setOption('.marital .location.birthplace .option-list.branch .yes.block') })
    .then(() => { return setText('.marital .location.birthplace .state input', 'VA') })
    .then(() => { return setText('.marital .location.birthplace .city input', 'Fairfax') })
    .then(() => { return setText('.marital .location.birthplace .county input', 'Fairfax') })
    .then(() => { return setText('.marital .ssn .first input', '323') })
    .then(() => { return setText('.marital .ssn .middle input', '42') })
    .then(() => { return setText('.marital .ssn .last input', '5252') })
    .then(() => { return setText('.marital .othername .field .first input', 'SpouseFirst') })
    .then(() => { return setText('.marital .othername .field .middle input', 'SpouseMiddle') })
    .then(() => { return setText('.marital .othername .field .last input', 'SpouseLastMaiden') })
    .then(() => { return setOption('.marital .maiden-name .blocks.option-list .yes.block') })
    .then(() => { return setText('.marital .daterange.datesused .datecontrol.from .month input', '1') })
    .then(() => { return setText('.marital .daterange.datesused .datecontrol.from .day input', '1') })
    .then(() => { return setText('.marital .daterange.datesused .datecontrol.from .year input', '1980') })
    .then(() => { return setText('.marital .daterange.datesused .datecontrol.to .month input', '2') })
    .then(() => { return setText('.marital .daterange.datesused .datecontrol.to .day input', '2') })
    .then(() => { return setText('.marital .daterange.datesused .datecontrol.to .year input', '2000') })
    .then(() => { return setText('.marital .country.relationships-civilUnion-citizenship input', 'United States') })
    .then(() => { return setText('.marital .datecontrol.entered .month input', '2') })
    .then(() => { return setText('.marital .datecontrol.entered .day input', '2') })
    .then(() => { return setText('.marital .datecontrol.entered .year input', '2000') })
    .then(() => { return setOption('.marital .civilunion-location .blocks.option-list .yes.block') })
    .then(() => { return setText('.marital .civilunion-location .state input', 'VA') })
    .then(() => { return setText('.marital .civilunion-location .city input', 'Fairfax') })
    .then(() => { return setText('.marital .civilunion-location .county input', 'Fairfax') })
    .then(() => { return setDomesticAddress('.marital .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDomesticTelephone('.marital .telephone', '703', '333', '4444', 'Cell') })
    .then(() => { return setText('.marital .field .component .email input', 'test@test.com') })
    .then(() => { return setOption('.marital .branch.separated .blocks.option-list .no.block') })
    .then(() => { return setOption('.marital .branch.divorced .blocks.option-list .no.block') })
}

const completeRelationshipStatusCohabitant = (promise) => {
  return promise
    .then(() => { return setOption('.cohabitants .has-cohabitant .blocks.option-list .yes.block') })
    .then(() => { return setText('.cohabitants .cohabitant-name .field .first input', 'CohabFirst') })
    .then(() => { return setText('.cohabitants .cohabitant-name .field .middle input', 'CohabMiddle') })
    .then(() => { return setText('.cohabitants .cohabitant-name .field .last input', 'CohabLast') })
    .then(() => { return setText('.cohabitants .datecontrol.birthdate .month input', '3') })
    .then(() => { return setText('.cohabitants .datecontrol.birthdate .day input', '3') })
    .then(() => { return setText('.cohabitants .datecontrol.birthdate .year input', '1980') })
    .then(() => { return setOption('.cohabitants .birthplace .blocks.option-list .yes.block') })
    .then(() => { return setText('.cohabitants .birthplace .fields .state input', 'VA') })
    .then(() => { return setText('.cohabitants .birthplace .fields .city input', 'Fairfax') })
    .then(() => { return setText('.cohabitants .birthplace .fields .county input', 'Fairfax') })
    .then(() => { return setText('.cohabitants .ssn .first input', '323') })
    .then(() => { return setText('.cohabitants .ssn .middle input', '42') })
    .then(() => { return setText('.cohabitants .ssn .last input', '5252') })
    .then(() => { return setText('.cohabitants .othername .field .first input', 'CohabFirst') })
    .then(() => { return setText('.cohabitants .othername .field .middle input', 'CohabMiddle') })
    .then(() => { return setText('.cohabitants .othername .field .last input', 'CohabLastMaiden') })
    .then(() => { return setOption('.cohabitants .maiden-name.othername .blocks.option-list .yes.block') })
    .then(() => { return setText('.cohabitants .daterange.othername .datecontrol.from .month input', '3') })
    .then(() => { return setText('.cohabitants .daterange.othername .datecontrol.from .day input', '3') })
    .then(() => { return setText('.cohabitants .daterange.othername .datecontrol.from .year input', '1980') })
    .then(() => { return setText('.cohabitants .daterange.othername .datecontrol.to .month input', '2') })
    .then(() => { return setText('.cohabitants .daterange.othername .datecontrol.to .day input', '2') })
    .then(() => { return setText('.cohabitants .daterange.othername .datecontrol.to .year input', '2010') })
    .then(() => { return setText('.cohabitants .country.relationships-cohabitant-citizenship input', 'United States') })
    .then(() => { return setText('.cohabitants .datecontrol.cohabitation-began .month input', '3') })
    .then(() => { return setText('.cohabitants .datecontrol.cohabitation-began .day input', '3') })
    .then(() => { return setText('.cohabitants .datecontrol.cohabitation-began .year input', '2000') })
}

const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-navigate-next.png')
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
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-set-address.png')
}

const setDomesticTelephone = (selector, first, second, third) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' input[name="domestic_first"]', first)
    .setValue(selector + ' input[name="domestic_second"]', second)
    .setValue(selector + ' input[name="domestic_third"]', third)
    .click(selector + ' .phonetype-option.cell')
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-set-telephone.png')
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
    .pause(3000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-set-text.png')
}

const click = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-click.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-set-date.png')
}

const checkValue = (selector, value) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .assert.containsText(selector, value)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-check-value.png')
}

const getCurrentYear = () => {
  return new Date().getFullYear();
}
