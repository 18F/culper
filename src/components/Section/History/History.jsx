import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { i18n } from 'config'

import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'

import * as sections from 'constants/sections'

import Intro from 'components/Section/History/Intro'
import ResidenceWrapper from 'components/Section/History/Residence/ResidenceWrapper'
import Residence from 'components/Section/History/Residence'
import EmploymentWrapper from 'components/Section/History/Employment/EmploymentWrapper'
import Employment from 'components/Section/History/Employment'
import EducationWrapper from 'components/Section/History/Education/EducationWrapper'
import Education from 'components/Section/History/Education'

import Review from 'components/Section/History/Review'

import { SectionViews, SectionView } from 'components/Section/SectionView'
import SectionElement from 'components/Section/SectionElement'
import { Field, Svg, Show, Branch } from 'components/Form'

import Federal from 'components/Section/History/Federal'

import {
  utc,
  today,
  daysAgo,
  daysBetween,
  gaps,
  extractDate
} from 'components/Section/History/dateranges'
import { InjectGaps } from 'components/Section/History/summaries'

/**
 * Default sorting of history objects. This assumes that all objects contain a `Dates` property
 * with date range values.
 */
export const sort = (a, b) => {
  // Helper to find the date value or default it to 0
  const getOptionalDate = obj => {
    return (((obj || {}).Item || {}).Dates || {}).to
  }

  const first = extractDate(getOptionalDate(a)) || 0
  const second = extractDate(getOptionalDate(b)) || 0

  if (a.type === 'Gap') {
    return 1
  } else if (b.type === 'Gap') {
    return -1
  } else if (first < second) {
    return 1
  } else if (first > second) {
    return -1
  }

  return 0
}

/**
 * Figure the total amount of years to collect for the timeline
 */
export const totalYears = birthdate => {
  let total = 10
  if (!birthdate) {
    return total
  }

  const eighteen = daysAgo(birthdate, 365 * -18)
  total = Math.ceil(daysBetween(eighteen, today) / 365)

  // A maximum of 10 years is required
  if (total > 10) {
    total = 10
  }

  // A minimum of two years is required
  if (total < 2) {
    total = 2
  }

  return total
}

class History extends SectionElement {
  render() {
    const subsection = this.props.subsection || 'intro'

    const subsectionClasses = classnames(
      'view',
      `view-${subsection}`
    )

    const isReview = subsection === 'review'
    const title = isReview && i18n.t('review.title')
    const para = isReview && i18n.m('review.para')

    /** TODO - this should come from Redux store */
    const formType = 'SF86'
    
    return (
      <div className="history">
        <div className="section-view">
          {title && <h1 className="title">{title}</h1>}
          {para}

          <div className={subsectionClasses}>
            {isReview && (
              <div className="top-btns"><ErrorList /></div>
            )}

            <Route path="/form/history/intro" component={Intro} />
            <Route path="/form/history/residence" component={ResidenceWrapper} />
            <Route path="/form/history/employment" component={EmploymentWrapper} />
            <Route path="/form/history/education" component={EducationWrapper} />
            <Route path="/form/history/review" component={Review} />

            <SectionNavigation
              section={sections.HISTORY}
              subsection={subsection}
              formType={formType} />
          </div>
        </div>

        {/*
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>
          <SectionView
            name="review"
            title={i18n.t('review.title')}
            para={i18n.m('review.para')}
            showTop={true}
            back="history/federal"
            backLabel={i18n.t('history.destination.federal')}
            next="relationships/intro"
            nextLabel={i18n.t('relationships.destination.intro')}>
            {this.residenceSummaryProgress()}
            {this.employmentSummaryProgress()}
            <Show
              when={
                (this.props.Education.HasAttended || {}).value === 'Yes' ||
                (this.props.Education.HasDegree10 || {}).value === 'Yes'
              }>
              {this.educationSummaryProgress()}
            </Show>

            <hr className="section-divider" />
            <h1 className="section-header">{i18n.t('history.residence.collection.caption')}</h1>
            <Residence
              {...this.props.Residence}
              section="history"
              subsection="residence"
              sort={sort}
              totalYears={totalYears(this.props.Birthdate)}
              overrideInitial={this.overrideInitial}
              onUpdate={this.updateResidence}
              onError={this.handleError}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              scrollIntoView={false}
              realtime
              required
            />

            <hr className="section-divider" />
            <h1 className="section-header">{i18n.t('history.employment.default.collection.caption')}</h1>
            <Employment
              {...this.props.Employment}
              section="history"
              subsection="employment"
              sort={sort}
              totalYears={totalYears(this.props.Birthdate)}
              overrideInitial={this.overrideInitial}
              onUpdate={this.updateEmployment}
              onError={this.handleError}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              scrollIntoView={false}
              realtime
              required
            />

            <hr className="section-divider" />
            <h1 className="section-header">{i18n.t('history.education.collection.caption')}</h1>
            <Field
              title={i18n.t('history.education.title')}
              titleSize="h4"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('history.education.info')}
            </Field>

            <Branch
              name="branch_school"
              {...this.props.Education.HasAttended}
              help="history.education.help.attendance"
              label={i18n.t('history.education.label.attendance')}
              labelSize="h3"
              warning={true}
              onUpdate={this.updateBranchAttendance}
            />
            <Show when={this.props.Education.HasAttended.value === 'No'}>
              <Branch
                name="branch_degree10"
                {...this.props.Education.HasDegree10}
                help="history.education.help.degree10"
                label={i18n.t('history.education.label.degree10')}
                labelSize="h3"
                warning={true}
                onUpdate={this.updateBranchDegree10}
              />
            </Show>
            <Show
              when={
                this.props.Education.HasAttended.value === 'Yes' ||
                this.props.Education.HasDegree10.value === 'Yes'
              }>
              <div>
                <span id="scrollToHistory" />
                <Education
                  {...this.props.Education}
                  section="history"
                  subsection="education"
                  realtime={true}
                  sort={sort}
                  totalYears={totalYears(this.props.Birthdate)}
                  overrideInitial={this.overrideInitial}
                  onUpdate={this.updateEducation}
                  onError={this.handleError}
                  dispatch={this.props.dispatch}
                  addressBooks={this.props.AddressBooks}
                  scrollIntoView={false}
                  required={true}
                />
              </div>
            </Show>

            <hr className="section-divider" />
            <h1 className="section-header">{i18n.t('history.destination.federal')}</h1>
            <Federal
              name="federal"
              {...this.props.Federal}
              section="history"
              subsection="federal"
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Federal')}
              onError={this.handleError}
              scrollIntoView={false}
              required={true}
            />
          </SectionView>

          <SectionView
            name="federal"
            back="history/education"
            backLabel={i18n.t('history.destination.education')}
            next="history/review"
            nextLabel={i18n.t('history.destination.review')}>
            <h1 className="section-header">{i18n.t('history.destination.federal')}</h1>
            <Federal
              name="federal"
              {...this.props.Federal}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Federal')}
              onError={this.handleError}
            />
          </SectionView>
            </SectionViews>*/}
      </div>
    )
  }
}

