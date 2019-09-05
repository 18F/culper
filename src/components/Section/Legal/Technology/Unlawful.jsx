import React from 'react'
import { i18n } from 'config'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_TECHNOLOGY_UNLAWFUL,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import UnlawfulItem from './UnlawfulItem'

const sectionConfig = {
  key: LEGAL_TECHNOLOGY_UNLAWFUL.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_TECHNOLOGY_UNLAWFUL.name,
  storeKey: LEGAL_TECHNOLOGY_UNLAWFUL.storeKey,
}

export class Unlawful extends Subsection {
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
      HasUnlawful: this.props.HasUnlawful,
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
      HasUnlawful: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Date)
    const incident = (o.Incident || {}).value ? o.Incident.value : ''

    return Summary({
      type: i18n.t('legal.technology.unlawful.collection.item'),
      index,
      left: incident,
      right: dates,
      placeholder: i18n.t('legal.technology.unlawful.collection.unknown'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content legal-technology-unlawful"
        data-section={LEGAL.key}
        data-subsection={LEGAL_TECHNOLOGY_UNLAWFUL.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.technology.unlawful')}</h1>
        <Branch
          name="has_unlawful"
          label={i18n.t('legal.technology.unlawful.heading.title')}
          labelSize="h4"
          className="legal-technology-unlawful-has-unlawful"
          {...this.props.HasUnlawful}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasUnlawful.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('legal.technology.unlawful.collection.description')}
            appendTitle={i18n.t('legal.technology.unlawful.collection.appendTitle')}
            appendLabel={i18n.t('legal.technology.unlawful.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <UnlawfulItem
              name="Item"
              bind={true}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Unlawful.defaultProps = {
  name: 'unlawful',
  HasUnlawful: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'technology/unlawful',
  addressBooks: {},
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(Unlawful, sectionConfig)
