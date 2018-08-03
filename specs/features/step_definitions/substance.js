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
  When(/^I click Next to go to substance (.*?)$/, (subsection) => {
    subcontext = subsection
    return navigateToNext(subsection)
    })

  When(/^I navigate to the substance (.*?) section$/, (subsection) => {
    subcontext = subsection
    const section = 'substance'
    navigateToSection(section)
    return navigateToSubsection(section, subsection)
  })

  When(/^I fill in the substance (.*?) section (.*?) subsection$/, (section, subsection) => {
    switch (subsection) {
      // "alcohol" subsections
      case 'negative':
        return completeAlcoholNegative(promise)
      case 'ordered':
        return completeAlcoholOrdered(promise)
      case 'voluntary':
        return completeAlcoholVoluntary(promise)
      case 'additional':
        return completeAlcoholAdditional(promise)
      // "drugs" subsections
      case 'usage':
        return completeDrugsUsage(promise)
      case 'purchase':
        return completeDrugsPurchase(promise)
      case 'clearance':
        return completeDrugsClearance(promise)
      case 'publicsafety':
        return completeDrugsPublicSafety(promise)
      case 'misuse':
        return completeDrugsMisuse(promise)
      case 'ordered':
        return completeDrugsOrderedTreatment(promise)
      case 'voluntary':
        return completeDrugsVoluntaryTreatment(promise)
      default:
        return promise
    }
  })

  Then(/^I should be in the substance (.*?) section$/, (subsection) => {
    subcontext = subsection
    return shouldBeInSubsection('substance', subsection)
  })
})

const completeAlcoholNegative = (promise) => {
  return promise
    .then(() => { return setOption('.negative-impacts .has-impacts .yes') })
    .then(() => { return setDate('.negative-impacts .occurred', '1', '1', '2010') })
    .then(() => { return setText('.negative-impacts .negative-impact .circumstances textarea', 'Circumstance') })
    .then(() => { return setText('.negative-impacts .negative-impact .negative-impact-explanation textarea', 'Negative impact') })
    .then(() => { return setDate('.negative-impacts .negative-impact .used .from', '1', '1', '2010') })
    .then(() => { return setDate('.negative-impacts .negative-impact .used .to', '1', '1', '2011') })
}

const completeAlcoholOrdered = (promise) => {
  return promise
    .then(() => { return setOption('.ordered-counselings .has-been-ordered .yes') })
    .then(() => { return setOption('.ordered-counselings .ordered-counseling .seekers-employer') })
    .then(() => { return setOption('.ordered-counselings .ordered-counseling .action-taken .yes') })
    .then(() => { return setDate('.ordered-counselings .ordered-counseling .counseling-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.ordered-counselings .ordered-counseling .counseling-dates  .to', '1', '1', '2011') })
    .then(() => { return setDomesticAddress('.ordered-counselings .ordered-counseling .provider-address', '13709 Walsingham Rd', 'Largo', 'FL', '33774') })
    .then(() => { return setOption('.ordered-counselings .completed-treatment .no') })
    .then(() => { return setText('.ordered-counselings .no-completed-treatment textarea', 'Stuff') })
    .then(() => { return setDomesticTelephone('.ordered-counselings .telephone', '703', '111', '2222', 'Cell') })
}

