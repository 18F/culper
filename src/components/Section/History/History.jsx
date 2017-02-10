import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import IntroHeader from '../../Form/IntroHeader'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Employment from './Employment'
import Residence from './Residence'
import SummaryProgress from './SummaryProgress'
import ReactMarkdown from 'react-markdown'
import HistoryCollection from './HistoryCollection/HistoryCollection'
import Show from '../../Form/Show'

class History extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection,
      addOnLoad: props.addOnLoad
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    // TODO: This may need to be changed... idea may be that the review is the timeline but
    // this may not be correct.
    let current = this.launch(this.props.History, this.props.subsection, 'timeline')
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
        && this.hasStatus('education', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('residence', status, false)
               || this.hasStatus('employment', status, false)
               || this.hasStatus('education', status, false)) {
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
   * Extracts dates used for summary progress and gap analysis for residence
   */
  residenceRangeList () {
    let dates = []
    if (!this.props.Residence || !this.props.Residence['List']) {
      return dates
    }

    for (let i of this.props.Residence.List) {
      if (!i.Residence) {
        continue
      }
      if (i.Residence && i.Residence.Dates) {
        dates.push(i.Residence.Dates)
      }
    }
    return dates
  }

  /**
   * Extracts dates used for summary progress and gap analysis for residence when used
   * in the combined history. Note that in this scenario, it does not contain a `Residence`
   * property within the array like the residenceRangeList() func
   */
  combinedResidenceRangeList () {
    let dates = []
    if (!this.props.Residence || !this.props.Residence['List']) {
      return dates
    }

    for (let i of this.props.Residence.List) {
      if (!i) {
        continue
      }
      if (i && i.Dates) {
        dates.push(i.Dates)
      }
    }
    return dates
  }

  /**
   * Extracts dates used for summary progress and gap analysis for employment
   */
  employmentRangesList () {
    let dates = []
    if (!this.props.Employment || !this.props.Employment['List']) {
      return dates
    }

    for (let i of this.props.Employment.List) {
      if (i.Dates) {
        dates.push(i.Dates)
      }
    }
    return dates
  }

  residenceSummaryProgress () {
	  return (
      <SummaryProgress className="residence eapp-field-wrap"
        List={this.residenceRangeList.bind(this)}
        title={i18n.t('history.residence.summary.title')}
        unit={i18n.t('history.residence.summary.unit')}
        total="10"
      >
        <div className="summary-icon">
          <svg viewBox="0 0 74.94 28.35">
            <path d="M30.54,9.79V0.78c0-0.4-0.31-0.71-0.71-0.71h-4.24c-0.4,0-0.71,0.31-0.71,0.71v4.31l-5.39-4.51
              c-0.93-0.77-2.43-0.77-3.36,0L0.25,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
              c0.2,0.02,0.38-0.05,0.53-0.16L17.81,3.78L33.1,16.53c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
              c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64c0.24-0.29,0.2-0.75-0.09-0.99L30.54,9.79z"/>
            <path d="M17.81,5.73L5.11,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
              h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L17.81,5.73z"/>
            <path d="M57.12,5.73L44.42,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
              h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L57.12,5.73z"/>
            <path d="M74.69,13.82l-4.84-4.02V0.78c0-0.4-0.31-0.71-0.71-0.71H64.9c-0.4,0-0.71,0.31-0.71,0.71v4.31L58.8,0.58
              c-0.93-0.77-2.43-0.77-3.36,0L39.56,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
              c0.2,0.02,0.38-0.05,0.53-0.16L57.12,3.78l15.29,12.75c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
              c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64C75.02,14.52,74.98,14.06,74.69,13.82z"/>
          </svg>
        </div>
      </SummaryProgress>
	  )
  }

  /**
   * Used for the combined summary view
   */
  combinedResidenceSummaryProgress () {
	  return (
      <SummaryProgress className="residence eapp-field-wrap"
        List={this.combinedResidenceRangeList.bind(this)}
        title={i18n.t('history.residence.summary.title')}
        unit={i18n.t('history.residence.summary.unit')}
        total="10"
      >
        <div className="summary-icon">
          <svg viewBox="0 0 74.94 28.35">
            <path d="M30.54,9.79V0.78c0-0.4-0.31-0.71-0.71-0.71h-4.24c-0.4,0-0.71,0.31-0.71,0.71v4.31l-5.39-4.51
              c-0.93-0.77-2.43-0.77-3.36,0L0.25,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
              c0.2,0.02,0.38-0.05,0.53-0.16L17.81,3.78L33.1,16.53c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
              c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64c0.24-0.29,0.2-0.75-0.09-0.99L30.54,9.79z"/>
            <path d="M17.81,5.73L5.11,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
              h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L17.81,5.73z"/>
            <path d="M57.12,5.73L44.42,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
              h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L57.12,5.73z"/>
            <path d="M74.69,13.82l-4.84-4.02V0.78c0-0.4-0.31-0.71-0.71-0.71H64.9c-0.4,0-0.71,0.31-0.71,0.71v4.31L58.8,0.58
              c-0.93-0.77-2.43-0.77-3.36,0L39.56,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
              c0.2,0.02,0.38-0.05,0.53-0.16L57.12,3.78l15.29,12.75c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
              c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64C75.02,14.52,74.98,14.06,74.69,13.82z"/>
          </svg>
        </div>
      </SummaryProgress>
	  )
  }

  employmentSummaryProgress () {
	  return (
      <SummaryProgress className="residence eapp-field-wrap"
        List={this.employmentRangesList.bind(this)}
        title={i18n.t('history.employment.summary.title')}
        unit={i18n.t('history.employment.summary.unit')}
        total="10"
      >
        <div className="summary-icon">
          <svg viewBox="0 0 74.94 28.35">
            <path className="st0" d="M40.05,17.88H0V9.3c0-1.97,1.61-3.58,3.58-3.58h7.87V2.15C11.44,0.96,12.4,0,13.59,0h12.87
              c1.18,0,2.15,0.96,2.15,2.15v3.58h7.87c1.97,0,3.58,1.61,3.58,3.58V17.88z M40.05,30.75c0,1.97-1.61,3.58-3.58,3.58H3.58
              C1.61,34.33,0,32.72,0,30.75V20.03h15.02v3.58c0,0.78,0.65,1.43,1.43,1.43h7.15c0.78,0,1.43-0.65,1.43-1.43v-3.58h15.02V30.75z
              M25.75,5.72V2.86H14.3v2.86H25.75z M22.89,22.89h-5.72v-2.86h5.72V22.89z"/>
          </svg>
        </div>
      </SummaryProgress>
	  )
  }

  onHistoryUpdate (collectionName, list) {
    this.props.dispatch(updateApplication('History', collectionName, list))
  }

  addResidence () {
    this.setState({ addOnLoad: 'Residence' })
  }
  addEmployer () {
    this.setState({ addOnLoad: 'Employment' })
  }

  render () {
    return (
      <div className="history">
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            {this.intro()}
          </SectionView>

          <SectionView name="timeline"
            back="history/education"
            backLabel={i18n.t('history.destination.education')}
            next="foreign"
            nextLabel={i18n.t('foreign.destination.passport')}>
            <h2>{i18n.t('history.timeline.title')}</h2>
            <p>{i18n.t('history.employment.para.employment')}</p>

            <Show when={(!this.props.Employment.List && !this.props.Residence.List) && !this.state.addOnLoad}>
              <div className="add-options">
                <div className="table">
                  <div className="table-cell add-residence">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <div className="title">
                      Start with your present residence
                    </div>
                    <div className="btn">
                      <button className="add usa-button-outline" onClick={this.addResidence.bind(this)}>
                        <span>Add residence</span>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div className="table-cell add-employment">
                    <i className="fa fa-briefcase" aria-hidden="true"></i>
                    <div className="title">
                      Start with your present employer
                    </div>
                    <div className="btn">
                      <button className="add usa-button-outline" onClick={this.addEmployer.bind(this)}>
                        <span>Add employer</span>
                        <i className="fa fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Show>

            <Show when={(this.props.Employment.List || this.props.Residence.List || this.state.addOnLoad)}>
              <div>
                { this.combinedResidenceSummaryProgress () }
                { this.employmentSummaryProgress () }
                <HistoryCollection
                  addOnLoad={this.state.addOnLoad}
                  history={this.props.History}
                  onResidenceUpdate={this.onUpdate.bind(this, 'Residence')}
                  onEmploymentUpdate={this.onUpdate.bind(this, 'Employment')}
                />
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
            { this.residenceSummaryProgress () }

            <Residence name="residence"
              {...this.props.Residence}
              onUpdate={this.onUpdate.bind(this, 'Residence')}
              onValidate={this.onValidate.bind(this)}
            />

          <h2>{i18n.t('history.residence.heading.exiting')}</h2>
          <ReactMarkdown source={i18n.t('history.residence.para.exiting')} />
        </SectionView>

        <SectionView name="employment"
          back="history/residence"
          backLabel={i18n.t('history.destination.residence')}
          next="history/education"
          nextLabel={i18n.t('history.destination.education')}>
          <h2>{i18n.t('history.employment.heading.employment')}</h2>
          <p>{i18n.t('history.employment.para.employment')}</p>
          { this.employmentSummaryProgress () }

          <Employment
            {...this.props.Employment}
            onUpdate={this.onUpdate.bind(this, 'Employment')}
          />

        <h2>{i18n.t('history.employment.heading.exiting')}</h2>
        <ReactMarkdown source={i18n.t('history.employment.para.exiting')} />
      </SectionView>

      <SectionView name="education"
        back="history/employment"
        backLabel={i18n.t('history.destination.employment')}
        next="history/review"
        nextLabel={i18n.t('history.destination.review')}>
      </SectionView>
    </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let history = app.History || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    History: history,
    Residence: history.Residence || {},
    Employment: history.Employment || {},
    Education: history.Education || {},
    Errors: errors.history || [],
    Completed: completed.history || []
  }
}

History.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(History))
