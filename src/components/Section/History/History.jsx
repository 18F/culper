import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, Accordion, Svg, Show } from '../../Form'
import IntroHeader from '../../Form/IntroHeader'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import SummaryProgress from './SummaryProgress'
import SummaryCounter from './SummaryCounter'
import Federal from './Federal'
import { utc, today, daysAgo, daysBetween, gaps } from './dateranges'
import { InjectGaps, EmploymentSummary, ResidenceSummary, EducationSummary } from './summaries'
import { ResidenceItem } from './Residence'
import { EmploymentItem } from './Employment'
import { EducationItem } from './Education'
import { Gap } from './Gap'

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

    this.onValidate = this.onValidate.bind(this)
    this.updateResidence = this.updateResidence.bind(this)
    this.updateEmployment = this.updateEmployment.bind(this)
    this.updateEducation = this.updateEducation.bind(this)
  }

  componentDidMount () {
    const bicycle = !!(this.props.History && this.props.History.Education && this.props.History.Education.List && this.props.History.Education.List.length > 0)
          || !!(this.props.History && this.props.History.Employment && this.props.History.Employment.List && this.props.History.Employment.List.length > 0)
      || !!(this.props.History && this.props.History.Residence && this.props.History.Residence.List && this.props.History.Residence.List.length > 0)
    this.setState({ firstTime: !bicycle })

    const current = this.launch(this.props.History, this.props.subsection, 'residence')
    if (current !== '') {
      this.props.dispatch(push(`/form/${this.props.Section.section}/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push(`/form/${this.props.Section.section}/residence`))
  }

  handleReview (event) {
    this.props.dispatch(push(`/form/${this.props.Section.section}/review`))
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

  updateResidence (values) {
    // this.onUpdate('Residence', values.filter(item => !!item.type && item.type !== 'Gap'))
    this.onUpdate('Residence', values)
  }

  updateEmployment (values) {
    // this.onUpdate('Employment', values.filter(item => !!item.type && item.type !== 'Gap'))
    this.onUpdate('Employment', values)
  }

  updateEducation (values) {
    this.onUpdate('Education', values)
  }

  /**
   * Default sorting of history objects. This assumes that all objects contain a `Dates` property
   * with date range values.
   */
  sort (a, b) {
    const first = ((a || {}).Item || {}).Dates
    const second = ((b || {}).Item || {}).Dates

    if (!first && !second) {
      return 0
    }

    if (!first || !first.to || !first.to.date) {
      return -1
    }

    if (!second || !second.to || !second.to.date) {
      return 1
    }

    return second.to.date.getTime() - first.to.date.getTime()
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
          <IntroHeader Errors={this.props.Errors}
                       Completed={this.props.Completed}
                       tour={i18n.t('history.tour.para')}
                       review={i18n.t('history.review.para')}
                       onTour={this.handleTour}
                       onReview={this.handleReview}
                       />
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

  customSummary (item, index, callback) {
    if (item.type === 'Gap') {
      return null
    }

    return callback()
  }

  customResidenceDetails (item, index, callback) {
    if (item.type === 'Gap') {
      return (
        <Gap title={i18n.t('history.residence.gap.title')}
             para={i18n.t('history.residence.gap.para')}
             btnText={i18n.t('history.residence.gap.btnText')}
             first={index === 0}
             dates={item.Dates}
             />
      )
    }

    return callback()
  }

  customEmploymentDetails (item, index, callback) {
    if (item.type === 'Gap') {
      return (
        <Gap title={i18n.t('history.employment.gap.title')}
             para={i18n.t('history.employment.gap.para')}
             btnText={i18n.t('history.employment.gap.btnText')}
             first={index === 0}
             dates={item.Dates}
             />
      )
    }

    return callback()
  }

  render () {
    return (
      <div className="history">
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            {this.intro()}
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
                       next="foreign/passport"
                       nextLabel={i18n.t('foreign.destination.passport')}>
            <h2>{i18n.t('history.timeline.title')}</h2>
            {i18n.m('history.timeline.para1')}
            {i18n.m('history.timeline.para2')}
            { this.residenceSummaryProgress() }
            { this.employmentSummaryProgress() }
            { this.educationSummaryProgress() }
            <Accordion minimum="1"
                       items={InjectGaps(this.props.History.Residence, daysAgo(today, 365 * this.totalYears()))}
                       onUpdate={this.updateResidence}
                       onValidate={this.onValidate}
                       summary={ResidenceSummary}
                       customSummary={this.customSummary}
                       customDetails={this.customResidenceDetails}
                       sort={this.sort}
                       description={i18n.t('history.residence.collection.summary.title')}
                       appendLabel={i18n.t('history.residence.collection.append')}
                       >
              <ResidenceItem name="Item"
                             bind={true}
                             />
            </Accordion>
            <Accordion minimum="1"
                       items={InjectGaps(this.props.History.Employment, daysAgo(today, 365 * this.totalYears()))}
                       onUpdate={this.updateEmployment}
                       onValidate={this.onValidate}
                       summary={EmploymentSummary}
                       customSummary={this.customSummary}
                       customDetails={this.customEmploymentDetails}
                       sort={this.sort}
                       description={i18n.t('history.employment.default.collection.summary.title')}
                       appendLabel={i18n.t('history.employment.default.collection.append')}
                       >
              <EmploymentItem name="Item"
                              bind={true}
                              />
            </Accordion>
            <Accordion minimum="1"
                       items={this.props.History.Education}
                       onUpdate={this.updateEducation}
                       onValidate={this.onValidate}
                       summary={EducationSummary}
                       sort={this.sort}
                       description={i18n.t('history.education.collection.summary.title')}
                       appendLabel={i18n.t('history.education.collection.append')}
                       >
              <EducationItem name="Item"
                             bind={true}
                             />
            </Accordion>

            <h2>{i18n.t('history.federal.title')}</h2>
            <Federal name="federal"
                     {...this.props.Federal}
                     onUpdate={this.onUpdate.bind(this, 'Federal')}
                     onValidate={this.onValidate}
                     />
          </SectionView>

          <SectionView name="residence"
                       back="military/foreign"
                       backLabel={i18n.t('military.destination.foreign')}
                       next="history/employment"
                       nextLabel={i18n.t('history.destination.employment')}>
            <h2>{i18n.t('history.residence.title')}</h2>
            <p>{i18n.t('history.residence.info')}</p>
            { this.residenceSummaryProgress() }
            <Accordion minimum="1"
                       items={InjectGaps(this.props.History.Residence, daysAgo(today, 365 * this.totalYears()))}
                       onUpdate={this.updateResidence}
                       onValidate={this.onValidate}
                       summary={ResidenceSummary}
                       customSummary={this.customSummary}
                       customDetails={this.customResidenceDetails}
                       sort={this.sort}
                       description={i18n.t('history.employment.default.collection.summary.title')}
                       appendLabel={i18n.t('history.employment.default.collection.append')}
                       >
              <ResidenceItem name="Item"
                             bind={true}
                             />
            </Accordion>
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
            <Accordion minimum="1"
                       items={InjectGaps(this.props.History.Employment, daysAgo(today, 365 * this.totalYears()))}
                       onUpdate={this.updateEmployment}
                       onValidate={this.onValidate}
                       summary={EmploymentSummary}
                       customSummary={this.customSummary}
                       customDetails={this.customEmploymentDetails}
                       sort={this.sort}
                       description={i18n.t('history.employment.default.collection.summary.title')}
                       appendLabel={i18n.t('history.employment.default.collection.append')}
                       >
              <EmploymentItem name="Item"
                              bind={true}
                              />
            </Accordion>
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
            <Accordion minimum="1"
                       items={this.props.History.Education}
                       onUpdate={this.updateEducation}
                       onValidate={this.onValidate}
                       summary={EducationSummary}
                       sort={this.sort}
                       description={i18n.t('history.education.collection.summary.title')}
                       appendLabel={i18n.t('history.education.collection.append')}
                       >
              <EducationItem name="Item"
                             bind={true}
                             />
            </Accordion>
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
