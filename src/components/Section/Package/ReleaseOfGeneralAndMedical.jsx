import React from 'react'
import SubsectionElement from '../SubsectionElement'
import { SignatureValidator } from '../../../validators'
import { hideHippa } from '../../../validators/releases'
import { Show } from '../../Form'
import Verify from './Verify'
import General from './General'
import Medical from './Medical'

export default class ReleaseOfGeneralAndMedical extends SubsectionElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateGeneral = this.updateGeneral.bind(this)
    this.updateMedical = this.updateMedical.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      General: this.props.General,
      Medical: this.props.Medical,
      ...queue
    })
  }

  updateGeneral(values) {
    this.update({ General: values })
  }

  updateMedical(values) {
    this.update({ Medical: values })
  }

  render() {
    return (
      <div className="general-medical-release">
        <Verify
          identification={this.props.Identification}
          history={this.props.History}
        />
        <hr />
        <General
          {...this.props.General}
          LegalName={this.props.LegalName}
          onUpdate={this.updateGeneral}
          onError={this.handleError}
        />
        <Show when={!hideHippa(this.props.Application)}>
          <div>
            <hr />
            <Medical
              {...this.props.Medical}
              LegalName={this.props.LegalName}
              onUpdate={this.updateMedical}
              onError={this.handleError}
            />
          </div>
        </Show>
      </div>
    )
  }
}

ReleaseOfGeneralAndMedical.defaultProps = {
  Application: {},
  Identification: {},
  History: {},
  General: {},
  Medical: {},
  LegalName: {},
  section: 'releases',
  subsection: 'general',
  dispatch: () => {},
  validator: data => {
    const general = new SignatureValidator(data.General || {}).isValid()
    if (hideHippa(data.Application)) {
      return general
    }

    const medical = new SignatureValidator(data.Medical || {}).isValid()
    return general && medical
  },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
