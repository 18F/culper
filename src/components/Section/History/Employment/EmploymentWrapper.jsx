import React from 'react'

import { i18n } from '@config'

import { Field, Show } from '@components/Form'

import Employment from './Employment'
import EmploymentSummaryProgress from './EmploymentSummaryProgress'

import { sectionHasGaps } from '@components/Section/History/helpers'

import connectHistorySection from '../HistoryConnector'
import { HISTORY, HISTORY_EMPLOYMENT } from '@config/formSections/history'

const sectionConfig = {
  section: HISTORY.name,
  subsection: HISTORY_EMPLOYMENT.name,
}

class EmploymentWrapper extends React.Component {
  render () {
    const { Birthdate } = this.props

    let employmentItems = []
    if (this.props.Employment && this.props.Employment.List && this.props.Employment.List.items) {
      employmentItems = this.props.Employment.List.items
    }
    
    const employmentHasGaps = sectionHasGaps(employmentItems)

    return (
      <div>
        <h1 className="section-header">
          {i18n.t('history.employment.summary.title')}
        </h1>

        <Field
          title={i18n.t('history.employment.heading.employment')}
          titleSize="h3"
          optional={true}
          className="no-margin-bottom">
          {i18n.m('history.employment.para.employment')}
          {i18n.m('history.employment.para.employment2')}
        </Field>

        <span id="scrollToHistory" />

        <EmploymentSummaryProgress
          Employment={this.props.Employment}
          Birthdate={Birthdate} />
          
        <Employment
          scrollToTop="scrollToHistory" />
        
        <Show when={employmentHasGaps}>
          <div className="not-complete">
            <hr className="section-divider" />
            
            <Field
              title={i18n.t('history.employment.heading.exiting')}
              titleSize="h4"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('history.employment.para.exiting')}
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

EmploymentWrapper.defaultProps = {
  Employment: {},
  Birthdate: {},
}

export default connectHistorySection(EmploymentWrapper, sectionConfig)
