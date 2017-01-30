import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import Passport from './Passport'
import IntroHeader from '../../Form/IntroHeader'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'

class Foreign extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Foreign, this.props.subsection, 'passport')
    if (current !== '') {
      this.props.dispatch(push(`/form/foreign/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/foreign/passport'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/foreign/review'))
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
    if (this.hasStatus('passport', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('passport', status, false)) {
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
    this.props.dispatch(updateApplication('Foreign', field, values))
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
      <div className="foreign intro">
        <div className="usa-grid-full">
          <IntroHeader Errors={this.props.Errors} Completed={this.props.Completed} />
        </div>
        <div className="review-column">
          <h3>{i18n.t('foreign.tour.title')}</h3>
          <p>{i18n.t('foreign.tour.para')}</p>
          <button onClick={this.handleTour}>{i18n.t('foreign.tour.button')}</button>
        </div>
        <div className="review-column">
          <h3>{i18n.t('foreign.review.title')}</h3>
          <p>{i18n.t('foreign.review.para')}</p>
          <button onClick={this.handleReview}>{i18n.t('foreign.review.button')}</button>
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
                       back="history"
                       backLabel={i18n.t('foreign.destination.history')}
                       next="tbd"
                       nextLabel={i18n.t('foreign.destination.tbd')}>
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      {...this.props.Passport}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="passport"
                       back="identification/physical"
                       backLabel={i18n.t('identification.destination.physical')}
                       next="foreign/review"
                       nextLabel={i18n.t('foreign.destination.review')}>
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      {...this.props.Passport}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="contacts"
                       back="foreign/passport"
                       backLabel={i18n.t('foreign.destination.passport')}
                       next="foreign/activities"
                       nextLabel={i18n.t('foreign.destination.activities')}>
          </SectionView>

          <SectionView name="activites"
                       back="foreign/contacts"
                       backLabel={i18n.t('foreign.destination.contacts')}
                       next="foreign/business"
                       nextLabel={i18n.t('foreign.destination.business')}>
          </SectionView>

          <SectionView name="business"
                       back="foreign/activities"
                       backLabel={i18n.t('foreign.destination.activities')}
                       next="foreign/travel"
                       nextLabel={i18n.t('foreign.destination.travel')}>
          </SectionView>

          <SectionView name="travel"
                       back="foreign/business"
                       backLabel={i18n.t('foreign.destination.business')}
                       next="foreign/review"
                       nextLabel={i18n.t('foreign.destination.review')}>
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let foreign = app.Foreign || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Foreign: foreign,
    Passport: foreign.Passport || {},
    Errors: errors.foreign || [],
    Completed: completed.foreign || []
  }
}

Foreign.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Foreign))
