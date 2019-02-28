import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { i18n } from 'config'
import { SectionView } from 'components/Section/SectionView'
import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
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
import { FOREIGN } from 'config/formSections/foreign'
import Review from './Review'
import Intro from './Intro'

class Foreign extends SectionElement {
  render() {
    const { formType } = this.props
    const subsection = this.props.subsection || 'intro'
    const subsectionClasses = `view view-${subsection || 'unknown'}`
    const isReview = subsection === 'review'
    const title = isReview && i18n.t('review.title')
    const para = isReview && i18n.m('review.para')
    return (
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}
        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

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
          <Route path="/form/foreign/review" component={Review} />

          <SectionNavigation
            section={FOREIGN.name}
            subsection={subsection}
            formType={formType}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, section } = state

  return {
    formType: authentication.formType,
    ...section,
  }
}

Foreign.defaultProps = {
  subsection: 'intro',
  store: 'Foreign',
  scrollToBottom: SectionView.BottomButtonsSelector,
}

export default connect(mapStateToProps)(Foreign)

export const ForeignSections = () => <Review />
