import React from 'react'

import { i18n } from '@config'

import connectHistorySection from './HistoryConnector'
import { HISTORY, HISTORY_REVIEW } from '@config/formSections/history'

import ResidenceSummaryProgress from './Residence/ResidenceSummaryProgress'

import Residence from './Residence'

const sectionConfig = {
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_REVIEW.name,
}

const Review = (props) => {
  const { Birthdate } = props

  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    inReview: true,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <ResidenceSummaryProgress
        Residence={props.Residence}
        Birthdate={Birthdate} />
      {/* TODO employment summary progress */}
      {/* TODO education summary progress */}

      <hr className="section-divider" />
      
      <h1 className="section-header">
        {i18n.t('history.residence.collection.caption')}
      </h1>

      <Residence {...subsectionProps} />
    </div>
  )
}

export default connectHistorySection(Review, sectionConfig)
