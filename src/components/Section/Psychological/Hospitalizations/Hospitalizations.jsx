import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'

import validate, { HospitalizationValidator } from 'validators'

import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'

import Subsection from 'components/Section/shared/Subsection'

import { PSYCHOLOGICAL, PSYCHOLOGICAL_HOSPITALIZATIONS } from 'config/formSections/psychological'
import connectPsychologicalSection from '../PsychologicalConnector'

import Hospitalization from './Hospitalization'

const sectionConfig = {
  section: PSYCHOLOGICAL.name,
  store: PSYCHOLOGICAL.store,
  subsection: PSYCHOLOGICAL_HOSPITALIZATIONS.name,
  storeKey: PSYCHOLOGICAL_HOSPITALIZATIONS.storeKey,
}

export class Hospitalizations extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      Hospitalized: this.props.Hospitalized,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHospitalized = (values) => {
    this.update({
      Hospitalized: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const treatmentDate = o.TreatmentDate || {}
    const date = DateSummary(treatmentDate)
    const facility = (o.Facility || {}).value || ''

    return Summary({
      type: i18n.t('psychological.hospitalization.collection.itemType'),
      index,
      left: facility,
      right: date,
      placeholder: i18n.t('psychological.hospitalization.collection.summary'),
    })
  }

  render() {
    return (
      <div
        className="section-content hospitalizations"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('psychological.destination.hospitalization')}</h1>
        <Branch
          name="hospitalized"
          label={i18n.t('psychological.heading.hospitalization')}
          labelSize="h4"
          {...this.props.Hospitalized}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHospitalized}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.Hospitalized.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={HospitalizationValidator}
            description={i18n.t(
              'psychological.hospitalization.collection.description'
            )}
            appendTitle={i18n.t(
              'psychological.hospitalization.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'psychological.hospitalization.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Hospitalization
              name="Item"
              bind
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
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('psychological.hospitalizations', data)),
  scrollToBottom: '.bottom-btns',
}

export default connectPsychologicalSection(Hospitalizations, sectionConfig)
