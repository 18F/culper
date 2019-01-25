const { client } = require('nightwatch-cucumber')
const { defineSupportCode } = require('cucumber')

let subcontext = ""

let counter = 0

const person = {
  first: 'Charles',
  middle: 'Francis',
  last: 'Xavier',
  otherNames: {
    first: 'Chuck',
    middle: 'Frank',
    last: 'Xavier'
  },
  homeEmail: 'charles@x.com',
  workEmail: 'professor@xmen.org',
  phoneNumbers: [
    {
      first: '202',
      second: '867',
      third: '5309',
      timeofday: 'day',
      phonetype: 'work'
    }
  ],
  birthDate: {
    month: '11',
    day: '10',
    year: '1990'
  },
  birthPlace: {
    state: { input: 'New York', expected: 'NY' },
    city: 'New York City',
    county: 'Manhattan'
  },
  ssn: {
    first: '123',
    middle: '12',
    last: '1234'
  },
  physical: {
    feet: '6',
    inches: '0',
    pounds: '190',
    hair: 'bald',
    eye: 'black',
    sex: 'male'
  }
}

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

  Then(/^I should see my data in the (.*?) section data$/, (subsection) => {
    subcontext = `review-${subsection}`
    switch (subsection) {
      case 'name':
        return reviewFullName(client)
      case 'othernames':
        return reviewOtherNames(client)
      case 'contacts':
        return reviewContacts(client)
      case 'birthdate':
        return reviewBirthDate(client)
      case 'birthplace':
        return reviewBirthPlace(client)
      case 'ssn':
        return reviewSocialSecurityNumber(client)
      case 'physical':
        return reviewPhysicalAttributes(client)
      default:
        return 'pending'
    }
  })

  Then(/^I should be in the identification (.*?) section$/, (subsection) => {
    subcontext = subsection
    return shouldBeInSubsection('identification', subsection)
  })

  Then(/^I should have no errors$/, () => {
    subcontext = 'review'
    return 'pending'
    return client.assert.elementNotPresent('.usa-alert-error')
  })
})

const reviewPhysicalAttributes = () => {
  return client
    .assert.value('.physical .feet input', person.physical.feet)
    .assert.value('.physical .inches input', person.physical.inches)
    .assert.value('.physical .pounds input', person.physical.pounds)
    .assert.cssClassPresent(`.physical .hair-colors .${person.physical.hair} input`, 'selected')
    .assert.cssClassPresent(`.physical .eye-colors .${person.physical.eye} input`, 'selected')
    .assert.cssClassPresent(`.physical .sex .${person.physical.sex} input`, 'selected')
}

const reviewSocialSecurityNumber = () => {
  return client
    .assert.value('.applicant-ssn-initial input[name="first"]', person.ssn.first)
    .assert.value('.applicant-ssn-initial input[name="middle"]', person.ssn.middle)
    .assert.value('.applicant-ssn-initial input[name="last"]', person.ssn.last)
}

const reviewBirthPlace = () => {
  return client
    .assert.cssClassPresent('.applicant-birthplace .branch .yes.block input', 'selected')
    .assert.value('.location input[name="city"]', person.birthPlace.city)
    .assert.value('.location input[name="state"]', person.birthPlace.state.expected)
    .assert.value('.location input[name="county"]', person.birthPlace.county)
}

const reviewBirthDate = () => {
  return client
    .assert.value('.birthdate input[name="month"]', person.birthDate.month)
    .assert.value('.birthdate input[name="day"]', person.birthDate.day)
    .assert.value('.birthdate input[name="year"]', person.birthDate.year)
}

