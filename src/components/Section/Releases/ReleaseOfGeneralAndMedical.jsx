import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement } from '../../Form'
import Verify from './Verify'
import General from './General'
import Medical from './Medical'

export default class ReleaseOfGeneralAndMedical extends ValidationElement {
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
        <General onUpdate={this.updateGeneral}
                 {...this.props.General}
                 />
        <hr />
        <Medical onUpdate={this.updateMedical}
                 {...this.props.Medical}
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
  onUpdate: (queue) => {}
}
