import React from 'react'
import { i18n } from 'config'
import { Summary, DateSummary, NameSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_VENTURES } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import VenturesItem from './VenturesItem'

const sectionConfig = {
  key: FOREIGN_BUSINESS_VENTURES.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_VENTURES.name,
  storeKey: FOREIGN_BUSINESS_VENTURES.storeKey,
}

export class Ventures extends Subsection {
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
      HasForeignVentures: this.props.HasForeignVentures,
      List: this.props.List,
      ...queue,
    })
  }

  updateHasForeignVentures = (values) => {
    this.update({
      HasForeignVentures: values,
      List: values.value === 'Yes'
        ? this.props.List
        : { branch: {}, items: [] },
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const obj = (item && item.Item) || {}
    const date = DateSummary(item.Dates)
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.ventures.collection.summary.item'),
      index,
      left: name,
      right: date,
      placeholder: i18n.t('foreign.business.ventures.collection.summary.unknown'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content foreign-business-ventures"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_BUSINESS_VENTURES.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.ventures')}</h1>
        <Branch
          name="has_foreign_ventures"
          label={i18n.t('foreign.business.ventures.heading.title')}
          labelSize="h4"
          adjustFor="p"
          {...this.props.HasForeignVentures}
          warning={true}
          onUpdate={this.updateHasForeignVentures}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.business.ventures.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignVentures.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            summary={this.summary}
            description={i18n.t('foreign.business.ventures.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.ventures.collection.appendTitle')}
            appendMessage={i18n.m('foreign.business.ventures.collection.appendMessage')}
            appendLabel={i18n.t('foreign.business.ventures.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <VenturesItem
              name="Item"
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

Ventures.defaultProps = {
  name: 'Ventures',
  HasForeignVentures: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/ventures',
  addressBooks: {},
  dispatch: () => {},
  defaultState: true,
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(Ventures, sectionConfig)
