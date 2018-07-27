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
  When(/^I click Next to go to foreign (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
  })

  When(/^I navigate to the foreign (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'foreign'
    navigateToSection(section)
    return navigateToSubsection(section, subsection)
  })

  When(/^I fill in the foreign (.*?) section$/, (subsection) => {
    switch (subsection) {
      case 'passport':
        return completePassport(client)
      case 'contacts':
        return completeContacts(client)
      case 'travel':
        return completeForeignTravel(client)
      default:
        return client
      }
  })

  When(/^I fill in the foreign (.*?) section (.*?) subsection$/, (section, subsection) => {
    switch (subsection) {
      // "activities" subsections
      case 'direct':
        return completeActivitiesDirectControl(client)
      case 'indirect':
        return completeActivitiesIndirectControl(client)
      case 'realestate':
        return completeActivitiesRealEstatePurchase(client)
      case 'benefits':
        return completeActivitiesBenefits(client)
      case 'support':
        return completeActivitiesSupport(client)
      // "business" subsection
      case 'advice':
        return completeBusinessAdvice(client)
      case 'family':
        return completeBusinessAdviceFamily(client)
      case 'employment':
        return completeBusinessEmploymentOffer(client)
      case 'ventures':
        return completeBusinessOtherVentures(client)
      case 'conferences':
        return completeBusinessConferences(client)
      case 'contact':
        return completeBusinessContact(client)
      case 'sponsorship':
        return completeBusinessSponsorship(client)
      case 'political':
        return completeBusinessPolitical(client)
      case 'voting':
        return completeBusinessVoting(client)
      default:
        return client
      }
  })

  Then(/^I should be in the foreign (.*?) section$/, (subsection) => {
    subcontext = subsection
    return shouldBeInSubsection('foreign', subsection)
  })
})

