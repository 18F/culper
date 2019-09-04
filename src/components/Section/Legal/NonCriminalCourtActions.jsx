import React from 'react'
import i18n from 'util/i18n'
import * as formConfig from 'config/forms'
import { getNumberOfYearsString } from 'helpers/text'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  LEGAL,
  LEGAL_COURT,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import NonCriminalCourtAction from './NonCriminalCourtAction'

const sectionConfig = {
  key: LEGAL_COURT.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_COURT.name,
  storeKey: LEGAL_COURT.storeKey,
}

export class NonCriminalCourtActions extends Subsection {
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
      HasCourtActions: this.props.HasCourtActions,
      List: this.props.List,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasCourtActions = (values) => {
    this.update({
      HasCourtActions: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const date = DateSummary(o.CivilActionDate)
    const courtName = (o.CourtName || {}).value || ''

    return Summary({
      type: i18n.t('legal.nonCriminalAction.collection.itemType'),
      index,
      left: courtName,
      right: date,
      placeholder: i18n.t('legal.nonCriminalAction.collection.summary'),
    })
  }

  render() {
    const { formType, errors } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.LEGAL_COURT_YEARS
    const numberOfYearsString = getNumberOfYearsString(years)
    const branchLabelCopy = i18n.t('legal.nonCriminalAction.heading.hasCourtActions', { numberOfYearsString })

    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content non-criminal-court-actions"
        data-section={LEGAL.key}
        data-subsection={LEGAL_COURT.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.court')}</h1>
        <Branch
          name="HasCourtActions"
          label={branchLabelCopy}
          labelSize="h4"
          className="has-court-actions"
          {...this.props.HasCourtActions}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHasCourtActions}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasCourtActions.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('legal.nonCriminalAction.collection.description')}
            appendTitle={i18n.t('legal.nonCriminalAction.collection.appendTitle')}
            appendLabel={i18n.t('legal.nonCriminalAction.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <NonCriminalCourtAction
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

NonCriminalCourtActions.defaultProps = {
  HasCourtActions: {},
  List: Accordion.defaultList,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'court',
  addressBooks: {},
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(NonCriminalCourtActions, sectionConfig)