const reviewContacts = () => {
  return client
    .assert.value('.contact input[name="HomeEmail"]', person.homeEmail)
    .assert.value('.contact input[name="WorkEmail"]', person.workEmail)
    .assert.containsText(
      '.telephone-collection .item span.title-case',
      `(${person.phoneNumbers[0].first}) ${person.phoneNumbers[0].second}-${person.phoneNumbers[0].third}`
    )
    .assert.cssClassPresent('.contact .time.day input', 'selected')
    .assert.cssClassPresent('.contact .phonetype-option.work input', 'selected')
}
const reviewOtherNames = () => {
  return client
    .assert.value('.other-name .first input', person.otherNames.first)
    .assert.value('.other-name .middle input', person.otherNames.middle)
    .assert.value('.other-name .last input', person.otherNames.last)
}
const reviewFullName = () => {
  return client
    .assert.value('.name .first input', person.first)
    .assert.value('.name .middle input', person.middle)
    .assert.value('.name .last input', person.last)
}
const completeFullName = (promise) => {
  return promise
      .then(() => { return setName('.name', person.first, person.middle, person.last) })
}

const completeOtherNamesUsed = (promise) => {
  return promise
      .then(() => { return setOption('.other-names .branch .yes') })
      .then(() => { return setName('.name', person.otherNames.first, person.otherNames.middle, person.otherNames.last) })
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
      .then(() => { return setText('input[name="HomeEmail"]', person.homeEmail)})
      .then(() => { return setText('input[name="WorkEmail"]', person.workEmail)})
      .then(() => { return scrollToItem('input[name="domestic_first"]') })
      .then(() => { return setText('input[name="domestic_first"]', person.phoneNumbers[0].first) })
      .then(() => { return setText('input[name="domestic_second"]', person.phoneNumbers[0].second) })
      .then(() => { return setText('input[name="domestic_third"]', person.phoneNumbers[0].third) })
      .then(() => { return setOption(`.timeofday .${person.phoneNumbers[0].timeofday} label`) })
      .then(() => { return setOption(`.phonetype .${person.phoneNumbers[0].phonetype} label`) })
}

const completeBirthDate = (promise) => {
  return promise
      .then(() => { return setText('input[name="month"]', person.birthDate.month)})
      .then(() => { return setText('input[name="day"]', person.birthDate.day) })
      .then(() => { return setText('input[name="year"]', person.birthDate.year) })
}

const completeBirthPlace = (promise) => {
  return promise
      .then(() => { return setOption('.applicant-birthplace .branch .yes.block') })
      .then(() => { return setText('input[name="state"]', person.birthPlace.state.input) })
      .then(() => { return setText('input[name="city"]', person.birthPlace.city) })
      .then(() => { return setText('input[name="county"]', person.birthPlace.county) })
}

const completeSocialSecurityNumber = (promise) => {
  return promise
      .then(() => { return setText('.applicant-ssn-initial input[name="first"]', person.ssn.first) })
      .then(() => { return setText('.applicant-ssn-initial input[name="middle"]', person.ssn.middle) })
      .then(() => { return setText('.applicant-ssn-initial input[name="last"]', person.ssn.last) })
      .then(() => { return setText('.applicant-ssn-verification input[name="first"]', person.ssn.first) })
      .then(() => { return setText('.applicant-ssn-verification input[name="middle"]', person.ssn.middle) })
      .then(() => { return setText('.applicant-ssn-verification input[name="last"]', person.ssn.last) })
}

const completePhysicalAttributes = (promise) => {
  return promise
      .then(() => {
        return setText('.height .feet input', person.physical.feet)
          .assert.value('.height .feet input', person.physical.feet)
          .setText('.height .inches input', person.physical.inches)
          .setText('.weight .pounds input', person.physical.pounds)
      })
      .then(() => { return setOption(`.hair-colors .${person.physical.hair}.block.extended label`) })
      .then(() => { return setOption(`.eye-colors .${person.physical.eye}.block.extended label`) })
      .then(() => { return setOption(`.sex .${person.physical.sex} label`) })
}

const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(500)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = () => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(500)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const click = (selector) => {
  return client
    .click(selector)
    .pause(500)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-click.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(500)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-set-text.png')
}

const setName = (selector, first, middle, last) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .first input', first)
    .setValue(selector + ' .middle input', middle)
    .setValue(selector + ' .last input', last)
    .saveScreenshot('./screenshots/Identification/' + filenum() + '-set-name.png')
}

const scrollToItem = (selector) => {
  return client.getLocationInView(selector)
  .saveScreenshot('./screenshots/Identification/' + filenum() + '-scrolltoview.png')
}
