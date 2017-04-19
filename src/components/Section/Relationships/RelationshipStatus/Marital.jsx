import React from 'react'
import { i18n } from '../../../../config'
import { Field, ValidationElement, Show, RadioGroup, Radio } from '../../../Form'
import CivilUnion from './CivilUnion'
import { MaritalValidator } from '../../../../validators'

export default class Marital extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Status: props.Status,
      CivilUnion: props.CivilUnion,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateCivilUnion = this.updateCivilUnion.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Status: this.state.Status,
          CivilUnion: this.state.CivilUnion
        })
      }
    })
  }

  isValid () {
    return new MaritalValidator(this.state).isValid()
  }

  updateStatus (values) {
    this.update('Status', values.target.value)
  }

  updateCivilUnion (values) {
    this.update('CivilUnion', values)
  }

  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  render () {
    return (
      <div className="marital">
        <Field title={i18n.t('relationships.status.heading.title')}>
          <RadioGroup name="status" className="status-options" selectedValue={this.state.Status}>
            <Radio
              label={i18n.m('relationships.status.label.status.never')}
              value="Never"
              onChange={this.updateStatus}
              onValidate={this.handleValidation}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.inCivilUnion')}
              value="InCivilUnion"
              onChange={this.updateStatus}
              onValidate={this.handleValidation}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.separated')}
              value="Separated"
              onChange={this.updateStatus}
              onValidate={this.handleValidation}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.annulled')}
              value="Annulled"
              onChange={this.updateStatus}
              onValidate={this.handleValidation}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.divorced')}
              value="Divorced"
              onChange={this.updateStatus}
              onValidate={this.handleValidation}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.widowed')}
              value="Widowed"
              onChange={this.updateStatus}
              onValidate={this.handleValidation}
            />
          </RadioGroup>
        </Field>

        <Show when={['InCivilUnion', 'Separated'].includes(this.state.Status)}>
          <CivilUnion name="civilUnion"
            {...this.state.CivilUnion}
            onUpdate={this.updateCivilUnion}
            onValidate={this.handleValidation}
          />
        </Show>
      </div>
    )
  }
}

Marital.defaultProps = {
}

