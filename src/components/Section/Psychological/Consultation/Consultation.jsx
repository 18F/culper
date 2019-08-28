import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'

import validate, { ConsultationOrderValidator } from 'validators'

import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'

import { PSYCHOLOGICAL, PSYCHOLOGICAL_CONSULTATIONS } from 'config/formSections/psychological'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'

import Order from '../Order'

const sectionConfig = {
  key: PSYCHOLOGICAL_CONSULTATIONS.key,
  section: PSYCHOLOGICAL.name,
  store: PSYCHOLOGICAL.store,
  subsection: PSYCHOLOGICAL_CONSULTATIONS.name,
  storeKey: PSYCHOLOGICAL_CONSULTATIONS.storeKey,
}

export class Consultation extends Subsection {
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
      Consulted: this.props.Consulted,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateConsulted = (values) => {
    this.update({
      Consulted: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const occurred = DateSummary(o.Occurred || {})
    const courtName = (o.CourtName || {}).value || ''

    return Summary({
      type: i18n.t('psychological.consultation.collection.itemType'),
      index,
      left: courtName,
      right: occurred,
      placeholder: i18n.t(
        'psychological.consultation.collection.summaryCourtName'
      ),
    })
  }

  render() {
    return (
      <div
        className="section-content consultation"
        data-section={PSYCHOLOGICAL.key}
        data-subsection={PSYCHOLOGICAL_CONSULTATIONS.key}
      >
        <h1 className="section-header">{i18n.t('psychological.destination.consultation')}</h1>
        <Branch
          name="is_incompetent"
          label={i18n.t('psychological.heading.consultation')}
          labelSize="h4"
          {...this.props.Consulted}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateConsulted}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('psychological.heading.consultation2')}
        </Branch>

        <Show when={this.props.Consulted.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ConsultationOrderValidator}
            description={i18n.t(
              'psychological.consultation.collection.description'
            )}
            appendTitle={i18n.t(
              'psychological.consultation.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'psychological.consultation.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Order
              name="Item"
              prefix="consultation"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              bind={true}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Consultation.defaultProps = {
  Consulted: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('psychological.consultations', data)),
  scrollToBottom: '.bottom-btns',
}

export default connectSubsection(Consultation, sectionConfig)
