import React from 'react'
import { i18n } from 'config'
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
    const { errors = [] } = this.props
    const errorList = {
      'List.accordion.items.length.LENGTH_TOO_SHORT': {
        key: 'List.accordion.items.length.LENGTH_TOO_SHORT',
        title: i18n.t('error.validMinimumCitizenships.title'),
        message: i18n.t('error.validMinimumCitizenships.message'),
        shouldDisplayError: true,
      },
    }

    const sectionErrors = []
    errors.forEach((error) => {
      const errorItem = errorList[error]
      if (errorItem && errorItem.shouldDisplayError) {
        sectionErrors.push(errorItem)
      }
    })

    return sectionErrors
  }

  render() {
    const { List, errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

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
            <ErrorMessageList errors={this.getSectionErrors()} />
          )}

          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
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
  defaultState: true,
  required: false,
  scrollIntoView: false,
  requireMultipleCitizenshipRenounced: true,
  errors: [],
}

export default connectSubsection(Multiple, sectionConfig)
