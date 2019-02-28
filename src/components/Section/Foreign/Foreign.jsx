import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router'
import { SectionView } from 'components/Section/SectionView'
import SectionElement from 'components/Section/SectionElement'
import Passport from 'components/Section/Foreign/Passport'
import Contacts from 'components/Section/Foreign/Contacts'
import Travel from 'components/Section/Foreign/Travel'
import {
  DirectActivity,
  IndirectActivity,
  RealEstateActivity,
  BenefitActivity,
  Support,
} from 'components/Section/Foreign/Activities'
import {
  Advice,
  Family,
  Employment,
  Ventures,
  Conferences,
  Contact,
  Sponsorship,
  Political,
  Voting,
} from 'components/Section/Foreign/Business'
import { extractOtherNames } from 'components/Section/extractors'
import Review from './Review'
import Intro from './Intro'

class Foreign extends SectionElement {
  render() {
    return (
      <div>
        <Route path="/form/foreign/intro" component={Intro} />
        <Route path="/form/foreign/passport" component={Passport} />
        <Route path="/form/foreign/contacts" component={Contacts} />
        <Route path="/form/foreign/activities/direct" component={DirectActivity} />
        <Route path="/form/foreign/activities/indirect" component={IndirectActivity} />
        <Route path="/form/foreign/activities/realestate" component={RealEstateActivity} />
        <Route path="/form/foreign/activities/benefits" component={BenefitActivity} />
        <Route path="/form/foreign/activities/support" component={Support} />
        <Route path="/form/foreign/business/advice" component={Advice} />
        <Route path="/form/foreign/business/family" component={Family} />
        <Route path="/form/foreign/business/employment" component={Employment} />
        <Route path="/form/foreign/business/ventures" component={Ventures} />
        <Route path="/form/foreign/business/conferences" component={Conferences} />
        <Route path="/form/foreign/business/contact" component={Contact} />
        <Route path="/form/foreign/business/sponsorship" component={Sponsorship} />
        <Route path="/form/foreign/business/political" component={Political} />
        <Route path="/form/foreign/business/voting" component={Voting} />
        <Route path="/form/foreign/travel" component={Travel} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const foreign = app.Foreign || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  const names = extractOtherNames(app)
  return {
    applicantBirthdate: (identification.ApplicantBirthDate || {}).Date,
    Foreign: foreign,
    Passport: foreign.Passport || {},
    Contacts: foreign.Contacts || {},
    DirectActivity: foreign.DirectActivity || {},
    IndirectActivity: foreign.IndirectActivity || {},
    RealEstateActivity: foreign.RealEstateActivity || {},
    BenefitActivity: foreign.BenefitActivity || {},
    Support: foreign.Support || {},
    Advice: foreign.Advice || {},
    Family: foreign.Family || {},
    Employment: foreign.Employment || {},
    Ventures: foreign.Ventures || {},
    Conferences: foreign.Conferences || {},
    Contact: foreign.Contact || {},
    Sponsorship: foreign.Sponsorship || {},
    Political: foreign.Political || {},
    Voting: foreign.Voting || {},
    Travel: foreign.Travel || {},
    Errors: errors.foreign || [],
    Completed: completed.foreign || [],
    suggestedNames: names,
    AddressBooks: addressBooks,
  }
}

Foreign.defaultProps = {
  section: 'foreign',
  store: 'Foreign',
  scrollToBottom: SectionView.BottomButtonsSelector,
}

export const ForeignSections = () => <Review />

export default withRouter(connect(mapStateToProps)(Foreign))
