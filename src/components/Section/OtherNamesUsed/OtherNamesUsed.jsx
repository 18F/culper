import React from 'react'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { push } from '../../../middleware/history'

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
  }

  handleReview (event) {
    this.props.dispatch(push('/form/othernames/review'))
  }

  handleTransition (nextSection, event) {
    this.props.dispatch(push(`/form/identification/${nextSection}`))
  }

  // Mapping section identifiers to the associated components.
  sectionMap (section) {
    let map = {
      'name': {
        'prev': () => { return '' },
        'next': () => { return '' },
        'render': () => { return '' }
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
          Other name components go here
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

export default AuthenticatedView(OtherNamesUsed)