const completeAlcoholVoluntary = (promise) => {
  return promise
    .then(() => { return setOption('.voluntary-counselings .sought-treatment .yes') })
    .then(() => { return setDate('.voluntary-counselings .counseling-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.voluntary-counselings .counseling-dates  .to', '1', '1', '2011') })
    .then(() => { return setText('.voluntary-counselings .treatment-provider-name input', 'Provider') })
    .then(() => { return setDomesticAddress('.voluntary-counselings .provider-address', '123 Some Rd', 'Arlington', 'VA', '22202') })
    .then(() => { return setDomesticTelephone('.voluntary-counselings .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setOption('.voluntary-counselings .completed-treatment .no') })
    .then(() => { return setText('.voluntary-counselings .no-completed-treatment textarea', 'Stuff') })
}

const completeAlcoholAdditional = (promise) => {
  return promise
    .then(() => { return setOption('.received-counselings .received-treatment .yes') })
    .then(() => { return setText('.received-counselings .treatment-provider-name input', 'Provider') })
    .then(() => { return setDomesticAddress('.received-counselings .provider-address', '123 Some Rd', 'Arlington', 'VA', '22202') })
    .then(() => { return setText('.received-counselings .agency-name input', 'Agency') })
    .then(() => { return setOption('.received-counselings .use-same-address .yes') })
    .then(() => { return setDate('.received-counselings .treatment-began-date', '1', '1', '2010') })
    .then(() => { return setDate('.received-counselings .treatment-end-date', '1', '1', '2011') })
    .then(() => { return setOption('.received-counselings .completed-treatment .yes') })
    .then(() => { return setText('.received-counselings .no-completed-treatment textarea', 'Stuff') })
}

const completeDrugsUsage = (promise) => {
  return promise
    .then(() => { return setOption('.used-drugs .yes') })
    .then(() => { return setOption('.drug-type-use .cocaine') })
    .then(() => { return setDate('.first-use', '1', '1', '2010') })
    .then(() => { return setDate('.recent-use', '1', '1', '2010') })
    .then(() => { return setText('.nature-of-use textarea', 'Nature of use') })
    .then(() => { return setOption('.use-while-employed .yes') })
    .then(() => { return setOption('.use-with-clearance .yes') })
    .then(() => { return setOption('.use-in-future .yes') })
    .then(() => { return setText('.explanation textarea', 'The explanation') })
}

const completeDrugsPurchase = (promise) => {
  return promise
    .then(() => { return setOption('.involved .yes') })
    .then(() => { return setOption('.drug-type-involvement .cocaine') })
    .then(() => { return setDate('.first-involvement', '1', '1', '2010') })
    .then(() => { return setDate('.recent-involvement', '1', '1', '2012') })
    .then(() => { return setText('.nature-of-involvement textarea', 'Nature of use') })
    .then(() => { return setText('.reasons textarea', 'The reason') })
    .then(() => { return setOption('.involvement-while-employed .yes') })
    .then(() => { return setOption('.involvement-with-clearance .yes') })
    .then(() => { return setOption('.involvement-in-future .yes') })
    .then(() => { return setText('.explanation textarea', 'The explanation') })
}

const completeDrugsClearance = (promise) => {
  return promise
    .then(() => { return setOption('.used-drugs .yes') })
    .then(() => { return setText('.description textarea', 'The description') })
    .then(() => { return setDate('.involvement-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.involvement-dates .to', '1', '1', '2012') })
    .then(() => { return setText('.estimated-use input', 'Estimated use') })
}

const completeDrugsPublicSafety = (promise) => {
  return promise
    .then(() => { return setOption('.used-drugs .yes') })
    .then(() => { return setText('.description textarea', 'The description') })
    .then(() => { return setDate('.involvement-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.involvement-dates .to', '1', '1', '2012') })
    .then(() => { return setText('.estimated-use input', 'Estimated use') })
}

const completeDrugsMisuse = (promise) => {
  return promise
    .then(() => { return setOption('.misused .yes') })
    .then(() => { return setText('.prescription-name input', 'The prescription') })
    .then(() => { return setDate('.involvement-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.involvement-dates .to', '1', '1', '2012') })
    .then(() => { return setText('.reason textarea', 'The reason') })
    .then(() => { return setOption('.use-while-employed .yes') })
    .then(() => { return setOption('.use-with-clearance .yes') })
}

const completeDrugsOrderedTreatment = (promise) => {
  return promise
    .then(() => { return setOption('.treatment-ordered .yes') })
    .then(() => { return setOption('.ordered-by .employer') })
    .then(() => { return setText('.explanation textarea', 'The explanation') })
    .then(() => { return setOption('.action-taken .yes') })
    .then(() => { return setOption('.drug-type-ordered .cocaine') })
    .then(() => { return setText('.treatment-provider input', 'Provider, The') })
    .then(() => { return setDomesticAddress('.treatment-provider-address', '123', 'Arlington', 'VA', '22202') })
    .then(() => { return setDomesticTelephone('.treatment-provider-telephone .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setDate('.treatment-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.treatment-dates .to', '1', '1', '2012') })
    .then(() => { return setOption('.treatment-completed .no') })
    .then(() => { return setText('.no-treatment-explanation textarea', 'No treatment explanation') })
}

const completeDrugsVoluntaryTreatment = (promise) => {
  return promise
    .then(() => { return setOption('.treatment-voluntary .yes') })
    .then(() => { return setOption('.drug-type-voluntary .cocaine') })
    .then(() => { return setText('.treatment-provider input', 'Provider, The') })
    .then(() => { return setDomesticAddress('.treatment-provider-address', '123', 'Arlington', 'VA', '22202') })
    .then(() => { return setDomesticTelephone('.treatment-provider-telephone .telephone', '703', '111', '2222', 'Cell') })
    .then(() => { return setDate('.treatment-dates .from', '1', '1', '2010') })
    .then(() => { return setDate('.treatment-dates .to', '1', '1', '2012') })
    .then(() => { return setOption('.treatment-completed .no') })
    .then(() => { return setText('.no-treatment-explanation textarea', 'No treatment explanation') })
}

const navigateToSection = (section) => {
  const selector = '.usa-sidenav-list a[aria-controls="/form/' + section + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-navigate-section.png')
}

const navigateToSubsection = (section, subsection) => {
  const selector = '.usa-sidenav-sub_list a[href="/form/' + section + '/' + subsection + '"]'
  return client
    .assert.visible(selector)
    .click(selector)
    .click(selector)
    .pause(1000)
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-navigate-subsection.png')
}

const navigateToNext = (subsection) => {
  return client
    .assert.visible('button.next')
    .click('button.next')
    .pause(1000)
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-navigate-next.png')
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
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-set-option.png')
}

const setText = (selector, text) => {
  return client
    .assert.visible(selector)
    .setValue(selector, text)
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-set-text.png')
}

const setDate = (selector, month, day, year) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .month input', month)
    .setValue(selector + ' .day input', day)
    .setValue(selector + ' .year input', year)
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-set-date.png')
}

const setDomesticAddress = (selector, street, city, state, zipcode) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' .mailing input', street)
    .setValue(selector + ' .city input', city)
    .setValue(selector + ' .state input', state)
    .setValue(selector + ' .zipcode input', zipcode)
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-set-address.png')
}

const setDomesticTelephone = (selector, first, second, third) => {
  return client
    .assert.visible(selector)
    .setValue(selector + ' input[name="domestic_first"]', first)
    .setValue(selector + ' input[name="domestic_second"]', second)
    .setValue(selector + ' input[name="domestic_third"]', third)
    .click(selector + ' .phonetype-option.cell')
    .saveScreenshot('./screenshots/Substance/' + filenum() + '-set-telephone.png')
}
