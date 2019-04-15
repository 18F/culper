import React from 'react'

import i18n from 'util/i18n'
import schema from 'schema'
import validate, { OffenseValidator } from 'validators'
import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'

import {
  LEGAL,
  LEGAL_POLICE_OFFENSES,
} from 'config/formSections/legal'
import * as formConfig from 'config/forms'
import { getNumberOfYearsString } from 'helpers/text'

import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import Offense from './Offense'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_POLICE_OFFENSES.name,
  storeKey: LEGAL_POLICE_OFFENSES.storeKey,
}
export class Offenses extends Subsection {
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
      HasOffenses: this.props.HasOffenses,
      ...queue,
    })
  }

  updateHasOffenses = (values) => {
    this.update({
      HasOffenses: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Date)
    const description = o.Description && o.Description.value
      ? o.Description.value
      : ''

    return Summary({
      type: i18n.t('legal.police.collection.summary.item'),
      index,
      left: description,
      right: dates,
      placeholder: i18n.t('legal.police.collection.summary.unknown'),
    })
  }

  render() {
    const {
      formType,
      requireLegalOffenseInvolvements,
      requireLegalOffenseSentenced,
      requireLegalOffenseIncarcerated,
    } = this.props

    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.LEGAL_POLICE_RECORD_YEARS
    const numberOfYearsString = getNumberOfYearsString(years)

    return (
      <div
        className="section-content police-offenses"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.police.offenses')}</h1>
        <Branch
          name="has_offenses"
          label={i18n.t('legal.police.heading.questions')}
          labelSize="h4"
          className="has-offenses"
          {...this.props.HasOffenses}
          warning
          onUpdate={this.updateHasOffenses}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          <ul>
            <li>{i18n.m('legal.police.label.summons', { numberOfYearsString })}</li>
            <li>{i18n.m('legal.police.label.arrests', { numberOfYearsString })}</li>
            <li>{i18n.m('legal.police.label.charges', { numberOfYearsString })}</li>
            <li>{i18n.m('legal.police.label.probation', { numberOfYearsString })}</li>
            <li>{i18n.m('legal.police.label.trial')}</li>
          </ul>
        </Branch>
        <Show when={this.props.HasOffenses.value === 'Yes'}>
          <div>
            <Accordion
              {...this.props.List}
              defaultState={this.props.defaultState}
              scrollToBottom={this.props.scrollToBottom}
              onUpdate={this.updateList}
              onError={this.handleError}
              validator={OffenseValidator}
              summary={this.summary}
              description={i18n.t('legal.police.collection.summary.title')}
              appendTitle={i18n.t('legal.police.collection.appendTitle')}
              appendMessage={i18n.m('legal.police.collection.appendMessage', { numberOfYearsString })}
              appendLabel={i18n.t('legal.police.collection.append')}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Offense
                name="Item"
                addressBooks={this.props.addressBooks}
                dispatch={this.props.dispatch}
                bind
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                requireLegalOffenseInvolvements={requireLegalOffenseInvolvements}
                requireLegalOffenseSentenced={requireLegalOffenseSentenced}
                requireLegalOffenseIncarcerated={requireLegalOffenseIncarcerated}
              />
            </Accordion>
          </div>
        </Show>
      </div>
    )
  }
}

Offenses.defaultProps = {
  List: Accordion.defaultList,
  HasOffenses: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'police/offenses',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.police.offenses', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectLegalSection(Offenses, sectionConfig)
