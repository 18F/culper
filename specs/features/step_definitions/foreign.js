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
  When(/^I go to the foreign section$/, () => {
    return navigateToSection('foreign')
  })

  When(/^I go to the foreign (.*?) section$/, (subsection) => {
    const section = 'foreign'
    return navigateToSection(section)
      .then(() => { return navigateToSubsection(section, subsection) })
  })

  When(/^I fill in the foreign (.*?) section$/, (subsection) => {
    const section = 'foreign'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'passport':
      return completePassport(promise)
    case 'travel':
      return completeTravel(promise)
    case 'activities/direct':
      return promise
    case 'activities/indirect':
      return promise
    case 'activities/realestate':
      return promise
    case 'activities/benefits':
      return promise
    case 'activities/support':
      return promise
    case 'business/advice':
      return promise
    case 'business/family':
      return promise
    case 'business/employment':
      return promise
    case 'business/ventures':
      return promise
    case 'business/conferences':
      return promise
    case 'business/contact':
      return promise
    case 'business/sponsorship':
      return promise
    case 'business/political':
      return promise
    case 'business/voting':
      return completeBusinessVoting(promise)
    default:
      return promise
    }
  })

  When(/^I fill in the foreign activities (.*?) section$/, (subsection) => {
    const section = 'foreign'
    let promise = navigateToSection(section).then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
    case 'direct':
      return promise
    case 'indirect':
      return promise
    case 'realestate':
      return promise
    case 'benefits':
      return promise
    case 'support':
      return promise
    default:
      return promise
    }
  })

  When(/^I click next$/, () => {
    return navigateToNext()
  })

  Then(/^I should be in the foreign (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('foreign', subsection)
  })
})

const completePassport = (promise) => {
  return promise
    .then(() => { return setOption('.passport .branch .yes') })
    .then(() => { return setText('input[name="first"]', 'Charles') })
    .then(() => { return setText('input[name="middle"]', 'F') })
    .then(() => { return setText('input[name="last"]', 'Xavier') })
    .then(() => { return setText('input[name="number"]', 'A12345678') })
    .then(() => { return setText('input[name="month"]', '11') })
    .then(() => { return setText('input[name="day"]', '10') })
    .then(() => { return setText('input[name="year"]', '1775') })
}

const completeBusinessVoting = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-business-voting .branch .yes') })
    .then(() => { return setDate('.foreign-business-voting-date', '1', '1', '2010') })
    .then(() => { return setText('.foreign-business-voting-country input', 'Germany') })
    .then(() => { return setText('.foreign-business-voting-reason textarea', 'This is a reason') })
    .then(() => { return setText('.foreign-business-voting-eligibility input', 'No longer eligible') })
}

const completeTravel = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-travel-outside .branch .yes') })
    .then(() => { return setOption('.foreign-travel-official .branch .no') })
    .then(() => { return setText('.foreign-travel-country input', 'Germany') })
    .then(() => { return setDate('.foreign-travel-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.foreign-travel-dates .to', '1', '1', '2011') })
    .then(() => { return setOption('.foreign-travel-days .days-1-5') })
    .then(() => { return setOption('.foreign-travel-purpose .purpose-business') })
    .then(() => { return setOption('.foreign-travel-questioned .branch .yes') })
    .then(() => { return setText('.foreign-travel-questioned-explanation textarea', 'This is an explanation') })
    .then(() => { return setOption('.foreign-travel-encounter .branch .yes') })
    .then(() => { return setText('.foreign-travel-encounter-explanation textarea', 'This is an explanation') })
    .then(() => { return setOption('.foreign-travel-contacted .branch .yes') })
    .then(() => { return setText('.foreign-travel-contacted-explanation textarea', 'This is an explanation') })
    .then(() => { return setOption('.foreign-travel-counter .branch .yes') })
    .then(() => { return setText('.foreign-travel-counter-explanation textarea', 'This is an explanation') })
    .then(() => { return setOption('.foreign-travel-interest .branch .yes') })
    .then(() => { return setText('.foreign-travel-interest-explanation textarea', 'This is an explanation') })
    .then(() => { return setOption('.foreign-travel-sensitive .branch .yes') })
    .then(() => { return setText('.foreign-travel-sensitive-explanation textarea', 'This is an explanation') })
    .then(() => { return setOption('.foreign-travel-threatened .branch .yes') })
    .then(() => { return setText('.foreign-travel-threatened-explanation textarea', 'This is an explanation') })
}

const navigateToSection = (section) => {
  const selector = '.section a[href="#/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.section a[href="#/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-text.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-date.png')
}
