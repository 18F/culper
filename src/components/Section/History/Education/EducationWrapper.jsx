import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import { HISTORY, HISTORY_EDUCATION } from 'config/formSections/history'
import * as formConfig from 'config/forms'

import { Field, Show, Branch } from 'components/Form'

import { reportCompletion } from 'actions/ApplicationActions'
import { HistoryEducationValidator } from 'validators'

import ConnectedEducation from './Education'
import EducationSummaryProgress from './EducationSummaryProgress'

import connectHistorySection from '../HistoryConnector'

const sectionConfig = {
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_EDUCATION.name,
}

class EducationWrapper extends React.Component {
  updateBranchAttendance = (values) => {
    const { Education, onUpdate, dispatch } = this.props
    const education = Education || {}
    education.HasAttended = values
    education.HasDegree10 = values.value === 'No' ? education.HasDegree10 : {}
    education.List = values.value === 'Yes' ? education.List : { items: [], branch: {} }

    onUpdate('Education', education)
    dispatch(
      reportCompletion(
        'history',
        'education',
        new HistoryEducationValidator(education, education).isValid(),
      ),
    )
  }

  updateBranchDegree10 = (values) => {
    const { Education, onUpdate, dispatch } = this.props
    const education = Education || {}
    education.HasDegree10 = values
    education.List = values.value === 'Yes' ? education.List : { items: [], branch: {} }

    onUpdate('Education', education)
    dispatch(
      reportCompletion(
        'history',
        'education',
        new HistoryEducationValidator(education, education).isValid(),
      ),
    )
  }

  handleUpdate = (values) => {
    const { Education, onUpdate } = this.props
    const education = Education || {}
    education.List = values
    onUpdate('Education', education)
  }

  render() {
    const {
      Education, Birthdate, formType, inReview,
    } = this.props

    const years = formType
      && formConfig[formType]
      && formConfig[formType].HISTORY_EDUCATION_YEARS

    const hasAttendedSchool = Education.HasAttended.value === 'Yes'
    const hasDegree = Education.HasDegree10.value === 'Yes'

    const reviewProps = inReview ? {
      realtime: true,
      overrideInitial: true,
      scrollIntoView: false,
      required: true,
    } : {
      scrollToTop: 'scrollToHistory',
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
          optional
          className="no-margin-bottom"
        >
          {i18n.m('history.education.info')}
        </Field>

        <Branch
          name="branch_school"
          {...Education.HasAttended}
          help="history.education.help.attendance"
          helpMessage={i18n.m('history.education.help.attendance.message', { years })}
          label={i18n.t('history.education.label.attendance', { years })}
          labelSize={inReview ? 'h3' : 'h4'}
          warning
          onUpdate={this.updateBranchAttendance}
        />

        <Show when={Education.HasAttended.value === 'No'}>
          <Branch
            name="branch_degree10"
            {...Education.HasDegree10}
            help="history.education.help.degree10"
            label={i18n.t('history.education.label.degree10', { years })}
            labelSize={inReview ? 'h3' : 'h4'}
            warning
            onUpdate={this.updateBranchDegree10}
          />
        </Show>

        <Show when={hasAttendedSchool || hasDegree}>
          <div>
            <span id="scrollToHistory" />

            {!inReview && (
              <EducationSummaryProgress
                Education={Education}
                Birthdate={Birthdate}
                years={years}
              />
            )}

            <ConnectedEducation
              onUpdate={this.handleUpdate}
              totalYears={years}
              {...reviewProps}
            />
          </div>
        </Show>
      </div>
    )
  }
}

/* eslint react/forbid-prop-types: 0 */
EducationWrapper.propTypes = {
  Education: PropTypes.object,
  Birthdate: PropTypes.any,
  formType: PropTypes.string.isRequired,
  inReview: PropTypes.bool,
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
