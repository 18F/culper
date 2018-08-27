import React from 'react'
import { connect } from 'react-redux'
import { reportCompletion } from '../../../actions/ApplicationActions'
import {
  ResidenceValidator,
  EmploymentValidator,
  HistoryEducationValidator,
  EducationItemValidator
} from '../../../validators'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field, Svg, Show, Branch } from '../../Form'
import SummaryProgress from './SummaryProgress'
import SummaryCounter from './SummaryCounter'
import Federal from './Federal'
import { utc, today, daysAgo, daysBetween, gaps } from './dateranges'
import { InjectGaps } from './summaries'
import Residence from './Residence'
import Employment from './Employment'
import Education from './Education'

/**
 * Default sorting of history objects. This assumes that all objects contain a `Dates` property
 * with date range values.
 */
export const sort = (a, b) => {
  // Helper to find the date value or default it to 0
  const getOptionalDate = obj => {
    return ((((obj || {}).Item || {}).Dates || {}).to || {}).date || 0
  }

  const first = getOptionalDate(a)
  const second = getOptionalDate(b)

  if (first < second) {
    return 1
  } else if (first > second) {
    return -1
  }

  return 0
}

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
  constructor(props) {
    super(props)

    this.residenceRangeList = this.residenceRangeList.bind(this)
    this.employmentRangesList = this.employmentRangesList.bind(this)
    this.schoolRangesList = this.schoolRangesList.bind(this)
    this.diplomaRangesList = this.diplomaRangesList.bind(this)
    this.updateResidence = this.updateResidence.bind(this)
    this.updateEmployment = this.updateEmployment.bind(this)
    this.updateEducation = this.updateEducation.bind(this)
    this.updateBranchAttendance = this.updateBranchAttendance.bind(this)
    this.updateBranchDegree10 = this.updateBranchDegree10.bind(this)
    this.overrideInitial = this.overrideInitial.bind(this)
  }

  excludeGaps(items) {
    return items.filter(
      item => !item.type || (item.type && item.type !== 'Gap')
    )
  }

  updateResidence(values) {
    this.handleUpdate('Residence', {
      List: values
    })
  }

  updateEmployment(values) {
    this.handleUpdate('Employment', values)
  }

  updateEducation(values) {
    let education = this.props.Education || {}
    education.List = values
    this.handleUpdate('Education', education)
  }

  updateBranchAttendance(values) {
    let education = this.props.Education || {}
    education.HasAttended = values
    education.HasDegree10 = values.value === 'No' ? education.HasDegree10 : {}
    education.List =
      values.value === 'Yes' ? education.List : { items: [], branch: {} }
    this.handleUpdate('Education', education)
    this.props.dispatch(
      reportCompletion(
        'history',
        'education',
        new HistoryEducationValidator(education, education).isValid()
      )
    )
  }

  updateBranchDegree10(values) {
    let education = this.props.Education || {}
    education.HasDegree10 = values
    education.List =
      values.value === 'Yes' ? education.List : { items: [], branch: {} }
    this.handleUpdate('Education', education)
    this.props.dispatch(
      reportCompletion(
        'history',
        'education',
        new HistoryEducationValidator(education, education).isValid()
      )
    )
  }

  /**
   * Figure the total amount of years to collect for the timeline
   */
  totalYears() {
    let total = 10
    if (!this.props.Birthdate) {
      return total
    }

    const eighteen = daysAgo(this.props.Birthdate, 365 * -18)
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

  /**
   * Extracts dates used for summary progress and gap analysis for residence
   */
  residenceRangeList() {
    let dates = []
    if (
      !this.props.Residence ||
      !this.props.Residence.List ||
      !this.props.Residence.List.items
    ) {
      return dates
    }

    for (const i of this.excludeGaps(this.props.Residence.List.items)) {
      if (!i.Item) {
        continue
      }

      if (new ResidenceValidator(i.Item).isValid()) {
        dates.push(i.Item.Dates)
      }
    }

    return dates
  }

  /**
   * Extracts dates used for summary progress and gap analysis for employment
   */
  employmentRangesList() {
    let dates = []
    if (
      !this.props.Employment ||
      !this.props.Employment.List ||
      !this.props.Employment.List.items
    ) {
      return dates
    }

    for (const i of this.excludeGaps(this.props.Employment.List.items)) {
      if (!i.Item) {
        continue
      }

      if (new EmploymentValidator(i.Item).isValid()) {
        dates.push(i.Item.Dates)
      }
    }

    return dates
  }

  schoolRangesList() {
    let dates = []
    if (!this.props.Education || !this.props.Education.List) {
      return dates
    }

    for (const i of this.props.Education.List.items) {
      if (!i.Item || !i.Item.Dates || !i.Item.Dates.to || !i.Item.Dates.from) {
        continue
      }

      if (new EducationItemValidator(i.Item).isValid()) {
        dates.push(i.Item.Dates)
      }
    }

    return dates
  }

  diplomaRangesList() {
    let dates = []
    if (!this.props.Education || !this.props.Education.List) {
      return dates
    }

    for (const i of this.props.Education.List.items) {
      if (!i.Item) {
        continue
      }

      if (!new EducationItemValidator(i.Item).isValid()) {
        continue
      }

      if (i.Item.Diplomas.items) {
        for (const d of i.Item.Diplomas.items) {
          if (!d.Item || !d.Item.Date || !d.Item.Date.date) {
            continue
          }

          dates.push(d.Item.Date)
        }
      }
    }

    return dates
  }

  residenceSummaryProgress() {
    return (
      <SummaryProgress
        className="residence"
        List={this.residenceRangeList}
        title={i18n.t('history.residence.summary.title')}
        unit={i18n.t('history.residence.summary.unit')}
        total={this.totalYears()}>
        <div className="summary-icon">
          <Svg
            src="/img/residence-house.svg"
            alt={i18n.t('history.residence.summary.svgAlt')}
          />
        </div>
      </SummaryProgress>
    )
  }

  employmentSummaryProgress() {
    return (
      <SummaryProgress
        className="residence"
        List={this.employmentRangesList}
        title={i18n.t('history.employment.summary.title')}
        unit={i18n.t('history.employment.summary.unit')}
        total={this.totalYears()}>
        <div className="summary-icon">
          <Svg
            src="/img/employer-briefcase.svg"
            alt={i18n.t('history.employment.summary.svgAlt')}
          />
        </div>
      </SummaryProgress>
    )
  }

  educationSummaryProgress() {
    return (
      <SummaryCounter
        className="education"
        title={i18n.t('history.education.summary.title')}
        schools={this.schoolRangesList}
        diplomas={this.diplomaRangesList}
        schoolsLabel={i18n.t('history.education.summary.schools')}
        diplomasLabel={i18n.t('history.education.summary.diplomas')}
        total={this.totalYears()}>
        <div className="summary-icon">
          <Svg
            src="/img/school-cap.svg"
            alt={i18n.t('history.education.summary.svgAlt')}
          />
        </div>
      </SummaryCounter>
    )
  }

  hasGaps(types) {
    let holes = 0

    if (this.props.History) {
      const start = daysAgo(today, 365 * this.totalYears())

      for (const t of types) {
        let items = []
        if (t === 'Employment') {
          items = ((this.props.History[t] && this.props.History[t].List) || {})
            .items
        } else {
          // Move?
          items = ((this.props.History[t] && this.props.History[t].List) || {})
            .items
        }

        // If there is no history it should still display the exiting message
        if (!items) {
          holes += 1
          continue
        }

        const list = items.filter(item => {
          return item.Item && item.Item.Dates
        })

        // If there is no history it should still display the exiting message
        if (list.length === 0) {
          holes += 1
          continue
        }

        const ranges = list.map(item => {
          return item.Item.Dates
        })
        holes += gaps(ranges, start).length
      }
    }

    return holes > 0
  }

  overrideInitial(initial) {
    return this.props.subsection === 'review' ? false : initial
  }

  render() {
    return (
      <div className="history">
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>
          <SectionView
            name="intro"
            back="identification/review"
            backLabel={i18n.t('identification.destination.review')}
            next="history/residence"
            nextLabel={i18n.t('history.destination.residence')}>
            <Field
              title={i18n.t('history.intro.title')}
              titleSize="h2"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('history.intro.body')}
            </Field>
          </SectionView>

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
            <span className="section-heading">
              <Svg
                src="/img/residence-house.svg"
                alt={i18n.t('history.residence.summary.svgAlt')}
              />
              {i18n.t('history.residence.collection.caption')}
            </span>
            <Residence
              {...this.props.Residence}
              section="history"
              subsection="residence"
              defaultState={false}
              realtime={true}
              sort={sort}
              totalYears={this.totalYears()}
              overrideInitial={this.overrideInitial}
              onUpdate={this.updateResidence}
              onError={this.handleError}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              scrollIntoView={false}
              required={true}
            />

            <hr className="section-divider" />
            <span className="section-heading">
              <Svg
                src="/img/employer-briefcase.svg"
                alt={i18n.t('history.employment.summary.svgAlt')}
              />
              {i18n.t('history.employment.default.collection.caption')}
            </span>
            <Employment
              {...this.props.Employment}
              section="history"
              subsection="employment"
              defaultState={false}
              realtime={true}
              sort={sort}
              totalYears={this.totalYears()}
              overrideInitial={this.overrideInitial}
              onUpdate={this.updateEmployment}
              onError={this.handleError}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              scrollIntoView={false}
              required={true}
            />

            <hr className="section-divider" />
            <span className="section-heading">
              <Svg
                src="/img/school-cap.svg"
                alt={i18n.t('history.education.summary.svgAlt')}
              />
              {i18n.t('history.education.collection.caption')}
            </span>

            <Field
              title={i18n.t('history.education.title')}
              titleSize="h2"
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
                  defaultState={false}
                  realtime={true}
                  sort={sort}
                  totalYears={this.totalYears()}
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
            <Federal
              name="federal"
              {...this.props.Federal}
              section="history"
              subsection="federal"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Federal')}
              onError={this.handleError}
              scrollIntoView={false}
              required={true}
            />

            <hr className="section-divider" />
            <SectionComments
              name="comments"
              {...this.props.Comments}
              title={i18n.t('history.review.comments')}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Comments')}
              onError={this.handleError}
              required={false}
              scrollIntoView={false}
            />
          </SectionView>

          <SectionView
            name="residence"
            back="history/intro"
            backLabel={i18n.t('history.destination.intro')}
            next="history/employment"
            nextLabel={i18n.t('history.destination.employment')}>
            <Field
              title={i18n.t('history.residence.info')}
              titleSize="h2"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('history.residence.info2')}
              {i18n.m('history.residence.info3a')}
              {i18n.m('history.residence.info3b')}
              {i18n.m('history.residence.info3c')}
            </Field>

            <span id="scrollToHistory" />
            {this.residenceSummaryProgress()}
            <Residence
              {...this.props.Residence}
              scrollToTop="scrollToHistory"
              realtime={true}
              sort={sort}
              totalYears={this.totalYears()}
              overrideInitial={this.overrideInitial}
              onUpdate={this.updateResidence}
              onError={this.handleError}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
            />

            <Show when={this.hasGaps(['Residence'])}>
              <div className="not-complete">
                <hr className="section-divider" />
                <Field
                  title={i18n.t('history.residence.heading.exiting')}
                  titleSize="h2"
                  optional={true}
                  className="no-margin-bottom">
                  {i18n.m('history.residence.para.exiting')}
                </Field>
              </div>
            </Show>
          </SectionView>

          <SectionView
            name="employment"
            back="history/residence"
            backLabel={i18n.t('history.destination.residence')}
            next="history/education"
            nextLabel={i18n.t('history.destination.education')}>
            <Field
              title={i18n.t('history.employment.heading.employment')}
              titleSize="h2"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('history.employment.para.employment')}
              {i18n.m('history.employment.para.employment2')}
            </Field>

            <span id="scrollToHistory" />
            {this.employmentSummaryProgress()}
            <Employment
              {...this.props.Employment}
              scrollToTop="scrollToHistory"
              sort={sort}
              totalYears={this.totalYears()}
              overrideInitial={this.overrideInitial}
              onUpdate={this.updateEmployment}
              onError={this.handleError}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
            />

            <Show when={this.hasGaps(['Employment'])}>
              <div className="not-complete">
                <hr className="section-divider" />
                <Field
                  title={i18n.t('history.employment.heading.exiting')}
                  titleSize="h2"
                  optional={true}
                  className="no-margin-bottom">
                  {i18n.m('history.employment.para.exiting')}
                </Field>
              </div>
            </Show>
          </SectionView>

          <SectionView
            name="education"
            back="history/employment"
            backLabel={i18n.t('history.destination.employment')}
            next="history/federal"
            nextLabel={i18n.t('history.destination.federal')}>
            <Field
              title={i18n.t('history.education.title')}
              titleSize="h2"
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
                {this.educationSummaryProgress()}
                <Education
                  {...this.props.Education}
                  scrollToTop="scrollToHistory"
                  sort={sort}
                  totalYears={this.totalYears()}
                  overrideInitial={this.overrideInitial}
                  onUpdate={this.updateEducation}
                  onError={this.handleError}
                  dispatch={this.props.dispatch}
                  addressBooks={this.props.AddressBooks}
                />
              </div>
            </Show>
          </SectionView>

          <SectionView
            name="federal"
            back="history/education"
            backLabel={i18n.t('history.destination.education')}
            next="history/review"
            nextLabel={i18n.t('history.destination.review')}>
            <Federal
              name="federal"
              {...this.props.Federal}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Federal')}
              onError={this.handleError}
            />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

