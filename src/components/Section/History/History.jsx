import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import IntroHeader from '../../Form/IntroHeader'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Residence from './Residence'

class History extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
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

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            {this.intro()}
          </SectionView>
          <SectionView name="review"
                       back="history/education"
                       backLabel={i18n.t('history.destination.education')}
                       next="foreign"
                       nextLabel={i18n.t('foreign.destination.passport')}>
          </SectionView>

          <SectionView name="residence"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="history/employment"
                       nextLabel={i18n.t('history.destination.employment')}>
            <h2>{i18n.t('history.residence.title')}</h2>
            <p>{i18n.t('history.residence.info')}</p>
            <Residence name="residence"
                       {...this.props.Residence}
                       onUpdate={this.onUpdate.bind(this, 'Residence')}
                       onValidate={this.onValidate.bind(this)}
                       />
          </SectionView>

          <SectionView name="employment"
                       back="history/residence"
                       backLabel={i18n.t('history.destination.residence')}
                       next="history/education"
                       nextLabel={i18n.t('history.destination.education')}>
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
