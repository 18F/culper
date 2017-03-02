import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Selective from './Selective'
import History from './History'

class Military extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.updateSelective = this.updateSelective.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Military, this.props.subsection, 'selective')
    if (current !== '') {
      this.props.dispatch(push(`/form/military/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/military/selective'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/military/review'))
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
    if (this.hasStatus('selective', status, true)
        && this.hasStatus('history', status, true)
        && this.hasStatus('disciplinary', status, true)
        && this.hasStatus('foreign', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('selective', status, false)
               || this.hasStatus('history', status, false)
               || this.hasStatus('disciplinary', status, false)
               || this.hasStatus('foreign', status, false)) {
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
    this.props.dispatch(updateApplication('Military', field, values))
  }

  updateSelective (values) {
    this.onUpdate('Selective', values)
  }

  updateHistory (values) {
    this.onUpdate('History', values)
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
      <div className="military intro review-screen">
        <div className="usa-grid-full">
          <IntroHeader Errors={this.props.Errors} Completed={this.props.Completed} />
        </div>
        <div className="review-column">
          <h3>{i18n.t('military.tour.title')}</h3>
          <p>{i18n.t('military.tour.para')}</p>
          <button onClick={this.handleTour}>{i18n.t('military.tour.button')}</button>
        </div>
        <div className="review-column">
          <h3>{i18n.t('military.review.title')}</h3>
          <p>{i18n.t('military.review.para')}</p>
          <button onClick={this.handleReview}>{i18n.t('military.review.button')}</button>
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
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="history1"
                       nextLabel={i18n.t('history.destination.timeline')}>
            <h2>{i18n.t('military.selective.heading.born')}</h2>
            <Selective name="selective"
                       {...this.props.Selective}
                       onUpdate={this.updateSelective}
                       onValidate={this.onValidate}
                       />
            <h2>{i18n.t('military.history.heading.served')}</h2>
            <History name="history"
                       {...this.props.History}
                       onUpdate={this.updateHistory}
                       onValidate={this.onValidate}
                       />
          </SectionView>

          <SectionView name="selective"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="military/history"
                       nextLabel={i18n.t('military.destination.history')}>
            <h2>{i18n.t('military.selective.heading.born')}</h2>
            <Selective name="selective"
                       {...this.props.Selective}
                       onUpdate={this.updateSelective}
                       onValidate={this.onValidate}
                       />
          </SectionView>

          <SectionView name="history"
                       back="military/selective"
                       backLabel={i18n.t('military.destination.selective')}
                       next="military/disciplinary"
                       nextLabel={i18n.t('military.destination.disciplinary')}>
            <h2>{i18n.t('military.history.heading.served')}</h2>
            <History name="history"
                       {...this.props.History}
                       onUpdate={this.updateHistory}
                       onValidate={this.onValidate}
                       />
          </SectionView>

          <SectionView name="disciplinary"
                       back="military/history"
                       backLabel={i18n.t('military.destination.history')}
                       next="military/foreign"
                       nextLabel={i18n.t('military.destination.foreign')}>
          </SectionView>

          <SectionView name="foreign"
                       back="military/disciplinary"
                       backLabel={i18n.t('military.destination.disciplinary')}
                       next="military/review"
                       nextLabel={i18n.t('military.destination.review')}>
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let military = app.Military || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Military: military,
    Selective: military.Selective || {},
    History: military.History || {},
    Disciplinary: military.Disciplinary || {},
    Foreign: military.Foreign || {},
    Errors: errors.military || [],
    Completed: completed.military || []
  }
}

Military.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Military))