const processDate = date => {
  if (!date) {
    return null
  }

  let d = null
  const { month, day, year } = date
  if (month && day && year) {
    d = utc(new Date(year, month - 1, day))
  }
  return d
}

function mapStateToProps(state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const history = app.History || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    History: history,
    Residence: history.Residence || { List: { items: [] } },
    Employment: history.Employment || { items: [] },
    Education: history.Education || {
      HasAttended: '',
      HasDegree10: '',
      List: { items: [] }
    },
    Federal: history.Federal || {},
    Comments: history.Comments || {},
    Errors: errors.history || [],
    Completed: completed.history || [],
    Birthdate: processDate(identification.ApplicantBirthDate),
    AddressBooks: addressBooks
  }
}

History.defaultProps = {
  section: 'history',
  store: 'History'
}

export class HistorySections extends React.Component {
  render() {
    const noOverride = () => {
      return false
    }
    return (
      <div>
        <Residence
          {...this.props.Residence}
          defaultState={false}
          realtime={true}
          sort={sort}
          totalYears={totalYears(this.props.Birthdate)}
          overrideInitial={noOverride}
          onError={this.props.onError}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          scrollIntoView={false}
          required={true}
        />

        <Employment
          {...this.props.Employment}
          {...this.props.Employment}
          defaultState={false}
          realtime={true}
          sort={sort}
          totalYears={totalYears(this.props.Birthdate)}
          overrideInitial={noOverride}
          onError={this.props.onError}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          scrollIntoView={false}
          required={true}
        />

        <Show
          when={
            this.props.Education.HasAttended.value === 'Yes' ||
            this.props.Education.HasDegree10.value === 'Yes'
          }>
          <Education
            {...this.props.Education}
            defaultState={false}
            realtime={true}
            sort={sort}
            totalYears={totalYears(this.props.Birthdate)}
            overrideInitial={noOverride}
            onError={this.props.onError}
            dispatch={this.props.dispatch}
            addressBooks={this.props.AddressBooks}
            scrollIntoView={false}
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

        <hr className="section-divider" />
        <SectionComments
          name="comments"
          {...this.props.Comments}
          title={i18n.t('history.review.comments')}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={false}
          scrollIntoView={false}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthenticatedView(History))
