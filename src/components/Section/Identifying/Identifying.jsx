import React from 'react'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { push } from '../../../middleware/history'
import Height from '../../Form/Height'
import Weight from '../../Form/Weight'
import HairColor from '../../Form/HairColor'
import EyeColor from '../../Form/EyeColor'
import Sex from '../../Form/Sex'

class Identifying extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  handleTour (event) {
    this.props.dispatch(push('/form/identifying/height'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/identifying/review'))
  }

  handleTransition (nextSection, event) {
    this.props.dispatch(push(`/form/identifying/${nextSection}`))
  }

  // Mapping section identifiers to the associated components.
  sectionMap (section) {
    let map = {
      'height': {
        'prev': () => { return '' },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'weight')}>Next Section</button>) },
        'render': () => { return (<Height />) }
      },
      'weight': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'height')}>Previous Section</button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'haircolor')}>Next Section</button>) },
        'render': () => { return (<Weight />) }
      },
      'haircolor': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'weight')}>Previous Section</button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'eyecolor')}>Next Section</button>) },
        'render': () => { return (<HairColor />) }
      },
      'eyecolor': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'haircolor')}>Previous Section</button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'sex')}>Next Section</button>) },
        'render': () => { return (<EyeColor />) }
      },
      'sex': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'eyecolor')}>Previous Section</button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, '')}>Finish Section</button>) },
        'render': () => { return (<Sex />) }
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
              <p>View all the sections associated with <strong>Identifying</strong> at once</p>
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
        <div className="identifying">
          <Height />
          <Weight />
          <HairColor />
          <EyeColor />
          <Sex />
        </div>
      )
    }

    return (
      <div className="identifying">
        {this.sectionMap(subsection).render()}
        {this.sectionMap(subsection).prev()}
        {this.sectionMap(subsection).next()}
      </div>
    )
  }
}

export default AuthenticatedView(Identifying)
