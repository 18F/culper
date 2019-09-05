import React from 'react'
import { i18n } from 'config'
import { Summary, NameSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_FAMILY } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import FamilyItem from './FamilyItem'

const sectionConfig = {
  key: FOREIGN_BUSINESS_FAMILY.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_FAMILY.name,
  storeKey: FOREIGN_BUSINESS_FAMILY.storeKey,
}

export class Family extends Subsection {
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
      HasForeignFamily: this.props.HasForeignFamily,
      ...queue,
    })
  }

  updateHasForeignFamily = (values) => {
    this.update({
      HasForeignFamily: values,
      List: values.value === 'Yes'
        ? this.props.List
        : { items: [], branch: {} },
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const obj = (item && item.Item) || {}
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.family.collection.summary.item'),
      index,
      left: name,
      right: null,
      placeholder: i18n.t('foreign.business.family.collection.summary.unknown'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content foreign-business-family"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_BUSINESS_FAMILY.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.family')}</h1>
        <Branch
          name="has_foreign_family"
          label={i18n.t('foreign.business.family.heading.title')}
          labelSize="h4"
          adjustFor="p"
          {...this.props.HasForeignFamily}
          warning={true}
          onUpdate={this.updateHasForeignFamily}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.business.family.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignFamily.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            summary={this.summary}
            description={i18n.t('foreign.business.family.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.family.collection.appendTitle')}
            appendMessage={i18n.m('foreign.business.family.collection.appendMessage')}
            appendLabel={i18n.t('foreign.business.family.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <FamilyItem
              name="Item"
              bind={true}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Family.defaultProps = {
  name: 'Family',
  HasForeignFamily: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/family',
  dispatch: () => {},
  defaultState: true,
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(Family, sectionConfig)
