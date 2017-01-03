import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { MaidenName, Name, Textarea, DateRange } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication } from '../../../actions/ApplicationActions'

class OtherNamesUsed extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  handleTour (event) {
    this.props.dispatch(push('/form/othernames/name'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/othernames/review'))
  }

  handleTransition (nextSection, event) {
    this.props.dispatch(push(`/form/othernames/${nextSection}`))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('OtherNames', field, values))
  }

  // Mapping section identifiers to the associated components.
  sectionMap (section) {
    let map = {
      'name': {
        'prev': () => { return '' },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'maidenname')}>Next Section</button>) },
        'render': () => {
          return (
            <Name
              {...this.props.Name}
              onUpdate={this.onUpdate.bind(this, 'Name')}
            />
          )
        }
      },
      'maidenname': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'name')}>Previous Section</button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'datesused')}>Next Section</button>) },
        'render': () => {
          return (
            <MaidenName
              value={this.props.MaidenName}
              onUpdate={this.onUpdate.bind(this, 'MaidenName')}
            />
          )
        }
      },
      'datesused': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'maidenname')}>Previous Section</button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'reasons')}>Next Section</button>) },
        'render': () => {
          return (
            <DateRange
              {...this.props.DatesUsed}
              onUpdate={this.onUpdate.bind(this, 'DatesUsed')}
              title="Provide dates used"
            />
          )
        }
      },
      'reasons': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'datesused')}>Preview Section</button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, '')}>Next Section</button>) },
        'render': () => {
          return (
            <Textarea
              value={this.props.Reasons}
              onUpdate={this.onUpdate.bind(this, 'Reasons')}
              label={'Provide the reasons why the name changed'}
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
              <p>View all the sections associated with <strong>Other Names Used</strong> at once</p>
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
        <div className="other-names-used">
          {this.sectionMap('name').render()}
          {this.sectionMap('maidenname').render()}
          {this.sectionMap('daterange').render()}
          {this.sectionMap('reasons').render()}
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
  let othernames = app.OtherNames || {}
  return {
    Name: othernames.Name || {},
    MaidenName: othernames.MaidenName || {},
    DatesUsed: othernames.DatesUsed || {},
    Reasons: othernames.Reasons || ''

  }
}

export default connect(mapStateToProps)(AuthenticatedView(OtherNamesUsed))
