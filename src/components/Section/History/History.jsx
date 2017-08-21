import React from 'react'
import { connect } from 'react-redux'
import { reportCompletion } from '../../../actions/ApplicationActions'
import { EducationValidator } from '../../../validators'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Svg, Show, Branch } from '../../Form'
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
  const getOptionalDate = (obj) => {
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

class History extends SectionElement {
  constructor (props) {
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

  excludeGaps (items) {
    return items.filter(item => !item.type || (item.type && item.type !== 'Gap'))
  }

  updateResidence (values) {
    this.handleUpdate('Residence', values.items)
  }

  updateEmployment (values) {
    this.handleUpdate('Employment', values.items)
  }

  updateEducation (values) {
    let education = this.props.Education || {}
    education.List = values.items
    this.handleUpdate('Education', education)
  }

  updateBranchAttendance (values) {
    let education = this.props.Education || {}
    education.HasAttended = values
    education.HasDegree10 = values === 'No' ? education.HasDegree10 : ''
    education.List = values === 'Yes' ? education.List : []
    this.handleUpdate('Education', education)
    this.props.dispatch(reportCompletion('history', 'education', new EducationValidator(education, education).isValid()))
  }

  updateBranchDegree10 (values) {
    let education = this.props.Education || {}
    education.HasDegree10 = values
    education.List = values === 'Yes' ? education.List : []
    this.handleUpdate('Education', education)
    this.props.dispatch(reportCompletion('history', 'education', new EducationValidator(education, education).isValid()))
  }

  /**
   * Figure the total amount of years to collect for the timeline
   */
  totalYears () {
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
  residenceRangeList () {
    let dates = []
    if (!this.props.Residence) {
      return dates
    }

    for (const i of this.excludeGaps(this.props.Residence)) {
      if (!i.Item) {
        continue
      }

      if (i.Item.Dates) {
        dates.push(i.Item.Dates)
      }
    }

    return dates
  }

  /**
   * Extracts dates used for summary progress and gap analysis for employment
   */
  employmentRangesList () {
    let dates = []
    if (!this.props.Employment) {
      return dates
    }

    for (const i of this.excludeGaps(this.props.Employment)) {
      if (!i.Item) {
        continue
      }

      if (i.Item.Dates) {
        dates.push(i.Item.Dates)
      }
    }

    return dates
  }

  schoolRangesList () {
    let dates = []
    if (!this.props.Education || !this.props.Education.List) {
      return dates
    }

    for (const i of this.props.Education.List) {
      if (!i.Item || !i.Item.Dates || !i.Item.Dates.to || !i.Item.Dates.from) {
        continue
      }

      dates.push(i.Item.Dates)
    }

    return dates
  }

  diplomaRangesList () {
    let dates = []
    if (!this.props.Education || !this.props.Education.List) {
      return dates
    }

    for (const i of this.props.Education.List) {
      if (!i.Item) {
        continue
      }

      if (i.Item.Diplomas) {
        for (const d of i.Item.Diplomas) {
          if (!d.Diploma || !d.Diploma.Date || !d.Diploma.Date.date) {
            continue
          }

          dates.push(d.Diploma.Date)
        }
      }
    }

    return dates
  }

  residenceSummaryProgress () {
    return (
      <SummaryProgress className="residence"
                       List={this.residenceRangeList}
                       title={i18n.t('history.residence.summary.title')}
                       unit={i18n.t('history.residence.summary.unit')}
                       total={this.totalYears()}
                       >
        <div className="summary-icon">
          <Svg src="/img/residence-house.svg" />
        </div>
      </SummaryProgress>
    )
  }

  employmentSummaryProgress () {
    return (
      <SummaryProgress className="residence"
                       List={this.employmentRangesList}
                       title={i18n.t('history.employment.summary.title')}
                       unit={i18n.t('history.employment.summary.unit')}
                       total={this.totalYears()}
                       >
        <div className="summary-icon">
          <Svg src="/img/employer-briefcase.svg" />
        </div>
      </SummaryProgress>
    )
  }

  educationSummaryProgress () {
    return (
      <SummaryCounter className="education"
                      title={i18n.t('history.education.summary.title')}
                      schools={this.schoolRangesList}
                      diplomas={this.diplomaRangesList}
                      schoolsLabel={i18n.t('history.education.summary.schools')}
                      diplomasLabel={i18n.t('history.education.summary.diplomas')}
                      total={this.totalYears()}
                      >
        <div className="summary-icon">
          <Svg src="/img/school-cap.svg" />
        </div>
      </SummaryCounter>
    )
  }

  hasGaps (types) {
    let holes = 0

    if (this.props.History) {
      const start = daysAgo(today, 365 * this.totalYears())

      for (const t of types) {
        // If there is no history it should still display the exiting message
        if (!this.props.History[t]) {
          holes += 1
          continue
        }

        const list = this.props.History[t].filter(item => {
          return item.Item && item.Item.Dates
        })

        // If there is no history it should still display the exiting message
        if (list.length === 0) {
          holes += 1
          continue
        }

        const ranges = list.map(item => { return item.Item.Dates })
        holes += gaps(ranges, start).length
      }
    }

    return holes > 0
  }

  customSummary (item, index, initial, callback, toggle, openText, remove, byline) {
    if (item.type === 'Gap') {
      return null
    }

    return callback()
  }

  fillGap (field, dates) {
    let items = [...this.props.History[field]]
    items.push({
      uuid: super.guid(),
      open: true,
      Item: {
        Dates: {
          receiveProps: true,
          from: dates.from,
          to: dates.to
        }
      }
    })

    this.handleUpdate(field, InjectGaps(items, daysAgo(365 * this.totalYears())).sort(sort))
  }

  overrideInitial (initial) {
    return this.props.subsection === 'review' ? false : initial
  }

  render () {
    return (
      <div className="history">
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="intro"
                       back="financial/review"
                       backLabel={i18n.t('financial.destination.review')}
                       next="history/residence"
                       nextLabel={i18n.t('history.destination.residence')}>
            <h2>{i18n.t('history.intro.title')}</h2>
            {i18n.m('history.intro.body')}
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
                       next="relationships/intro"
                       nextLabel={i18n.t('relationships.destination.intro')}>
            { this.residenceSummaryProgress() }
            { this.employmentSummaryProgress() }
            <Show when={this.props.Education.HasAttended === 'Yes' || this.props.Education.HasDegree10 === 'Yes'}>
              { this.educationSummaryProgress() }
            </Show>

            <Residence value={this.props.Residence}
                       defaultState={false}
                       realtime={true}
                       sort={sort}
                       totalYears={this.totalYears()}
                       overrideInitial={this.overrideInitial}
                       onUpdate={this.updateResidence}
                       onError={this.handleError}
                       addressBooks={this.props.AddressBooks}
                       dispatch={this.props.dispatch}
                       />

            <Employment value={this.props.Employment}
                        defaultState={false}
                        realtime={true}
                        sort={sort}
                        totalYears={this.totalYears()}
                        overrideInitial={this.overrideInitial}
                        onUpdate={this.updateEmployment}
                        onError={this.handleError}
                        addressBooks={this.props.AddressBooks}
                        dispatch={this.props.dispatch}
                        />

            <Show when={this.props.Education.HasAttended === 'Yes' || this.props.Education.HasDegree10 === 'Yes'}>
              <Education value={this.props.Education.List}
                         defaultState={false}
                         realtime={true}
                         sort={sort}
                         totalYears={this.totalYears()}
                         overrideInitial={this.overrideInitial}
                         onUpdate={this.updateEducation}
                         onError={this.handleError}
                         dispatch={this.props.dispatch}
                         />
            </Show>

            <hr />
            <h2>{i18n.t('history.federal.title')}</h2>
            <Federal name="federal"
                     {...this.props.Federal}
                     defaultState={false}
                     addressBooks={this.props.AddressBooks}
                     dispatch={this.props.dispatch}
                     onUpdate={this.handleUpdate.bind(this, 'Federal')}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="residence"
                       back="history/intro"
                       backLabel={i18n.t('history.destination.intro')}
                       next="history/employment"
                       nextLabel={i18n.t('history.destination.employment')}>
            <h2>{i18n.t('history.residence.title')}</h2>
            <h3>{i18n.t('history.residence.info')}</h3>
            {i18n.m('history.residence.info2')}
            {i18n.m('history.residence.info3a')}
            {i18n.m('history.residence.info3b')}
            {i18n.m('history.residence.info3c')}
            <span id="scrollToHistory"></span>
            { this.residenceSummaryProgress() }
            <Residence value={this.props.Residence}
                       scrollTo="scrollToHistory"
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
                <h2>{i18n.t('history.residence.heading.exiting')}</h2>
                {i18n.m('history.residence.para.exiting')}
              </div>
            </Show>
          </SectionView>

          <SectionView name="employment"
                       back="history/residence"
                       backLabel={i18n.t('history.destination.residence')}
                       next="history/education"
                       nextLabel={i18n.t('history.destination.education')}>
            <h2>{i18n.t('history.employment.heading.employment')}</h2>
            {i18n.m('history.employment.para.employment')}
            {i18n.m('history.employment.para.employment2')}
            <span id="scrollToHistory"></span>
            { this.employmentSummaryProgress() }
            <Employment value={this.props.Employment}
                        scrollTo="scrollToHistory"
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
                <h2>{i18n.t('history.employment.heading.exiting')}</h2>
                {i18n.m('history.employment.para.exiting')}
              </div>
            </Show>
          </SectionView>

          <SectionView name="education"
                       back="history/employment"
                       backLabel={i18n.t('history.destination.employment')}
                       next="history/federal"
                       nextLabel={i18n.t('history.destination.federal')}>
            <h2>{i18n.t('history.education.title')}</h2>
            <p>{i18n.t('history.education.info')}</p>
            <Branch name="branch_school"
                    value={this.props.Education.HasAttended}
                    help="history.education.help.attendance"
                    label={i18n.t('history.education.label.attendance')}
                    warning={true}
                    onUpdate={this.updateBranchAttendance}
                    >
            </Branch>
            <Show when={this.props.Education.HasAttended === 'No'}>
              <Branch name="branch_degree10"
                      value={this.props.Education.HasDegree10}
                      help="history.education.help.degree10"
                      label={i18n.t('history.education.label.degree10')}
                      warning={true}
                      onUpdate={this.updateBranchDegree10}
                      >
              </Branch>
            </Show>
            <Show when={this.props.Education.HasAttended === 'Yes' || this.props.Education.HasDegree10 === 'Yes'}>
              <div>
                <span id="scrollToHistory"></span>
                { this.educationSummaryProgress() }
                <Education value={this.props.Education}
                           scrollTo="scrollToHistory"
                           sort={sort}
                           totalYears={this.totalYears()}
                           overrideInitial={this.overrideInitial}
                           onUpdate={this.updateEducation}
                           onError={this.handleError}
                           dispatch={this.props.dispatch}
                           />
              </div>
            </Show>
          </SectionView>

          <SectionView name="federal"
                       back="history/education"
                       backLabel={i18n.t('history.destination.education')}
                       next="history/review"
                       nextLabel={i18n.t('history.destination.review')}
                       >
            <h2>{i18n.t('history.federal.title')}</h2>
            <Federal name="federal"
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

const processDate = (date) => {
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

function mapStateToProps (state) {
  const app = state.application || {}
  const identification = app.Identification || {}
  const history = app.History || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    History: history,
    Residence: history.Residence || [],
    Employment: history.Employment || [],
    Education: history.Education || { HasAttended: '', HasDegree10: '', List: [] },
    Federal: history.Federal || {},
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

export default connect(mapStateToProps)(AuthenticatedView(History))
