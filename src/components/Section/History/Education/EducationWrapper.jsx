import React from 'react'

import { i18n } from '@config'

import { Field, Show, Branch } from '@components/Form'

import Education from './Education'
import EducationSummaryProgress from './EducationSummaryProgress'

import connectHistorySection from '../HistoryConnector'
import { HISTORY, HISTORY_EDUCATION } from '@config/formSections/history'

import { reportCompletion } from '@actions/ApplicationActions'
import { HistoryEducationValidator } from '@validators'

const sectionConfig = {
  section: HISTORY.name,
  subsection: HISTORY_EDUCATION.name,
}

class EducationWrapper extends React.Component {
  updateBranchAttendance = (values) => {
    const education = this.props.Education || {}
    education.HasAttended = values
    education.HasDegree10 = values.value === 'No' ? education.HasDegree10 : {}
    education.List = values.value === 'Yes' ? education.List : { items: [], branch: {} }

    this.props.onUpdate('Education', education)
    this.props.dispatch(
      reportCompletion(
        'history',
        'education',
        new HistoryEducationValidator(education, education).isValid()
      )
    )
  }

  updateBranchDegree10 = (values) => {
    const education = this.props.Education || {}
    education.HasDegree10 = values
    education.List = values.value === 'Yes' ? education.List : { items: [], branch: {} }
    
    this.props.onUpdate('Education', education)
    this.props.dispatch(
      reportCompletion(
        'history',
        'education',
        new HistoryEducationValidator(education, education).isValid()
      )
    )
  }

  handleUpdate = (values) => {
    const education = this.props.Education || {}
    education.List = values
    this.props.onUpdate('Education', education)
  }

  render () {
    const { Birthdate, inReview } = this.props

    const hasAttendedSchool = this.props.Education.HasAttended.value === 'Yes'
    const hasDegree = this.props.Education.HasDegree10.value === 'Yes'

    const reviewProps = inReview ? {
      realtime: true,
      overrideInitial: true,
      scrollIntoView: false,
      required: true,
    } : {
      scrollToTop: 'scrollToHistory'
    }

    return (
      <div>
        {!inReview && (
          <h1 className="section-header">
            {i18n.t('history.education.summary.title')}
          </h1>
        )}

        <Field
          title={i18n.t('history.education.title')}
          titleSize={inReview ? 'h4' : 'h3'}
          optional={true}
          className="no-margin-bottom">
          {i18n.m('history.education.info')}
        </Field>

        <Branch
          name="branch_school"
          {...this.props.Education.HasAttended}
          help="history.education.help.attendance"
          label={i18n.t('history.education.label.attendance')}
          labelSize={inReview ? 'h3' : 'h4'}
          warning={true}
          onUpdate={this.updateBranchAttendance} />

        <Show when={this.props.Education.HasAttended.value === 'No'}>
          <Branch
            name="branch_degree10"
            {...this.props.Education.HasDegree10}
            help="history.education.help.degree10"
            label={i18n.t('history.education.label.degree10')}
            labelSize={inReview ? 'h3' : 'h4'}
            warning={true}
            onUpdate={this.updateBranchDegree10} />
        </Show>

        <Show when={hasAttendedSchool || hasDegree}>
          <div>
            <span id="scrollToHistory" />

            {!inReview && (
              <EducationSummaryProgress
                Education={this.props.Education}
                Birthdate={Birthdate} />
            )}

            <Education
              onUpdate={this.handleUpdate}
              {...reviewProps} />
          </div>
        </Show>
      </div>
    )
  }
}

EducationWrapper.defaultProps = {
  Education: {
    HasAttended: '',
    HasDegree10: '',
    List: { items: [] },
  },
  Birthdate: {},
  inReview: false,
}

export default connectHistorySection(EducationWrapper, sectionConfig)