const completePassport = (promise) => {
  return promise
    .then(() => { return setOption('.passport .branch .yes') })
    //.then(() => { return setOption('.passport .suggestions .dismiss a') })
    .then(() => { return setName('.name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setText('.number input', 'A12345678') })
    .then(() => { return setDate('.datecontrol.passport-issued', '1', '1', '2015') })
    .then(() => { return setDate('.datecontrol.passport-expiration', '1', '1', '2020') })
}

const completeContacts = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-contacts .branch .yes') })
    .then(() => { return setName('.foreign-contacts .foreign-national .name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setDate('.foreign-contacts .datecontrol.first-contact', '1', '1', '2010') })
    .then(() => { return setDate('.foreign-contacts .datecontrol.last-contact', '1', '1', '2012') })
    .then(() => { return setOption('.foreign-contacts .methods .methods-inperson.block') })
    .then(() => { return setOption('.foreign-contacts .frequency .frequency-annually.block') })
    .then(() => { return setOption('.foreign-contacts .relationship .relationship-professional.block') })
    .then(() => { return setOption('.foreign-contacts .aliases .branch .no') })
    .then(() => { return setCountry('.foreign-contacts .country.citizenship input', 'New Zealand') })
    .then(() => { return setOption('.foreign-contacts .na-birthdate.button .block') })
    .then(() => { return setText('.foreign-contacts .na-birthplace .location .city input', 'Aukland') })
    .then(() => { return setText('.foreign-contacts .na-birthplace .location .country input', 'New Zealand') })
    .then(() => { return setDomesticAddress('.foreign-contacts .na-address .current-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setTextWithPause('.foreign-contacts .na-employer .employer input', 'XMEN') })
    .then(() => { return setDomesticAddress('.foreign-contacts .na-employer-address .employer-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOptionWithPause('.foreign-contacts .has-affiliations .no.block') })
    .then(() => { return setOption('.foreign-contacts .branch.addendum .no.block') })
}

const completeActivitiesDirectControl = (promise) => {
  return promise
    .then(() => { return setOption('.direct .branch .yes.block') })
    .then(() => { return setOption('.direct .interest-types .yourself.block') })
    .then(() => { return setText('.direct .interest-type input', 'Interest type description') })
    .then(() => { return setDate('.direct .datecontrol.acquired', '1', '1', '2012') })
    .then(() => { return setText('.direct .how-acquired textarea', 'Description of how acquired') })
    .then(() => { return setText('.direct .currency .cost input', '10000') })
    .then(() => { return setText('.direct .currency .value input', '13000') })
    .then(() => { return setDate('.direct .datecontrol.relinquished', '1', '1', '2014') })
    .then(() => { return setText('.direct .explanation textarea', 'Explanation of what happened') })
    .then(() => { return setOption('.direct .co-owners .branch .no.block') })
    .then(() => { return setOption('.direct .branch.addendum .no.block') })
}

const completeActivitiesIndirectControl = (promise) => {
  return promise
    .then(() => { return setOption('.indirect .branch .yes.block') })
    .then(() => { return setOption('.indirect .interest-types .yourself.block') })
    .then(() => { return setText('.indirect .interest-type input', 'Indirect interest type description') })
    .then(() => { return setText('.indirect input[name="Firstname"]', 'Charles Edward') })
    .then(() => { return setText('.indirect input[name="Lastname"]', 'Cheese') })
    .then(() => { return setText('.indirect textarea[name="Relationship"]', 'description of relationship') })
    .then(() => { return setDate('.indirect .datecontrol.acquired', '1', '1', '2012') })
    .then(() => { return setText('.indirect .currency .cost input', '10000') })
    .then(() => { return setText('.indirect .how-acquired textarea', 'Description of how acquired') })
    .then(() => { return setText('.indirect .currency .value input', '13000') })
    .then(() => { return setDate('.indirect .datecontrol.sold', '1', '1', '2014') })
    .then(() => { return setText('.indirect .explanation textarea', 'Explanation of what happened') })
    .then(() => { return setOption('.indirect .co-owners .branch .no.block') })
    .then(() => { return setOption('.indirect .branch.addendum .no.block') })
}

const completeActivitiesRealEstatePurchase = (promise) => {
  return promise
    .then(() => { return setOption('.realestate .branch .yes') })
    .then(() => { return setOption('.realestate .interest-types .spouse.block') })
    .then(() => { return setText('.realestate .realestate-type input', 'House') })
    .then(() => { return setText('.realestate .location .street input', '123 Main Street') })
    .then(() => { return setText('.realestate .location .city input', 'Paris') })
    .then(() => { return setText('.realestate .location .country input', 'France') })
    .then(() => { return setDate('.realestate .datecontrol.acquired', '1', '1', '2012') })
    .then(() => { return setText('.realestate .how-acquired textarea', 'Description of how acquired') })
    .then(() => { return setDate('.realestate .datecontrol.sold', '1', '1', '2014') })
    .then(() => { return setText('.realestate .currency .cost input', '10000') })
    .then(() => { return setOption('.realestate .co-owners .branch .no.block') })
    .then(() => { return setOption('.realestate .branch.addendum .no.block') })
}

const completeActivitiesBenefits = (promise) => {
  return promise
    .then(() => { return setOption('.benefit-activity .branch.has-benefits .yes') })
    .then(() => { return setOption('.benefit-activity .interest-types .yourself.block') })
    .then(() => { return setOption('.benefit-activity .benefit-types .block') })
    .then(() => { return setOption('.benefit-activity .benefit-frequency .block') })
    .then(() => { return setDate('.benefit-activity .datecontrol.received', '1', '1', '2012') })
    .then(() => { return setCountry('.benefit-activity .country input', 'France') })
    .then(() => { return setText('.benefit-activity .currency .value input', '13000') })
    .then(() => { return setText('.benefit-activity .reason textarea', 'Description of why the benefit was received') })
    .then(() => { return setOption('.benefit-activity .obligated .branch .yes.block') })
    .then(() => { return setText('.benefit-activity .explanation textarea', 'Explanation of obligation') })
    .then(() => { return setOption('.benefit-activity .branch.addendum .no.block') })
}

const completeActivitiesSupport = (promise) => {
  return promise
    .then(() => { return setOptionBlind('.foreign-activities-support .branch .yes.block') })
    .then(() => { return setName('.foreign-activities-support-name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setDomesticAddress('.foreign-activities-support-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setText('.foreign-activities-support-relationship textarea', 'Description of relationship') })
    .then(() => { return setText('.foreign-activities-support .currency .number input', '13000') })
    .then(() => { return setText('.foreign-activities-support-frequency input', 'Annually') })
    .then(() => { return setText('.foreign-activities-support-citizenship input', 'United Kingdom') })
    .then(() => { return setOption('.foreign-activities-support .branch.addendum .no.block') })
}

const completeBusinessAdvice = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-business-advice .branch .yes.block') })
    .then(() => { return setText('.foreign-business-advice .advice-description textarea', 'Description of advice request') })
    .then(() => { return setName('.foreign-business-advice .advice-name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setText('.foreign-business-advice .advice-organization input', 'Organization Name') })
    .then(() => { return setCountry('.foreign-business-advice .advice-country input', 'United Kingdom') })
    .then(() => { return setDate('.foreign-business-advice .daterange.advice-dates .datecontrol.from', '1', '1', '2012') })
    .then(() => { return setDate('.foreign-business-advice .daterange.advice-dates .datecontrol.to', '1', '1', '2013') })
    .then(() => { return setText('.foreign-business-advice .advice-compensation textarea', 'Description of advice compensation') })
    .then(() => { return setOption('.foreign-business-advice .branch.addendum .no.block') })
}

const completeBusinessAdviceFamily = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-business-family .branch .yes.block') })
    .then(() => { return setName('.foreign-business-family .family-name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setText('.foreign-business-family .family-agency input', 'Agency Name') })
    .then(() => { return setCountry('.foreign-business-family .family-country input', 'United Kingdom') })
    .then(() => { return setDate('.foreign-business-family .datecontrol.family-date', '1', '1', '2012') })
    .then(() => { return setText('.foreign-business-family .family-circumstances textarea', 'Explanation of request circumstances') })
    .then(() => { return setOption('.foreign-business-family .branch.addendum .no.block') })
}

const completeBusinessEmploymentOffer = (promise) => {
  return promise
    .then(() => { return setOptionBlind('.foreign-business-employment .branch .yes.block') })
    .then(() => { return setName('.foreign-business-employment .employment-name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setText('.foreign-business-employment .employment-description textarea', 'Description of employment offer') })
    .then(() => { return setDate('.foreign-business-employment .datecontrol.employment-date', '1', '1', '2012') })
    .then(() => { return setOption('.foreign-business-employment .location.employment-address .no.block') })
    .then(() => { return setText('.foreign-business-employment .location.employment-address .city input', 'London') })
    .then(() => { return setText('.foreign-business-employment .location.employment-address .country input', 'United Kingdom') })
    .then(() => { return setOption('.foreign-business-employment .employment-accepted .blocks.option-list .yes.block') })
    .then(() => { return setOption('.foreign-business-employment .employment-accepted .blocks.option-list .yes.block') })
    .then(() => { return setText('.foreign-business-employment .employment-explanation textarea', 'Explanation of employment taken') })
    .then(() => { return setOption('.foreign-business-employment .branch.addendum .no.block') })
}

const completeBusinessOtherVentures = (promise) => {
  return promise
    .then(() => { return setOptionBlind('.foreign-business-ventures .branch .yes.block') })
    .then(() => { return setName('.foreign-business-ventures .ventures-name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setDomesticAddress('.foreign-business-ventures .location.ventures-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setCountry('.foreign-business-ventures .country.ventures-citizenship input', 'United Kingdom') })
    .then(() => { return setText('.foreign-business-ventures .ventures-description textarea', 'Description of business venture') })
    .then(() => { return setText('.foreign-business-ventures .ventures-relationship textarea', 'Description of venture relationship') })
    .then(() => { return setDate('.foreign-business-ventures .daterange.ventures-dates .datecontrol.from', '1', '1', '2012') })
    .then(() => { return setDate('.foreign-business-ventures .daterange.ventures-dates .datecontrol.to', '1', '1', '2013') })
    .then(() => { return setText('.foreign-business-ventures .ventures-association textarea', 'Description of venture association') })
    .then(() => { return setText('.foreign-business-ventures .ventures-position input', 'Venture position') })
    .then(() => { return setText('.foreign-business-ventures .ventures-service input', 'Venture service provided') })
    .then(() => { return setText('.foreign-business-ventures .ventures-support input', 'Venture financial support') })
    .then(() => { return setText('.foreign-business-ventures .ventures-compensation textarea', 'Description of venture compensation') })
    .then(() => { return setOption('.foreign-business-ventures .branch.addendum .no.block') })
}

const completeBusinessConferences = (promise) => {
  return promise
    .then(() => { return setOptionBlind('.foreign-business-conferences .branch .yes.block') })
    .then(() => { return setText('.foreign-business-conferences .conferences-description textarea', 'Description of business conference') })
    .then(() => { return setText('.foreign-business-conferences .conferences-sponsor input', 'Conference Sponsor') })
    .then(() => { return setText('.foreign-business-conferences .conferences-city input', 'London') })
    .then(() => { return setText('.foreign-business-conferences .conferences-country input', 'United Kingdom') })
    .then(() => { return setDate('.foreign-business-conferences .daterange.conferences-dates .datecontrol.from', '1', '1', '2012') })
    .then(() => { return setDate('.foreign-business-conferences .daterange.conferences-dates .datecontrol.to', '1', '4', '2012') })
    .then(() => { return setText('.foreign-business-conferences .conferences-purpose textarea', 'Purpose of business conference') })
    .then(() => { return setOption('.foreign-business-conferences .foreign-business-conferences-contacts .yes.block') })
    .then(() => { return setText('.foreign-business-conferences .conferences-explanation textarea', 'Explanation of conference contacts') })
    .then(() => { return setOption('.foreign-business-conferences .foreign-business-conferences-contacts .field.required.branch:nth-child(3) .no.block') })
    .then(() => { return setOption('.foreign-business-conferences .branch.addendum .no.block') })
}

const completeBusinessContact = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-business-contact .branch .yes') })
    .then(() => { return setName('.foreign-business-contact-name', 'Charles', 'Francis', 'Xavier') })
    .then(() => { return setOption('.foreign-business-contact-location .toggleable-location .branch .yes.block') })
    .then(() => { return setText('.foreign-business-contact-location .city input', 'Largo') })
    .then(() => { return setText('.foreign-business-contact-location .state input', 'FL') })
    .then(() => { return setText('.foreign-business-contact-location .zipcode input', '33774') })
    .then(() => { return setDate('.foreign-business-contact-date', '1', '1', '2010') })
    .then(() => { return setCountry('.foreign-business-contact-governments input', 'Germany') })
    .then(() => { return setText('.foreign-business-contact-establishment textarea', 'This is a reason for establishment') })
    .then(() => { return setText('.foreign-business-contact-representatives textarea', 'This is a reason for representatives') })
    .then(() => { return setText('.foreign-business-contact-purpose textarea', 'This is a purpose') })
    .then(() => { return setOption('.foreign-business-contact-subsequentcontacts .branch .yes.block') })
    .then(() => { return setText('.foreign-business-contact-subsequent textarea', 'Purpose of subsequent contact') })
    .then(() => { return setDate('.foreign-business-contact-recent', '1', '1', '2013') })
    .then(() => { return setText('.foreign-business-contact-future textarea', 'Future contact plans description') })
    .then(() => { return setOption('.foreign-business-contact-subsequentcontacts .field.required.branch:nth-child(3) .no.block') })
    .then(() => { return setOption('.foreign-business-contact .branch.addendum .no.block') })
}

const completeBusinessSponsorship = (promise) => {
  return promise
    .then(() => { return setOptionBlind('.foreign-business-sponsorship .branch .yes') })
    .then(() => { return setName('.foreign-business-sponsorship-name', 'Charles', 'Francis', 'Xavier') })
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
    .then(() => { return setOptionBlind('.foreign-business-political .branch .yes') })
    .then(() => { return setText('.foreign-business-political-position input', 'President') })
    .then(() => { return setDate('.foreign-business-political-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.foreign-business-political-dates .to', '1', '1', '2011') })
    .then(() => { return setCountry('.foreign-business-political-country input', 'Germany') })
    .then(() => { return setText('.foreign-business-political-reason textarea', 'This is a reason') })
    .then(() => { return setText('.foreign-business-political-eligibility input', 'No longer eligible') })
}

const completeBusinessVoting = (promise) => {
  return promise
    .then(() => { return setOptionBlind('.foreign-business-voting .branch .yes') })
    .then(() => { return setDate('.foreign-business-voting-date', '1', '1', '2010') })
    .then(() => { return setCountry('.foreign-business-voting-country input', 'Germany') })
    .then(() => { return setText('.foreign-business-voting-reason textarea', 'This is a reason') })
    .then(() => { return setText('.foreign-business-voting-eligibility input', 'No longer eligible') })
}

const completeForeignTravel = (promise) => {
  return promise
    .then(() => { return setOption('.foreign-travel-outside .branch .yes') })
    .then(() => { return setOption('.foreign-travel-official .branch .no') })
    .then(() => { return setCountry('.foreign-travel-country input', 'Germany') })
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
  const selector = '.usa-sidenav-list a[aria-controls="/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.usa-sidenav-sub_list a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = (subsection) => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
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
    .pause(500)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-option.png')
}

const setOptionBlind = (selector) => {
  return client
    .execute('scrollTo(0, 0)')
    .getLocationInView(selector)
    .pause(500)
    .assert.visible(selector)
    .click(selector)
    .pause(500)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-option.png')
}

const setOptionWithPause = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(2000)
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
    .pause(2000)
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-text.png')
}

const setCountry = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, [text, client.Keys.ENTER])
    .saveScreenshot('./screenshots/Foreign/' + filenum() + '-set-country.png')
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
