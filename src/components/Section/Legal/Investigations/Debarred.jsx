import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { DebarredValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_INVESTIGATIONS_DEBARRED,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import DebarredItem from './DebarredItem'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_INVESTIGATIONS_DEBARRED.name,
  storeKey: LEGAL_INVESTIGATIONS_DEBARRED.storeKey,
}

export class Debarred extends Subsection {
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
      HasDebarment: this.props.HasDebarment,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateBranch = (values) => {
    this.update({
      HasDebarment: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Date)
    const agency = (o.Agency || {}).value || ''

    return Summary({
      type: i18n.t('legal.investigations.debarred.collection.item'),
      index,
      left: agency,
      right: dates,
      placeholder: i18n.t('legal.investigations.debarred.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content investigations-debarred"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.investigations.debarred')}</h1>
        <Branch
          name="has_debarred"
          label={i18n.t('legal.investigations.debarred.heading.title')}
          labelSize="h4"
          className="legal-investigations-debarred-has-debarment"
          {...this.props.HasDebarment}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasDebarment.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={DebarredValidator}
            description={i18n.t('legal.investigations.debarred.collection.description')}
            appendTitle={i18n.t('legal.investigations.debarred.collection.appendTitle')}
            appendLabel={i18n.t('legal.investigations.debarred.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DebarredItem
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

Debarred.defaultProps = {
  name: 'debarred',
  HasDebarment: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'investigations/debarred',
  dispatch: () => {},
  validator: data => validate(schema('legal.investigations.debarred', data)),
  scrollToBottom: '',
}

export default connectLegalSection(Debarred, sectionConfig)
