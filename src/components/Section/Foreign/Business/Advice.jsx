import React from 'react'
import i18n from 'util/i18n'
import { Summary, NameSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_ADVICE } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import AdviceItem from './AdviceItem'

const sectionConfig = {
  key: FOREIGN_BUSINESS_ADVICE.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_ADVICE.name,
  storeKey: FOREIGN_BUSINESS_ADVICE.storeKey,
}
export class Advice extends Subsection {
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
      HasForeignAdvice: this.props.HasForeignAdvice,
      ...queue,
    })
  }

  updateHasForeignAdvice = (values) => {
    this.update({
      HasForeignAdvice: values,
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
      type: i18n.t('foreign.business.advice.collection.summary.item'),
      index,
      left: name,
      right: null,
      placeholder: i18n.t('foreign.business.advice.collection.summary.unknown'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content foreign-business-advice"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_BUSINESS_ADVICE.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.advice')}</h1>
        <Branch
          name="has_foreign_advice"
          label={i18n.t('foreign.business.advice.heading.title')}
          labelSize="h4"
          adjustFor="p"
          {...this.props.HasForeignAdvice}
          warning={true}
          onUpdate={this.updateHasForeignAdvice}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.business.advice.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignAdvice.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            summary={this.summary}
            description={i18n.t('foreign.business.advice.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.advice.collection.appendTitle')}
            appendMessage={i18n.m('foreign.business.advice.collection.appendMessage')}
            appendLabel={i18n.t('foreign.business.advice.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <AdviceItem
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

Advice.defaultProps = {
  name: 'Advice',
  HasForeignAdvice: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/advice',
  dispatch: () => {},
  defaultState: true,
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(Advice, sectionConfig)
