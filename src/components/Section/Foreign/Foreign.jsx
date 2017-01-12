import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
// import Passport from '../../Form/Passport'
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

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Foreign', field, values))
  }

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

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name=""
                       back="history"
                       backLabel="Your History"
                       next="tbd"
                       nextLabel="TBD">
            {this.intro()}
          </SectionView>
          <SectionView name="review"
                       back="history"
                       backLabel="Your History"
                       next="tbd"
                       nextLabel="TBD">
          </SectionView>
          <SectionView name="passport"
                       back="history"
                       backLabel="Your History"
                       next="contacts"
                       nextLabel="Foreign contacts">
          </SectionView>
          <SectionView name="contacts"
                       back="passport"
                       backLabel="U.S. passport information"
                       next="activities"
                       nextLabel="Foreign activities">
          </SectionView>
          <SectionView name="activites"
                       back="contacts"
                       backLabel="Foreign contacts"
                       next="business"
                       nextLabel="Foreign business, professional activities, and government contacts">
          </SectionView>
          <SectionView name="business"
                       back="activities"
                       backLabel="Foreign activities"
                       next="travel"
                       nextLabel="Foreign countries you have visited">
          </SectionView>
          <SectionView name="travel"
                       back="business"
                       backLabel="Foreign business, professional activities, and government contacts"
                       next="review"
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
