import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, Accordion, Svg, Show, Branch } from '../../Form'
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
import { ResidenceValidator, EmploymentValidator, EducationValidator, FederalServiceValidator } from '../../../validators'
import { openState } from '../../Form/Accordion/Accordion'

const byline = (item, index, initial, translation, validator) => {
  if (item.Item && !validator(item.Item)) {
    return (
      <div className={`byline ${openState(item, initial)}`.trim()}>
        <div className="incomplete">{i18n.t(translation)}</div>
      </div>
    )
  }

  return null
}

class History extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection,
      errorCodes: []
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
    this.updateBranchAttendance = this.updateBranchAttendance.bind(this)
    this.updateBranchDegree10 = this.updateBranchDegree10.bind(this)
    this.customResidenceDetails = this.customResidenceDetails.bind(this)
    this.customEmploymentDetails = this.customEmploymentDetails.bind(this)
  }

  componentDidMount () {
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

    let errors = []
    if (!event.fake) {
      const merged = super.mergeError(this.state.errorCodes, super.flattenObject(errorCodes))
      const codes = {
        [this.props.Section.subsection]: merged
      }

      errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], codes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let valid = false
    switch (this.props.Section.subsection) {
      case 'residence':
        valid = new ResidenceValidator(this.props.Residence, null).isValid()
        break

      case 'employment':
        valid = new EmploymentValidator(this.props.Employment, null).isValid()
        break

      case 'education':
        valid = new EducationValidator(this.props.Education, null).isValid()
        break

      case 'federal':
        valid = new FederalServiceValidator(this.props.Federal, null).isValid()
        break

      case 'review':
        valid = new ResidenceValidator(this.props.Residence, null).isValid() &&
          new EmploymentValidator(this.props.Employment, null).isValid() &&
          new EducationValidator(this.props.Education, null).isValid() &&
          new FederalServiceValidator(this.props.Federal, null).isValid()
        break
    }

    let cstatus = 'neutral'
    if (valid) {
      cstatus = 'complete'
    } else {
      if (errors.length > 0) {
        cstatus = 'incomplete'
      }
    }

    const completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }

    this.setState({ errorCodes: errors }, () => {
      this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
    })
  }

  /**
   * Update storage values for a subsection
   */
  onUpdate (field, values) {
    this.props.dispatch(updateApplication('History', field, values))
  }

  excludeGaps (items) {
    return items.filter(item => !item.type || (item.type && item.type !== 'Gap'))
  }

  updateResidence (values) {
    this.onUpdate('Residence', this.excludeGaps(values))
  }

  updateEmployment (values) {
    this.onUpdate('Employment', this.excludeGaps(values))
  }

  updateEducation (values) {
    let education = this.props.Education || {}
    education.List = values
    this.onUpdate('Education', education)
  }

  updateBranchAttendance (values) {
    let education = this.props.Education || {}
    education.HasAttended = values
    this.onUpdate('Education', education)
  }

  updateBranchDegree10 (values) {
    let education = this.props.Education || {}
    education.HasDegree10 = values
    this.onUpdate('Education', education)
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

    for (const i of this.props.Residence) {
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

    for (const i of this.props.Employment) {
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

  customSummary (item, index, initial, callback) {
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
    this.onUpdate(field, this.excludeGaps(items))
  }

  customResidenceDetails (item, index, initial, callback) {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap title={i18n.t('history.residence.gap.title')}
             para={i18n.t('history.residence.gap.para')}
             btnText={i18n.t('history.residence.gap.btnText')}
             first={index === 0}
             dates={dates}
             onClick={this.fillGap.bind(this, 'Residence', dates)}
             />
      )
    }

    return callback()
  }

  customEmploymentDetails (item, index, initial, callback) {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap title={i18n.t('history.employment.gap.title')}
             para={i18n.t('history.employment.gap.para')}
             btnText={i18n.t('history.employment.gap.btnText')}
             first={index === 0}
             dates={dates}
             onClick={this.fillGap.bind(this, 'Employment', dates)}
             />
      )
    }

    return callback()
  }

  customResidenceByline (item, index, initial) {
    return byline(item, index, initial, 'history.residence.collection.summary.incomplete', (item) => {
      return new ResidenceValidator(item, null).isValid()
    })
  }

  customEmploymentByline (item, index, initial) {
    return byline(item, index, initial, 'history.employment.default.collection.summary.incomplete', (item) => {
      return new EmploymentValidator(item, null).isValid()
    })
  }

  customEducationByline (item, index, initial) {
    return byline(item, index, initial, 'history.education.collection.school.summary.incomplete', (item) => {
      return new EducationValidator(item, null).isValid()
    })
  }

  render () {
    return (
      <div className="history">
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
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
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
                       next="foreign/passport"
                       nextLabel={i18n.t('foreign.destination.passport')}>
            <h2>{i18n.t('history.timeline.title')}</h2>
            { this.residenceSummaryProgress() }
            { this.employmentSummaryProgress() }
            <Show when={this.state.HasAttended === 'Yes' || this.state.HasDegree10 === 'Yes'}>
              { this.educationSummaryProgress() }
            </Show>
            <Accordion minimum="1"
                       defaultState={false}
                       items={InjectGaps(this.props.Residence, daysAgo(today, 365 * this.totalYears()))}
                       sort={this.sort}
                       onUpdate={this.updateResidence}
                       onValidate={this.onValidate}
                       summary={ResidenceSummary}
                       byline={this.customResidenceByline}
                       customSummary={this.customSummary}
                       customDetails={this.customResidenceDetails}
                       description={i18n.t('history.residence.collection.summary.title')}
                       appendLabel={i18n.t('history.residence.collection.append')}
                       >
              <ResidenceItem name="Item"
                             bind={true}
                             />
            </Accordion>
            <Accordion minimum="1"
                       defaultState={false}
                       items={InjectGaps(this.props.Employment, daysAgo(today, 365 * this.totalYears()))}
                       sort={this.sort}
                       onUpdate={this.updateEmployment}
                       onValidate={this.onValidate}
                       summary={EmploymentSummary}
                       byline={this.customEmploymentByline}
                       customSummary={this.customSummary}
                       customDetails={this.customEmploymentDetails}
                       description={i18n.t('history.employment.default.collection.summary.title')}
                       appendLabel={i18n.t('history.employment.default.collection.append')}
                       >
              <EmploymentItem name="Item"
                              bind={true}
                              />
            </Accordion>
            <Show when={this.props.Education.HasAttended === 'Yes' || this.props.Education.HasDegree10 === 'Yes'}>
              <Accordion minimum="1"
                         defaultState={false}
                         items={this.props.Education.List}
                         sort={this.sort}
                         onUpdate={this.updateEducation}
                         onValidate={this.onValidate}
                         summary={EducationSummary}
                         byline={this.customEducationByline}
                         description={i18n.t('history.education.collection.school.summary.title')}
                         appendLabel={i18n.t('history.education.collection.school.append')}
                         >
                <EducationItem name="Item"
                               bind={true}
                               />
              </Accordion>
            </Show>

            <p></p>
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
            <h3>{i18n.t('history.residence.info')}</h3>
            {i18n.m('history.residence.info2')}
            {i18n.m('history.residence.info3a')}
            {i18n.m('history.residence.info3b')}
            {i18n.m('history.residence.info3c')}
            { this.residenceSummaryProgress() }
            <Accordion minimum="1"
                       items={this.props.Residence}
                       onUpdate={this.updateResidence}
                       onValidate={this.onValidate}
                       summary={ResidenceSummary}
                       byline={this.customResidenceByline}
                       customSummary={this.customSummary}
                       customDetails={this.customResidenceDetails}
                       description={i18n.t('history.residence.collection.summary.title')}
                       appendLabel={i18n.t('history.residence.collection.append')}
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
                       items={this.props.Employment}
                       onUpdate={this.updateEmployment}
                       onValidate={this.onValidate}
                       summary={EmploymentSummary}
                       byline={this.customEmploymentByline}
                       customDetails={this.customEmploymentDetails}
                       customSummary={this.customSummary}
                       customDetails={this.customEmploymentDetails}
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
            <Branch name="branch_school"
                    className="eapp-field-wrap"
                    value={this.props.Education.HasAttended}
                    help="history.education.help.attendance"
                    label={i18n.t('history.education.label.attendance')}
                    onUpdate={this.updateBranchAttendance}
                    >
            </Branch>
            <Show when={this.props.Education.HasAttended === 'No'}>
              <div>
                <Branch name="branch_degree10"
                        className="eapp-field-wrap"
                        value={this.props.Education.HasDegree10}
                        help="history.education.help.degree10"
                        label={i18n.t('history.education.label.degree10')}
                        onUpdate={this.updateBranchDegree10}
                        >
                </Branch>
              </div>
            </Show>
            <Show when={this.props.Education.HasAttended === 'Yes' || this.props.Education.HasDegree10 === 'Yes'}>
              <div>
                { this.educationSummaryProgress() }
                <Accordion minimum="1"
                           items={this.props.Education.List}
                           onUpdate={this.updateEducation}
                           onValidate={this.onValidate}
                           summary={EducationSummary}
                           byline={this.customEducationByline}
                           description={i18n.t('history.education.collection.school.summary.title')}
                           appendLabel={i18n.t('history.education.collection.school.append')}
                           >
                  <EducationItem name="Item"
                                 bind={true}
                                 />
                </Accordion>
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
    Residence: history.Residence || [],
    Employment: history.Employment || [],
    Education: history.Education || { HasAttended: '', HasDegree10: '', List: [] },
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
