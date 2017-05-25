import React from 'react'
import { i18n } from '../../../../config'
import { MaritalValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Show, RadioGroup, Radio } from '../../../Form'
import CivilUnion from './CivilUnion'

export default class Marital extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      Status: props.Status,
      CivilUnion: props.CivilUnion
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

  updateStatus (values) {
    this.update('Status', values.target.value)
  }

  updateCivilUnion (values) {
    this.update('CivilUnion', values)
  }

  render () {
    return (
      <div className="marital">
        <Field title={i18n.t('relationships.marital.heading.title')}>
          <RadioGroup name="status" className="status-options" selectedValue={this.state.Status}>
            <Radio label={i18n.m('relationships.marital.label.status.never')}
                   className="status-never"
                   value="Never"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.inCivilUnion')}
                   className="status-civil-union"
                   value="InCivilUnion"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.separated')}
                   className="status-separated"
                   value="Separated"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.annulled')}
                   className="status-annulled"
                   value="Annulled"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.divorced')}
                   className="status-divorced"
                   value="Divorced"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
            <Radio label={i18n.m('relationships.marital.label.status.widowed')}
                   className="status-widowed"
                   value="Widowed"
                   onChange={this.updateStatus}
                   onError={this.handleError}
                   />
          </RadioGroup>
        </Field>

        <Show when={['InCivilUnion', 'Separated'].includes(this.state.Status)}>
          <CivilUnion name="civilUnion"
                      {...this.state.CivilUnion}
                      onUpdate={this.updateCivilUnion}
                      onError={this.handleError}
                      onSpouseUpdate={this.props.onSpouseUpdate}
                      currentAddress={this.props.currentAddress}
                      />
        </Show>
      </div>
    )
  }
}

Marital.defaultProps = {
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'status/marital',
  dispatch: () => {},
  validator: (state, props) => {
    return new MaritalValidator(state, props).isValid()
  }
}
