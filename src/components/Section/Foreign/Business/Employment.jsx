import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ForeignBusinessEmploymentItemValidator } from 'validators'
import { Summary, DateSummary, NameSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_EMPLOYMENT } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../ForeignConnector'
import JobOffer from './JobOffer'

const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_EMPLOYMENT.name,
  storeKey: FOREIGN_BUSINESS_EMPLOYMENT.storeKey,
}
export class Employment extends Subsection {
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
      HasForeignEmployment: this.props.HasForeignEmployment,
      ...queue,
    })
  }

  updateHasForeignEmployment = (values) => {
    this.update({
      HasForeignEmployment: values,
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
    const o = (item || {}).Item || {}
    const date = DateSummary(o.Dates)
    const name = NameSummary(o.Name)

    return Summary({
      type: i18n.t('foreign.business.employment.collection.summary.item'),
      index,
      left: name,
      right: date,
      placeholder: i18n.t('foreign.business.employment.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-business-employment"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('foreign.destination.business.employment')}</h1>
        <Branch
          name="has_foreign_employment"
          label={i18n.t('foreign.business.employment.heading.title')}
          labelSize="h4"
          {...this.props.HasForeignEmployment}
          warning
          onUpdate={this.updateHasForeignEmployment}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.HasForeignEmployment || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            validator={ForeignBusinessEmploymentItemValidator}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('foreign.business.employment.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.employment.collection.appendTitle')}
            appendLabel={i18n.t('foreign.business.employment.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <JobOffer
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

Employment.defaultProps = {
  name: 'Employment',
  HasForeignEmployment: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/employment',
  dispatch: () => {},
  validator: data => validate(schema('foreign.business.employment', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectForeignSection(Employment, sectionConfig)
