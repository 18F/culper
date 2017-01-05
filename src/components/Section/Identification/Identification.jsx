import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ApplicantName from '../../Form/Name'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'
import { push } from '../../../middleware/history'
import { updateApplication } from '../../../actions/ApplicationActions'

class Identification extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  handleTour (event) {
    this.props.dispatch(push('/form/identification/name'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/identification/review'))
  }

  handleTransition (nextSection, event) {
    this.props.dispatch(push(`/form/identification/${nextSection}`))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Identification', field, values))
  }

  // Mapping section identifiers to the associated components.
  sectionMap (section) {
    let map = {
      'name': {
        'prev': () => { return '' },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'birthdate')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'render': () => {
          return (
            <ApplicantName
              onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
              {...this.props.ApplicantName }
            />
          )
        }
      },
      'birthdate': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'name')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'birthplace')} className="eapp-prev"><span className="fa fa-arrow-circle-left button-icon"></span><span><span className="eapp-nav-label">Previous</span> Section</span></button>) },
        'render': () => {
          let d = null
          if (this.props.ApplicantBirthDate) {
            const { month, day, year } = this.props.ApplicantBirthDate
            if (month && day && year) {
              d = new Date(year, month - 1, day)
            }
          }
          return (
            <ApplicantBirthDate
              onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
              value={d}
            />
          )
        }
      },
      'birthplace': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'birthdate')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'ssn')} className="eapp-prev"><span className="fa fa-arrow-circle-left button-icon"></span><span><span className="eapp-nav-label">Previous</span> Section</span></button>) },
        'render': () => {
          return (
            <ApplicantBirthPlace
              {...this.props.ApplicantBirthPlace}
              onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
            />
          )
        }
      },
      'ssn': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'birthplace')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, '')} className="eapp-prev"><span className="fa fa-arrow-circle-left button-icon"></span><span><span className="eapp-nav-label">Finish</span> Section</span></button>) },
        'render': () => {
          return (
            <ApplicantSSN
              {...this.props.ApplicantSSN}
              onUpdate={this.onUpdate.bind(this, 'ApplicantSSN')}
            />
          )
        }
      }
    }
    return map[section]
  }

  render () {
    const subsection = this.props.subsection
    if (!subsection) {
      return (
        <div className="identification">
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
              <p>View all the sections associated with <strong>Identification</strong> at once</p>
            </div>
          </div>

          <div id="actions" className="usa-grid-full">
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

    if (subsection === 'review') {
      return (
        <div className="identification">
        {this.sectionMap('name').render()}
        {this.sectionMap('birthplace').render()}
        {this.sectionMap('birthdate').render()}
        {this.sectionMap('ssn').render()}
        </div>
      )
    }

    return (
      <div className="identification">
        {this.sectionMap(subsection).render()}
        {this.sectionMap(subsection).prev()}
        {this.sectionMap(subsection).next()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  let app = state.application || {}
  let identification = app.Identification || {}
  return {
    ApplicantName: identification.ApplicantName || {},
    ApplicantBirthDate: identification.ApplicantBirthDate || {},
    ApplicantBirthPlace: identification.ApplicantBirthPlace || {},
    ApplicantSSN: identification.ApplicantSSN || {}
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Identification))
