import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import { Summary, DateSummary } from '../../../Summary'
import validate, { HospitalizationValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Hospitalization from './Hospitalization'

export default class Hospitalizations extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHospitalized = this.updateHospitalized.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      Hospitalized: this.props.Hospitalized,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateHospitalized (values) {
    this.update({
      Hospitalized: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const treatmentDate = (o.TreatmentDate || {})
    const date = DateSummary(treatmentDate)
    const facility = (o.Facility || {}).value || ''

    return Summary({
      type: i18n.t('psychological.hospitalization.collection.itemType'),
      index: index,
      left: facility,
      right: date,
      placeholder: i18n.m('psychological.hospitalization.collection.summary')
    })
  }

  render () {
    return (
      <div className="hospitalizations">
        <Branch name="hospitalized"
                label={i18n.t('psychological.heading.hospitalization')}
                labelSize="h2"
                {...this.props.Hospitalized}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHospitalized}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.Hospitalized.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={HospitalizationValidator}
                     description={i18n.t('psychological.hospitalization.collection.description')}
                     appendTitle={i18n.t('psychological.hospitalization.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.hospitalization.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Hospitalization name="Item"
                             bind={true}
                             required={this.props.required}
                             scrollIntoView={this.props.scrollIntoView}
                             />
          </Accordion>

        </Show>
      </div>
    )
  }
}

Hospitalizations.defaultProps = {
  Hospitalized: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'hospitalizations',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('psychological.hospitalizations', data))
  },
  scrollToBottom: ''
}
