import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { CitizenshipItemValidator } from 'validators'
import { countryString } from 'validators/location'
import {
  Branch,
  Show,
  Accordion,
} from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import ErrorMessageList from 'components/ErrorMessageList'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'

import {
  CITIZENSHIP,
  CITIZENSHIP_MULTIPLE,
} from 'config/formSections/citizenship'
import CitizenshipItem from './CitizenshipItem'

const sectionConfig = {
  key: CITIZENSHIP_MULTIPLE.key,
  section: CITIZENSHIP.name,
  store: CITIZENSHIP.store,
  subsection: CITIZENSHIP_MULTIPLE.name,
  storeKey: CITIZENSHIP_MULTIPLE.storeKey,
}

export class Multiple extends Subsection {
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
      HasMultiple: this.props.HasMultiple,
      ...queue,
    })
  }

  updateHasMultiple = (values) => {
    this.update({
      HasMultiple: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summaryList = (item, index) => {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Dates)
    const country = countryString(itemProperties.Country) || ''
    return Summary({
      type: i18n.t('citizenship.multiple.collection.citizenship.summary.item'),
      index,
      left: country,
      right: dates,
      placeholder: i18n.t('citizenship.multiple.collection.citizenship.summary.unknown'),
    })
  }

  getSectionErrors = () => {
    return {
      'List.accordion.items.length.LENGTH_TOO_SHORT': {
        errors: [{
          title: i18n.t('error.validMinimumCitizenships.title'),
          message: i18n.t('error.validMinimumCitizenships.message'),
          shouldDisplayError: () => true,
        }],
      },
    }

  }

  render() {
    const { List, errors = [] } = this.props
    return (
      <div
        className="section-content multiple"
        data-section={CITIZENSHIP.key}
        data-subsection={CITIZENSHIP_MULTIPLE.key}
      >
        <h1 className="section-header">{i18n.t('citizenship.destination.multiple')}</h1>
        <Branch
          name="has_multiple"
          label={i18n.t('citizenship.multiple.heading.hasmultiple')}
          labelSize="h4"
          className="has-multiple"
          {...this.props.HasMultiple}
          warning={true}
          onUpdate={this.updateHasMultiple}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasMultiple.value === 'Yes'}>
          {List.branch && List.branch.value === 'No' && (
            <ErrorMessageList
              errors={errors}
              errorMap={this.getSectionErrors()}
            />
          )}

          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={CitizenshipItemValidator}
            summary={this.summaryList}
            description={i18n.t('citizenship.multiple.collection.citizenship.summary.title')}
            appendTitle={i18n.t('citizenship.multiple.collection.citizenship.appendTitle')}
            appendLabel={i18n.t('citizenship.multiple.collection.citizenship.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <CitizenshipItem
              name="Item"
              bind={true}
              requireMultipleCitizenshipRenounced={this.props.requireMultipleCitizenshipRenounced}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Multiple.defaultProps = {
  HasMultiple: {},
  List: { items: [], branch: {} },
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('citizenship.multiple', data)),
  defaultState: true,
  required: false,
  scrollIntoView: false,
  requireMultipleCitizenshipRenounced: true,
}

export default connectSubsection(Multiple, sectionConfig)
