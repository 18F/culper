import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { push } from '../../../middleware/history'
import Height from '../../Form/Height'
import Weight from '../../Form/Weight'
import HairColor from '../../Form/HairColor'
import EyeColor from '../../Form/EyeColor'
import Sex from '../../Form/Sex'
import { updateApplication } from '../../../actions/ApplicationActions'

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

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('YourIdentification', field, values))
  }

  // Mapping section identifiers to the associated components.
  sectionMap (section) {
    let map = {
      'height': {
        'prev': () => { return '' },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'weight')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'render': () => {
          return (
            <Height
              {...this.props.Height}
              onUpdate={this.onUpdate.bind(this, 'Height')}
            />
          )
        }
      },
      'weight': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'height')} className="eapp-prev"><span className="fa fa-arrow-circle-left button-icon"></span><span><span className="eapp-nav-label">Previous</span> Section</span></button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'haircolor')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'render': () => {
          return (
            <Weight
              value={this.props.Weight}
              onUpdate={this.onUpdate.bind(this, 'Weight')}
            />
          )
        }
      },
      'haircolor': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'weight')} className="eapp-prev"><span className="fa fa-arrow-circle-left button-icon"></span><span><span className="eapp-nav-label">Previous</span> Section</span></button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'eyecolor')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'render': () => {
          return (
            <HairColor
              value={this.props.HairColor}
              onUpdate={this.onUpdate.bind(this, 'HairColor')}
            />
          )
        }
      },
      'eyecolor': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'haircolor')} className="eapp-prev"><span className="fa fa-arrow-circle-left button-icon"></span><span><span className="eapp-nav-label">Previous</span> Section</span></button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, 'sex')} className="eapp-next"><span><span className="eapp-nav-label">Next</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'render': () => {
          return (
            <EyeColor
              value={this.props.EyeColor}
              onUpdate={this.onUpdate.bind(this, 'EyeColor')}
            />
          )
        }
      },
      'sex': {
        'prev': () => { return (<button onClick={this.handleTransition.bind(this, 'eyecolor')} className="eapp-prev"><span className="fa fa-arrow-circle-left button-icon"></span><span><span className="eapp-nav-label">Previous</span> Section</span></button>) },
        'next': () => { return (<button onClick={this.handleTransition.bind(this, '')} className="eapp-next"><span><span className="eapp-nav-label">Finish</span> Section</span><span className="fa fa-arrow-circle-right button-icon"></span></button>) },
        'render': () => {
          return (
            <Sex
              value={this.props.Sex}
              onUpdate={this.onUpdate.bind(this, 'Sex')}
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
          {this.sectionMap('height').render()}
          {this.sectionMap('weight').render()}
          {this.sectionMap('haircolor').render()}
          {this.sectionMap('eyecolor').render()}
          {this.sectionMap('sex').render()}
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

function mapStateToProps (state) {
  let app = state.application || {}
  let identification = app.YourIdentification || {}
  return {
    Height: identification.Height || {},
    Weight: identification.Weight || 0,
    HairColor: identification.HairColor || '',
    EyeColor: identification.EyeColor || '',
    Sex: identification.Sex || '',

  }
}

export default connect(mapStateToProps)(AuthenticatedView(Identifying))
