import React from 'react'
import i18n from 'util/i18n'
import * as formConfig from 'config/forms'
import { getNumberOfYearsString } from 'helpers/text'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
} from 'config/formSections/substanceUse'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import VoluntaryCounseling from './VoluntaryCounseling'

const sectionConfig = {
  key: SUBSTANCE_USE_ALCOHOL_VOLUNTARY.key,
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_ALCOHOL_VOLUNTARY.name,
  storeKey: SUBSTANCE_USE_ALCOHOL_VOLUNTARY.storeKey,
}
export class VoluntaryCounselings extends Subsection {
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

  update = (updateValues) => {
    this.props.onUpdate(this.storeKey, {
      SoughtTreatment: this.props.SoughtTreatment,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateSoughtTreatment = (values) => {
    this.update({
      SoughtTreatment: values,
      List: values.value === 'Yes'
        ? this.props.List
        : { items: [], branch: {} },
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const counselor = o.TreatmentProviderName
      ? o.TreatmentProviderName.value
      : ''
    const counselingDates = DateSummary(o.CounselingDates)

    return Summary({
      type: i18n.t('substance.alcohol.voluntaryCounseling.collection.itemType'),
      index,
      left: counselor,
      right: counselingDates,
      placeholder: i18n.t('substance.alcohol.voluntaryCounseling.collection.summary'),
    })
  }

  render() {
    const { formType, errors } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.SUBSTANCE_ALCOHOL_TREATMENT_YEARS
    let branchLabelCopy
    if (years === 'EVER') {
      branchLabelCopy = i18n.t('substance.alcohol.heading.voluntaryCounseling')
    } else {
      const numberOfYearsString = getNumberOfYearsString(years)
      branchLabelCopy = i18n.t('substance.alcohol.heading.voluntaryCounselingNum', { numberOfYearsString })
    }

    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content voluntary-counselings"
        data-section={SUBSTANCE_USE.key}
        data-subsection={SUBSTANCE_USE_ALCOHOL_VOLUNTARY.key}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.alcohol.voluntary')}</h1>
        <Branch
          name="SoughtTreatment"
          label={branchLabelCopy}
          labelSize="h4"
          className="sought-treatment"
          {...this.props.SoughtTreatment}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateSoughtTreatment}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.SoughtTreatment.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('substance.alcohol.voluntaryCounseling.collection.description')}
            appendTitle={i18n.t('substance.alcohol.voluntaryCounseling.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.voluntaryCounseling.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <VoluntaryCounseling
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

VoluntaryCounselings.defaultProps = {
  SoughtTreatment: {},
  List: Accordion.defaultList,
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'alcohol/voluntary',
  addressBooks: {},
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(VoluntaryCounselings, sectionConfig)