const processDate = date => {
  if (!date) {
    return null
  }

  let d = null
  const { month, day, year } = date.Date
  if (month && day && year) {
    d = utc(new Date(year, month - 1, day))
  }
  return d
}

function mapStateToProps(state) {
  const { section } = state
  const app = state.application || {}
  const identification = app.Identification || {}
  const history = app.History || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    ...section,
    History: history,
    Residence: history.Residence || { List: { items: [] } },
    Employment: history.Employment || { items: [] },
    Education: history.Education || {
      HasAttended: '',
      HasDegree10: '',
      List: { items: [] }
    },
    Federal: history.Federal || {},
    Errors: errors.history || [],
    Completed: completed.history || [],
    Birthdate: processDate(identification.ApplicantBirthDate),
    AddressBooks: addressBooks
  }
}

History.defaultProps = {
  subsection: 'intro',
  section: 'history',
  store: 'History'
}

export class HistorySections extends React.Component {
  render() {
    const noOverride = () => {
      return false
    }
    return (
      <div className="history">
        <Residence
          defaultState={false}
          overrideInitial={true}
          onError={this.props.onError}
          required={true} />

        <Employment
          defaultState={false}
          realtime={true}
          overrideInitial={true}
          onError={this.props.onError}
          required={true}
        />

        <Branch
          name="branch_school"
          {...this.props.Education.HasAttended}
          label={i18n.t('history.education.label.attendance')}
          labelSize="h3"
        />
        <Show when={this.props.Education.HasAttended.value === 'No'}>
          <Branch
            name="branch_degree10"
            {...this.props.Education.HasDegree10}
            label={i18n.t('history.education.label.degree10')}
            labelSize="h3"
          />
        </Show>
        <Show
          when={
            this.props.Education.HasAttended.value === 'Yes' ||
            this.props.Education.HasDegree10.value === 'Yes'
          }>
          <Education
            defaultState={false}
            realtime={true}
            overrideInitial={true}
            onError={this.props.onError}
            required={true}
          />
        </Show>

        <hr className="section-divider" />
        <Federal
          name="federal"
          {...this.props.Federal}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          scrollIntoView={false}
          required={true}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(History)
