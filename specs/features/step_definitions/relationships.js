const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let subcontext = ""
let range = 7
let counter = 0

const filenum = () => {
  const size = 4
  const num = counter++

  let s = '' + num
  while (s.length < size) {
    s = '0' + s
  }

  subcontext = subcontext.replace('/','_')
  return s + '-' + subcontext
}

defineSupportCode(({Given, Then, When}) => {

  When(/^I click Next to go to relationships (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
  })

  When(/^I navigate to the relationships (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'relationships'
    const ssheader = 'Marital & relationship status'
    navigateToSection(section)
    if (subsection.includes("/")) {
      subcontext = ssheader
      return navigateToSection(ssheader)
    }
    return navigateToSubsection(section.toLowerCase(), subsection)
  })

  When(/^I fill in the relationships (.*?) section$/, (subsection) => {
    switch (subsection) {
      case 'status/marital':
        return completeRelationshipStatusMarital(client)
      case 'status/cohabitant':
        return completeRelationshipStatusCohabitant(client)
      case 'people':
        return completeRelationshipPeople(client)
      case 'relatives':
        return completeRelationshipRelatives(client)
      default:
        return client
    }
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
    .then(() => { return setText('.marital .datecontrol.birthdate .year input', '1979') })
    .then(() => { return setOption('.marital .location.birthplace .option-list.branch .yes.block') })
    .then(() => { return setText('.marital .location.birthplace .state input', 'VA') })
    .then(() => { return setText('.marital .location.birthplace .city input', 'Fairfax') })
    .then(() => { return setText('.marital .location.birthplace .county input', 'Fairfax') })
    .then(() => { return setText('.marital .ssn .first input', '323') })
    .then(() => { return setText('.marital .ssn .middle input', '42') })
    .then(() => { return setText('.marital .ssn .last input', '5252') })
    .then(() => { return setOption('.marital .othername .blocks.option-list .yes.block')})
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
    .then(() => { return setOption('.marital .othername .last-branch .blocks.option-list .no.block') })
    .then(() => { return setCountry('.marital .country.relationships-civilUnion-citizenship input', 'United States')})
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
    .then(() => { return setOption('.marital .branch.separated .blocks.option-list .no.block')})
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
    .then(() => { return setText('.cohabitants .birthplace .fields .state input', 'VA')})
    .then(() => { return setText('.cohabitants .birthplace .fields .city input', 'Fairfax') })
    // .then(() => { return setText('.cohabitants .birthplace .fields .county input', 'Fairfax') })
    .then(() => { return setText('.cohabitants .ssn .first input', '323') })
    .then(() => { return setText('.cohabitants .ssn .middle input', '42') })
    .then(() => { return setText('.cohabitants .ssn .last input', '5252') })
    .then(() => { return setOption('.cohabitants .cohabitant-othernames .blocks.option-list .yes.block') })
    .then(() => { return setText('.cohabitants .cohabitant-othernames .field .first input', 'CohabFirst') })
    .then(() => { return setText('.cohabitants .cohabitant-othernames .field .middle input', 'CohabMiddle') })
    .then(() => { return setText('.cohabitants .cohabitant-othernames .field .last input', 'CohabLastMaiden') })
    .then(() => { return setOption('.cohabitants .cohabitant-othernames .maiden-name .blocks.option-list .yes.block') })
    .then(() => { return setText('.cohabitants .daterange.datesused .datecontrol.from .month input', '3') })
    .then(() => { return setText('.cohabitants .daterange.datesused .datecontrol.from .day input', '3') })
    .then(() => { return setText('.cohabitants .daterange.datesused .datecontrol.from .year input', '1980') })
    .then(() => { return setText('.cohabitants .daterange.datesused .datecontrol.to .month input', '2') })
    .then(() => { return setText('.cohabitants .daterange.datesused .datecontrol.to .day input', '2') })
    .then(() => { return setText('.cohabitants .daterange.datesused .datecontrol.to .year input', '2010') })
    .then(() => { return setOption('.cohabitants .cohabitant-othernames .last-branch .blocks.option-list .no.block') })
    .then(() => { return setCountry('.cohabitants .country.relationships-cohabitant-citizenship input', 'United States') })
    .then(() => { return setText('.cohabitants .datecontrol.cohabitation-began .month input', '4') })
    .then(() => { return setText('.cohabitants .datecontrol.cohabitation-began .day input', '4') })
    .then(() => { return setText('.cohabitants .datecontrol.cohabitation-began .year input', '2004') })
    .then(() => { return setOption('.cohabitants .branch.addendum .no.block') })
}

const completeRelationshipPeople = (promise) => {
  return promise
    .then(() => { return checkValue('.people .summary-progress.people-summary .stats .fraction .completed', '0') })
    .then(() => { return setText('.person .daterange.known-dates .datecontrol.from .month input', '1') })
    .then(() => { return setText('.person .daterange.known-dates .datecontrol.from .day input', '1') })
    .then(() => { return setText('.person .daterange.known-dates .datecontrol.from .year input', getCurrentYear()-range) })
    .then(() => { return setOption('.person .daterange.known-dates .from-present .block label') })
    .then(() => { return setText('.person .name .first input', 'John') })
    .then(() => { return setText('.person .name .middle input', 'Quincy') })
    .then(() => { return setText('.person .name .last input', 'Public') })
    .then(() => { return setOption('.person .rank-notapplicable .block label') })
    .then(() => { return setOption('.person .relationship.option-list .block label') })
    .then(() => { return setDomesticTelephone('.person .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setDomesticTelephone('.person .other-telephone', '703', '444', '5555', 'Home') })
    .then(() => { return setText('.person .email input', 'test@test.com') })
    .then(() => { return setDomesticAddress('.person .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOptionWithPause('.people .field.branch.addendum .no.block label') })
    .then(() => { return checkValue('.people .summary-progress.people-summary .stats .fraction .completed', range) })
}

const completeRelationshipRelatives = (promise) => {
  return promise
    .then(() => { return setOption('.relatives .relative-relation .relation-mother.block label') })
    .then(() => { return setText('.relatives .name.relative-name .first input', 'Mom') })
    .then(() => { return setText('.relatives .name.relative-name .middle input', 'Q') })
    .then(() => { return setText('.relatives .name.relative-name .last input', 'Public') })
    .then(() => { return setText('.relatives .datecontrol.relative-birthdate .month input', '6') })
    .then(() => { return setText('.relatives .datecontrol.relative-birthdate .day input', '6') })
    .then(() => { return setText('.relatives .datecontrol.relative-birthdate .year input', '1950') })
    .then(() => { return setOption('.relatives .location.relative-birthplace .blocks.option-list .yes.block  label') })
    .then(() => { return setText('.relatives .relative-birthplace .fields .state input', 'VA') })
    .then(() => { return setText('.relatives .relative-birthplace .fields .city input', 'Fairfax') })
    .then(() => { return setCountry('.relatives .country.relative-citizenship input', 'United States') })
    .then(() => { return setOption('.relatives .relative-maiden-diff .blocks.option-list .no.block label') })
    .then(() => { return setText('.relatives .name.relative-maidenname .first input', 'Mom') })
    .then(() => { return setText('.relatives .name.relative-maidenname .middle input', 'Q') })
    .then(() => { return setText('.relatives .name.relative-maidenname .last input', 'Private') })
    .then(() => { return setOption('.relatives .relative-alias .blocks.option-list .no.block label') })
    .then(() => { return setOption('.relatives .relative-deceased .blocks.option-list .no.block label') })
}

const navigateToSection = (section) => {
  const selector = '.usa-sidenav-list a[aria-controls="/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.usa-sidenav-sub_list a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-navigate-subsection.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-navigate-next.png')
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
    .pause(500)
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-set-option.png')
}

const setOptionWithPause = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(2000)
    .click(selector)
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
    .pause(500)
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

const setCountry = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, [text, client.Keys.ENTER])
    .saveScreenshot('./screenshots/Relationships/' + filenum() + '-set-country.png')
}

const getCurrentYear = () => {
  return new Date().getFullYear();
}
