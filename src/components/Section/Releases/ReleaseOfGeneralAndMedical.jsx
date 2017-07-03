import React from 'react'
import SubsectionElement from '../SubsectionElement'
import { SignatureValidator } from '../../../validators'
import Verify from './Verify'
import General from './General'
import Medical from './Medical'

export default class ReleaseOfGeneralAndMedical extends SubsectionElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateGeneral = this.updateGeneral.bind(this)
    this.updateMedical = this.updateMedical.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      General: this.props.General,
      Medical: this.props.Medical,
      ...queue
    })
  }

  updateGeneral (values) {
    this.update({ General: values })
  }

  updateMedical (values) {
    this.update({ Medical: values })
  }

  render () {
    return (
      <div className="general-medical-release">
        <Verify identification={this.props.Identification}
                history={this.props.History}
                />
        <hr />
        <General {...this.props.General}
                 onUpdate={this.updateGeneral}
                 onError={this.handleError}
                 />
        <hr />
        <Medical {...this.props.Medical}
                 onUpdate={this.updateMedical}
                 onError={this.handleError}
                 />
      </div>
    )
  }
}

ReleaseOfGeneralAndMedical.defaultProps = {
  Identification: {},
  History: {},
  General: {},
  Medical: {},
  section: 'releases',
  subsection: 'general',
  dispatch: () => {},
  validator: (state, props) => {
    const general = props.General || {}
    const medical = props.General || {}
    return new SignatureValidator(state, general).isValid() &&
      new SignatureValidator(state, medical).isValid()
  },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
