import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { i18n } from 'config'
import * as formTypes from 'config/formTypes'
import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import { SUBSTANCE_USE } from 'constants/sections'
import Intro from './Intro'
import Review from './Review'
import NegativeImpacts from './Alcohol/NegativeImpacts'
import OrderedCounselings from './Alcohol/OrderedCounselings'
import VoluntaryCounselings from './Alcohol/VoluntaryCounselings'
import ReceivedCounselings from './Alcohol/ReceivedCounselings'
import DrugUses from './Drugs/DrugUses'
import DrugInvolvements from './Drugs/DrugInvolvements'
import DrugClearanceUses from './Drugs/DrugClearanceUses'
import DrugPublicSafetyUses from './Drugs/DrugPublicSafetyUses'
import PrescriptionUses from './Drugs/PrescriptionUses'
import OrderedTreatments from './Drugs/OrderedTreatments'
import VoluntaryTreatments from './Drugs/VoluntaryTreatments'

const SubstanceUse = ({ subsection, location, formType }) => {
  const subsectionLibrary = {
    intro: Intro,
    'drugs/usage': DrugUses,
    'drugs/purchase': DrugInvolvements,
    'drugs/clearance': DrugClearanceUses,
    'drugs/publicsafety': DrugPublicSafetyUses,
    'drugs/misuse': PrescriptionUses,
    'drugs/ordered': OrderedTreatments,
    'drugs/voluntary': VoluntaryTreatments,
    'alcohol/negative': NegativeImpacts,
    'alcohol/ordered': OrderedCounselings,
    'alcohol/voluntary': VoluntaryCounselings,
    'alcohol/additional': ReceivedCounselings,
    review: Review,
  }
  const form = formTypes[formType]
  const section = form.find(s => (s.key === SUBSTANCE_USE))
  const flattenedSections = formTypes.reduceSubsections([section])
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

        {flattenedSections.map(sub => (
          <Route
            key={sub.key}
            path={sub.fullPath}
            component={subsectionLibrary[sub.name]}
          />
        ))}

        <SectionNavigation currentPath={location.pathname} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { section } = state
  const auth = state.authentication || {}

  return {
    formType: auth.formType,
    ...section,
  }
}

SubstanceUse.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
  formType: PropTypes.string.isRequired,
}

SubstanceUse.defaultProps = {
  subsection: 'intro',
  location: {},
}

export const SubstanceUseSections = () => <Review />

export default connect(mapStateToProps)(SubstanceUse)
