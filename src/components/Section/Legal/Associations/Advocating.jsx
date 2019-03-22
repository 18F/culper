import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { AdvocatingValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_ASSOCIATIONS_ADVOCATING,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import AdvocatingItem from './AdvocatingItem'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_ASSOCIATIONS_ADVOCATING.name,
  storeKey: LEGAL_ASSOCIATIONS_ADVOCATING.storeKey,
}

export class Advocating extends Subsection {
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
      HasAdvocated: this.props.HasAdvocated,
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
      HasAdvocated: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.advocating.collection.item'),
      index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.advocating.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-advocating"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.advocating')}</h1>
        <Branch
          name="has_advocated"
          label={i18n.t('legal.associations.advocating.heading.title')}
          labelSize="h4"
          className="legal-associations-advocating-has-advocated"
          {...this.props.HasAdvocated}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasAdvocated.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={AdvocatingValidator}
            description={i18n.t('legal.associations.advocating.collection.description')}
            appendTitle={i18n.t('legal.associations.advocating.collection.appendTitle')}
            appendLabel={i18n.t('legal.associations.advocating.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <AdvocatingItem
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

Advocating.defaultProps = {
  name: 'advocating',
  HasAdvocated: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'associations/advocating',
  dispatch: () => {},
  validator: data => validate(schema('legal.associations.advocating', data)),
  scrollToBottom: '',
}

export default connectLegalSection(Advocating, sectionConfig)
