import React from 'react'
import { connect } from 'react-redux'
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

    let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
    this.props.dispatch(reportErrors(this.props.Section.section, '', errors))

    let cstatus = 'neutral'
    if (this.hasStatus('passport', true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('passport', false)) {
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
  hasStatus (property, val) {
    return this.props.Completed[property] && this.props.Completed[property].status === val
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
        <div className="usa-grid-full eapp-field-wrap">
          <IntroHeader Errors={this.props.Errors} Completed={this.props.Completed} />
        </div>
        <div id="titles" className="usa-grid-full">
          <div className="usa-width-one-half">
            <h3>One piece at a time</h3>
          </div>
          <div className="usa-width-one-half">
            <h3>Full section view</h3>
          </div>
        </div>

        <div id="dialogs" className="usa-grid-full">
          <div className="usa-width-one-half">
            <p>Take a guided tour through the section</p>
          </div>
          <div className="usa-width-one-half">
            <p>View all the sections associated with <strong>foreign activities</strong> at once</p>
          </div>
        </div>

        <div id="actions" className="usa-grid-full review-btns">
          <div className="usa-width-one-half">
            <button onClick={this.handleTour}>Take me on the tour!</button>
          </div>
          <div className="usa-width-one-half">
            <button onClick={this.handleReview}>Show me the full section</button>
          </div>
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
                       backLabel="Your History"
                       next="tbd"
                       nextLabel="TBD">
            <Passport name="passport"
                      {...this.props.Passport}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>
          <SectionView name="passport"
                       back="identification/physical"
                       backLabel="Physical attributes"
                       next="foreign/contacts"
                       nextLabel="Foreign contacts">
            <Passport name="passport"
                      {...this.props.Passport}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>
          <SectionView name="contacts"
                       back="foreign/passport"
                       backLabel="U.S. passport information"
                       next="foreign/activities"
                       nextLabel="Foreign activities">
          </SectionView>
          <SectionView name="activites"
                       back="foreign/contacts"
                       backLabel="Foreign contacts"
                       next="foreign/business"
                       nextLabel="Foreign business, professional activities, and government contacts">
          </SectionView>
          <SectionView name="business"
                       back="foreign/activities"
                       backLabel="Foreign activities"
                       next="foreign/travel"
                       nextLabel="Foreign countries you have visited">
          </SectionView>
          <SectionView name="travel"
                       back="foreign/business"
                       backLabel="Foreign business, professional activities, and government contacts"
                       next="foreign/review"
                       nextLabel="Review">
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
