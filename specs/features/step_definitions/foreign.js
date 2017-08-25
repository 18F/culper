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

  When(/^I fill in the foreign (.*?) section$/, (subsection) => {
    const section = 'foreign'
    const sectionTitle = 'Foreign activities'
    let promise = navigateToSection(sectionTitle)
      .then(() => { return navigateToSubsection(section, subsection) })

    switch (subsection) {
      case 'passport':
        return completePassport(promise)
      case 'contacts':
        return completeContacts(promise)
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
        return completeBusinessContact(promise)
      case 'business/sponsorship':
        return completeBusinessSponsorship(promise)
      case 'business/political':
        return completeBusinessPolitical(promise)
      case 'business/voting':
        return completeBusinessVoting(promise)
      case 'travel':
        return completeTravel(promise)
      default:
        return promise
      }
    })

  When(/^I click Next to go to foreign (.*?)$/, (subsection) => {
    return navigateToNext(subsection)
  })

  Then(/^I should be in the foreign (.*?) section$/, (subsection) => {
    return shouldBeInSubsection('foreign', subsection)
  })
})

const completePassport = (promise) => {
  return promise
    .then(() => { return setOption('.passport .branch .yes') })
    .then(() => { return setName('.name', 'Charles', 'F', 'Xavier') })
    .then(() => { return setText('.number input', 'A12345678') })
    .then(() => { return setDate('.datecontrol', '1', '1', '2010') })
}

const completeContacts = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-contacts .branch .yes') })
    .then(() => { return setName('.foreign-contacts .foreign-national .name', 'Charles', 'F', 'Xavier') })
    .then(() => { return setDate('.foreign-contacts .datecontrol.first-contact', '1', '1', '2010') })
    .then(() => { return setDate('.foreign-contacts .datecontrol.last-contact', '1', '1', '2012') })
    .then(() => { return setOption('.foreign-contacts .methods .methods-inperson.block') })
    .then(() => { return setOption('.foreign-contacts .frequency .frequency-annually.block') })
    .then(() => { return setOption('.foreign-contacts .relationship .relationship-professional.block') })
    .then(() => { return setOption('.foreign-contacts .aliases .branch .no') })
    .then(() => { return setText('.foreign-contacts .country.citizenship input', 'New Zealand') })
    .then(() => { return setOption('.foreign-contacts .na-birthdate.button .block') })
    .then(() => { return setText('.foreign-contacts .na-birthplace .location .city input', 'Aukland') })
    .then(() => { return setText('.foreign-contacts .na-birthplace .location .country input', 'New Zealand') })
    .then(() => { return setDomesticAddress('.foreign-contacts .na-address .current-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setTextWithPause('.foreign-contacts .na-employer .employer input', 'XMEN') })
    .then(() => { return setDomesticAddress('.foreign-contacts .na-employer-address .employer-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOptionWithPause('.foreign-contacts .has-affiliations .no.block') })
    .then(() => { return setOption('.foreign-contacts .branch.addendum .no.block') })
}

const completeBusinessContact = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-business-contact .branch .yes') })
    .then(() => { return setName('.foreign-business-contact-name', 'Charles', 'F', 'Xavier') })
    .then(() => { return setDomesticAddress('.foreign-business-contact-location', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDate('.foreign-business-contact-date', '1', '1', '2010') })
    .then(() => { return setText('.foreign-business-contact-governments input', 'Germany') })
    .then(() => { return setText('.foreign-business-contact-establishment textarea', 'This is a reason for establishment') })
    .then(() => { return setText('.foreign-business-contact-representatives textarea', 'This is a reason for representatives') })
    .then(() => { return setText('.foreign-business-contact-purpose textarea', 'This is a purpose') })
}

const completeBusinessSponsorship = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-business-sponsorship .branch .yes') })
    .then(() => { return setName('.foreign-business-sponsorship-name', 'Charles', 'F', 'Xavier') })
    .then(() => { return setDate('.foreign-business-sponsorship-birthdate', '1', '1', '2010') })
    .then(() => { return setOption('.foreign-business-sponsorship-birthplace .branch .yes') })
    .then(() => { return setText('.foreign-business-sponsorship-birthplace .state input', 'FL') })
    .then(() => { return setText('.foreign-business-sponsorship-birthplace .city input', 'Seminole') })
    .then(() => { return setDomesticAddress('.foreign-business-sponsorship-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.foreign-business-sponsorship-citizenship input', 'Germany') })
    .then(() => { return setText('.foreign-business-sponsorship-organization input', 'Luftwaffe') })
    .then(() => { return setDomesticAddress('.foreign-business-sponsorship-organizationaddress', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setDate('.foreign-business-sponsorship-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.foreign-business-sponsorship-dates .to', '1', '1', '2011') })
    .then(() => { return setDomesticAddress('.foreign-business-sponsorship-residence', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.foreign-business-sponsorship-stay textarea', 'This is a reason for stay') })
    .then(() => { return setText('.foreign-business-sponsorship-sponsorship textarea', 'This is a reason for sponsorship') })
}

const completeBusinessPolitical = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-business-political .branch .yes') })
    .then(() => { return setText('.foreign-business-political-position input', 'President') })
    .then(() => { return setDate('.foreign-business-political-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.foreign-business-political-dates .to', '1', '1', '2011') })
    .then(() => { return setText('.foreign-business-political-country input', 'Germany') })
    .then(() => { return setText('.foreign-business-political-reason textarea', 'This is a reason') })
    .then(() => { return setText('.foreign-business-political-eligibility input', 'No longer eligible') })
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
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(3000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
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

const setOptionWithPause = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(5000)
    .click(selector)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-text.png')
}

const setTextWithPause = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .pause(5000)
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

const setName = (selector, first, middle, last) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .first input', first)
    .setValue(selector + ' .middle input', middle)
    .setValue(selector + ' .last input', last)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-name.png')
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
