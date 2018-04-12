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
  return s + '-' + subcontext
}

defineSupportCode(({Given, Then, When}) => {
  When(/^I click Next to go to psychological (.*?)$/, (subsection) => {
    return navigateToNext(subsection)
  })

  When(/^I navigate to the psychological (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'psychological'
    const sectionTitle = 'Psychological and emotional health'
    navigateToSection(sectionTitle)
    return navigateToSubsection(section, subsection)
  })

  When(/^I fill in the psychological (.*?) section$/, (subsection) => {
    switch (subsection) {
      case 'competence':
        return completePsychologicalCompetence(promise)
      case 'consultations':
        return completePsychologicalConsultations(promise)
      case 'hospitalizations':
        return completePyschologicalHospitalizations(promise)
      case 'diagnoses':
        return completePyschologicalDiagnoses(promise)
      default:
        return promise
    }
  })

  Then(/^I should be in the psychological (.*?) section$/, (subsection) => {
    subcontext = subsection
    return shouldBeInSubsection('psychological', subsection)
  })
})

const completePsychologicalCompetence = (promise) => {
  return promise
    .then(() => { return setOption('.competence .branch .blocks.option-list .yes.block label') })
    .then(() => { return setText('.competence .order .datecontrol .month input', '1') })
    .then(() => { return setText('.competence .order .datecontrol .year input', '2010') })
    .then(() => { return setText('.competence .courtname input', 'Court name for comptence') })
    .then(() => { return setDomesticAddress('.competence .location .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOptionWithPause('.competence .appeals .field.branch .blocks.option-list .yes.block label') })
    .then(() => { return setText('.competence .appeals .appealcourtname input', 'Appeal court name for comptence') })
    .then(() => { return setDomesticAddress('.competence .appeals .location.appealcourtaddress .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setTextWithPause('.competence .appeals .disposition input', 'Final disposition for comptence') })
    .then(() => { return setOption('.competence .branch.addendum .blocks.option-list .no.block label') })
}

const completePsychologicalConsultations = (promise) => {
  return promise
    .then(() => { return setOption('.consultation .branch .blocks.option-list .yes.block label') })
    .then(() => { return setText('.consultation .order .datecontrol .month input', '1') })
    .then(() => { return setText('.consultation .order .datecontrol .year input', '2010') })
    .then(() => { return setText('.consultation .courtname input', 'Court name for comptence') })
    .then(() => { return setDomesticAddress('.consultation .location .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setTextWithPause('.consultation .disposition input', 'Final disposition for comptence') })
    .then(() => { return setOption('.consultation .appeals .field.branch .blocks.option-list .yes.block label') })
    .then(() => { return setText('.consultation .appeals .appealcourtname input', 'Appeal court name for comptence') })
    .then(() => { return setDomesticAddress('.consultation .appeals .location.appealcourtaddress .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setTextWithPause('.consultation .appeals .disposition input', 'Final disposition for comptence') })
    .then(() => { return setOption('.consultation .branch.addendum .blocks.option-list .no.block label') })
}

const completePyschologicalHospitalizations = (promise) => {
  return promise
    .then(() => { return setOption('.hospitalizations .branch .blocks.option-list .yes.block label') })
    .then(() => { return setOption('.hospitalizations .hospitalization .voluntary-option.block label') })
    .then(() => { return setText('.hospitalizations .explanation textarea', 'This is a test explanation') })
    .then(() => { return setText('.hospitalizations .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.hospitalizations .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.hospitalizations .daterange .datecontrol.from .year input', '2000') })
    .then(() => { return setText('.hospitalizations .daterange .datecontrol.to .month input', '2') })
    .then(() => { return setText('.hospitalizations .daterange .datecontrol.to .day input', '2') })
    .then(() => { return setText('.hospitalizations .daterange .datecontrol.to .year input', '2000') })
    .then(() => { return setText('.hospitalizations .facility input', 'Hospital to which I was admitted') })
    .then(() => { return setDomesticAddress('.hospitalizations .location .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOptionWithPause('.hospitalizations .branch.addendum .blocks.option-list .no.block label') })
}

const completePyschologicalDiagnoses = (promise) => {
  return promise
    .then(() => { return setOption('.diagnoses .branch.diagnosed .blocks.option-list .yes.block label') })
    .then(() => { return setOption('.diagnoses .diagnosis .blocks.diagnosis-condition .diagnosis-condition-psychotic label') })
    .then(() => { return setText('.diagnoses .daterange .datecontrol.from .month input', '1') })
    .then(() => { return setText('.diagnoses .daterange .datecontrol.from .day input', '1') })
    .then(() => { return setText('.diagnoses .daterange .datecontrol.from .year input', '2000') })
    .then(() => { return setText('.diagnoses .daterange .datecontrol.to .month input', '2') })
    .then(() => { return setText('.diagnoses .daterange .datecontrol.to .day input', '2') })
    .then(() => { return setText('.diagnoses .daterange .datecontrol.to .year input', '2000') })
    .then(() => { return setText('.diagnoses .person .treatment .treatment-name input', 'Test treatment information') })
    .then(() => { return setDomesticTelephone('.diagnoses .person .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setDomesticAddress('.diagnoses .person .location .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setTextWithPause('.diagnoses .facility .treatment .treatment-name input', 'Test treatment facility information') })
    .then(() => { return setDomesticTelephone('.diagnoses .facility .telephone', '703', '333', '4444', 'Cell') })
    .then(() => { return setDomesticAddress('.diagnoses .facility .location .address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOptionWithPause('.diagnoses .blocks.effective .block label') })
    .then(() => { return setOption('.diagnoses .branch.addendum .blocks.option-list .no.block label') })
}


const navigateToSection = (section) => {
  const selector = '.section a[title="' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.subsection a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = (section) => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-navigate-next.png')
}

const shouldBeInSubsection = (section, subsection) => {
  return client
    .assert.urlContains('/form/' + section + '/' + subsection)
}

const setDomesticAddress = (selector, street, city, state, zipcode) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .street input', street)
    .setValue(selector + ' .city input', city)
    .setValue(selector + ' .state input', state)
    .setValue(selector + ' .zipcode input', zipcode)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-set-address.png')
}

const setDomesticTelephone = (selector, first, second, third) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' input[name="domestic_first"]', first)
    .setValue(selector + ' input[name="domestic_second"]', second)
    .setValue(selector + ' input[name="domestic_third"]', third)
    .click(selector + ' .phonetype-option.cell')
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-set-telephone.png')
}

const setOption = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-set-option.png')
}

const setOptionWithPause = (selector) => {
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(2000)
    .click(selector)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-set-text.png')
}

const setTextWithPause = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .pause(2000)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-set-text.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/Psychological/' + filenum() + '-set-date.png')
}
