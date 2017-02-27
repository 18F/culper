import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, Svg, Show } from '../../Form'
import IntroHeader from '../../Form/IntroHeader'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import SummaryProgress from './SummaryProgress'
import SummaryCounter from './SummaryCounter'
import ReactMarkdown from 'react-markdown'
import HistoryCollection from './HistoryCollection/HistoryCollection'
import Federal from './Federal'
import { utc, today, daysAgo, daysBetween, gaps } from './dateranges'

class History extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection,
      addOnLoad: props.addOnLoad,
      firstTime: true
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.residenceRangeList = this.residenceRangeList.bind(this)
    this.employmentRangesList = this.employmentRangesList.bind(this)
    this.schoolRangesList = this.schoolRangesList.bind(this)
    this.diplomaRangesList = this.diplomaRangesList.bind(this)
    this.addResidence = this.addResidence.bind(this)
    this.addEmployer = this.addEmployer.bind(this)
    this.onValidate = this.onValidate.bind(this)
  }

  componentDidMount () {
    const bicycle = !!(this.props.History && this.props.History.Education && this.props.History.Education.List && this.props.History.Education.List.length > 0)
      || !!(this.props.History && this.props.History.Employment && this.props.History.Employment.List && this.props.History.Employment.List.length > 0)
      || !!(this.props.History && this.props.History.Residence && this.props.History.Residence.List && this.props.History.Residence.List.length > 0)
    this.setState({ firstTime: !bicycle })

    // TODO: This may need to be changed... idea may be that the review is the timeline but
    // this may not be correct.
    const current = this.launch(this.props.History, this.props.subsection, 'timeline')
    if (current !== '') {
      this.props.dispatch(push(`/form/history/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/history/residence'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/history/review'))
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = 'neutral'
    if (this.hasStatus('residence', status, true)
        && this.hasStatus('employment', status, true)
        && this.hasStatus('education', status, true)
        && this.hasStatus('federal', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('residence', status, false)
               || this.hasStatus('employment', status, false)
               || this.hasStatus('education', status, false)
               || this.hasStatus('federal', status, false)) {
      cstatus = 'incomplete'
    }
    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }
    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  /**
   * Update storage values for a subsection
   */
  onUpdate (field, values) {
    this.props.dispatch(updateApplication('History', field, values))
  }

  /**
   * Helper to test whether a subsection is complete
   */
  hasStatus (property, status, val) {
    return (this.props.Completed[property] && this.props.Completed[property].status === val)
      || (status && status[property] && status[property].status === val)
  }

  /**
   * Determine the desired behaviour when visiting the
   * root of a route
   */
  launch (storage, subsection, defaultView) {
    subsection = subsection || ''
    if (subsection === '') {
      let keys = Object.keys(storage)
      if (keys.length === 0 && storage.constructor === Object) {
        return defaultView
      }
    }

    return subsection
  }

  /**
   * Intro to the section when information is present
   */
  intro () {
    return (
      <div className="history intro review-screen">
        <div className="usa-grid-full">
          <IntroHeader Errors={this.props.Errors} Completed={this.props.Completed} />
        </div>
        <div className="review-column">
          <h3>{i18n.t('history.tour.title')}</h3>
          <p>{i18n.t('history.tour.para')}</p>
          <button onClick={this.handleTour}>{i18n.t('history.tour.button')}</button>
        </div>
        <div className="review-column">
          <h3>{i18n.t('history.review.title')}</h3>
          <p>{i18n.t('history.review.para')}</p>
          <button onClick={this.handleReview}>{i18n.t('history.review.button')}</button>
        </div>
      </div>
    )
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
    if (!this.props.Residence || !this.props.Residence.List) {
      return dates
    }

    for (const i of this.props.Residence.List) {
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
    if (!this.props.Employment || !this.props.Employment.List) {
      return dates
    }

    for (const i of this.props.Employment.List) {
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
      if (!i.Item) {
        continue
      }

      if (i.Item.Dates) {
        dates.push(i.Item.Dates)
      }
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
          if (!d.Diploma || !d.Diploma.Date) {
            continue
          }

          if (d.Diploma.Date) {
            dates.push(d.Diploma.Date)
          }
        }
      }
    }

    return dates
  }

  residenceSummaryProgress () {
    return (
      <SummaryProgress className="residence eapp-field-wrap"
                       List={this.residenceRangeList}
                       title={i18n.t('history.residence.summary.title')}
                       unit={i18n.t('history.residence.summary.unit')}
                       total={this.totalYears()}
                       >
        <div className="summary-icon">
          <Svg src="img/residence-house.svg" />
        </div>
      </SummaryProgress>
    )
  }

  employmentSummaryProgress () {
    return (
      <SummaryProgress className="residence eapp-field-wrap"
                       List={this.employmentRangesList}
                       title={i18n.t('history.employment.summary.title')}
                       unit={i18n.t('history.employment.summary.unit')}
                       total={this.totalYears()}
                       >
        <div className="summary-icon">
          <Svg src="img/employer-briefcase.svg" />
        </div>
      </SummaryProgress>
    )
  }

  educationSummaryProgress () {
    return (
      <SummaryCounter className="education eapp-field-wrap"
                      title={i18n.t('history.education.summary.title')}
                      schools={this.schoolRangesList}
                      diplomas={this.diplomaRangesList}
                      schoolsLabel={i18n.t('history.education.summary.schools')}
                      diplomasLabel={i18n.t('history.education.summary.diplomas')}
                      total={this.totalYears()}
                      >
        <div className="summary-icon">
          <Svg src="img/school-cap.svg" />
        </div>
      </SummaryCounter>
    )
  }

  addResidence () {
    this.setState({ addOnLoad: 'Residence' })
  }

  addEmployer () {
    this.setState({ addOnLoad: 'Employment' })
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

        const list = this.props.History[t].List

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

  render () {
    return (
      <div className="history">
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            {this.intro()}
          </SectionView>

          <SectionView name="timeline"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="foreign"
                       nextLabel={i18n.t('foreign.destination.passport')}>
            <h2>{i18n.t('history.timeline.title')}</h2>
            {i18n.m('history.timeline.para1')}
            {i18n.m('history.timeline.para2')}
            <Show when={(!this.props.Employment.List && !this.props.Residence.List) && !this.state.addOnLoad}>
              <div className="add-options">
                <div className="table">
                  <div className="table-cell add-residence">
                    <Svg src="img/residence-house.svg" />
                    <div className="title">
                      {i18n.t('history.timeline.start.residence.title')}
                    </div>
                    <div className="btn">
                      <button className="add usa-button-outline" onClick={this.addResidence}>
                        <span>{i18n.t('history.timeline.start.residence.button')}</span>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div className="table-cell add-employment">
                    <Svg src="img/employer-briefcase.svg" />
                    <div className="title">
                      {i18n.t('history.timeline.start.employment.title')}
                    </div>
                    <div className="btn">
                      <button className="add usa-button-outline" onClick={this.addEmployer}>
                        <span>{i18n.t('history.timeline.start.employment.button')}</span>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Show>

            <Show when={(this.props.Employment.List || this.props.Residence.List || this.state.addOnLoad)}>
              <div>
                { this.residenceSummaryProgress() }
                { this.employmentSummaryProgress() }
                { this.educationSummaryProgress() }
                <HistoryCollection name="timeline"
                                   addOnLoad={this.state.addOnLoad}
                                   history={this.props.History}
                                   types={['Residence', 'Employment', 'Education']}
                                   total={this.totalYears()}
                                   showGaps={!this.state.firstTime}
                                   onResidenceUpdate={this.onUpdate.bind(this, 'Residence')}
                                   onEmploymentUpdate={this.onUpdate.bind(this, 'Employment')}
                                   onEducationUpdate={this.onUpdate.bind(this, 'Education')}
                                   onValidate={this.onValidate}
                                   />
                <Show when={this.hasGaps(['Residence', 'Employment'])}>
                  <div className="not-complete">
                    <hr className="section-divider" />
                    <h2>{i18n.t('history.timeline.heading.exiting')}</h2>
                    {i18n.m('history.timeline.para.exiting')}
                  </div>
                </Show>
              </div>
            </Show>
          </SectionView>

          <SectionView name="residence"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="history/employment"
                       nextLabel={i18n.t('history.destination.employment')}>
            <h2>{i18n.t('history.residence.title')}</h2>
            <p>{i18n.t('history.residence.info')}</p>
            { this.residenceSummaryProgress() }
            <HistoryCollection name="residence"
                               addOnLoad="Residence"
                               history={this.props.History}
                               types={['Residence']}
                               total={this.totalYears()}
                               showGaps={!this.state.firstTime}
                               onResidenceUpdate={this.onUpdate.bind(this, 'Residence')}
                               onValidate={this.onValidate}
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
            { this.employmentSummaryProgress() }
            <HistoryCollection name="employment"
                               addOnLoad="Employment"
                               history={this.props.History}
                               types={['Employment']}
                               total={this.totalYears()}
                               showGaps={!this.state.firstTime}
                               onEmploymentUpdate={this.onUpdate.bind(this, 'Employment')}
                               onValidate={this.onValidate}
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
            { this.educationSummaryProgress() }
            <HistoryCollection name="education"
                               addOnLoad="Education"
                               history={this.props.History}
                               types={['Education']}
                               total={this.totalYears()}
                               showGaps={!this.state.firstTime}
                               onEducationUpdate={this.onUpdate.bind(this, 'Education')}
                               onValidate={this.onValidate}
                               />
          </SectionView>

          <SectionView name="federal"
                       back="history/education"
                       backLabel={i18n.t('history.destination.education')}
                       next="history/review"
                       nextLabel={i18n.t('history.destination.review')}>
            <h2>{i18n.t('history.federal.title')}</h2>
            <Federal name="federal"
                     {...this.props.Federal}
                     onUpdate={this.onUpdate.bind(this, 'Federal')}
                     onValidate={this.onValidate}
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
  let section = state.section || {}
  let app = state.application || {}
  let identification = app.Identification || {}
  let history = app.History || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    History: history,
    Residence: history.Residence || {},
    Employment: history.Employment || {},
    Education: history.Education || {},
    Federal: history.Federal || {},
    Errors: errors.history || [],
    Completed: completed.history || [],
    Birthdate: processDate(identification.ApplicantBirthDate)
  }
}

History.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(History))
