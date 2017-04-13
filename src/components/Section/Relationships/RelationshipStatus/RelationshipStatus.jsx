import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, Field, DateControl, ValidationElement, Branch, Show, CheckboxGroup, RadioGroup, Radio, Name } from '../../../Form'

export default class RelationshipStatus extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Status: props.Status,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Status: this.state.Status,
          List: this.state.List
        })
      }
    })
  }

  isValid () {
    return true
  }

  updateStatus (values) {
    this.update('Status', values.target.value)
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
      <div className="relationship-status">
        <h3>{i18n.t('relationships.status.heading.title')}</h3>
        <RadioGroup name="status" className="option-list relatives-relation" selectedValue={this.state.Status}>
          <Radio
            label={i18n.m('relationships.status.label.status.never')}
            value="Never"
            className="status"
            onChange={this.updateStatus}
          />
          <Radio
            label={i18n.m('relationships.status.label.status.inCivilUnion')}
            value="InCivilUnion"
            className="status"
            onChange={this.updateStatus}
          />
        </RadioGroup>

        <Show when={this.state.Status === 'Never'}>
          <div>
            <p>{i18n.t('relationships.status.para.never')}</p>

            <Field title={i18n.t('relationships.status.heading.name')}
              adjustFor="labels">
              <Name name="Name"
                {...this.state.Name}
              />
            </Field>

            <Field help="relationships.status.help.birthdate"
              title="Provide date of birth"
              adjustFor="labels"
              shrink={true}>
              <DateControl name="birthdate"
                value={this.state.Birthdate}
                onUpdate={this.updateBirthdate}
                onValidate={this.handleValidation}
              />
            </Field>
          </div>
        </Show>
        <Show when={this.state.Status === 'InCivilUnion'}>
          <div>
            Civil Union
          </div>
        </Show>
      </div>
    )
  }
}

RelationshipStatus.defaultProps = {
  List: []
}
