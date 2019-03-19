import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { NonCriminalCourtActionValidator } from 'validators'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  LEGAL,
  LEGAL_COURT,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from './LegalConnector'
import NonCriminalCourtAction from './NonCriminalCourtAction'

const sectionConfig = {
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
    return (
      <div
        className="section-content non-criminal-court-actions"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.court')}</h1>
        <Branch
          name="HasCourtActions"
          label={i18n.t('legal.nonCriminalAction.heading.hasCourtActions')}
          labelSize="h4"
          className="has-court-actions"
          {...this.props.HasCourtActions}
          warning
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
            validator={NonCriminalCourtActionValidator}
            description={i18n.t('legal.nonCriminalAction.collection.description')}
            appendTitle={i18n.t('legal.nonCriminalAction.collection.appendTitle')}
            appendLabel={i18n.t('legal.nonCriminalAction.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <NonCriminalCourtAction
              name="Item"
              bind
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
  validator: data => validate(schema('legal.court', data)),
  scrollToBottom: '',
}

export default connectLegalSection(NonCriminalCourtActions, sectionConfig)
