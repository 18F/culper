import React from 'react'

import i18n from 'util/i18n'
import schema from 'schema'
import validate from 'validators'
import { Accordion, BranchCollection } from 'components/Form'
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

  updateBranch = (values) => {
    const HasOffenses = values && values.items
      && values.items.some(i => i && i.Item && i.Item.Has && i.Item.Has.value === 'Yes')

    this.update({
      HasOffenses: { value: HasOffenses ? 'Yes' : 'No' },
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
        data-section={LEGAL.key}
        data-subsection={LEGAL_POLICE_OFFENSES.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.police.offenses')}</h1>

        <BranchCollection
          {...this.props.List}
          branchName="has_offenses"
          label={i18n.t('legal.police.heading.questions')}
          labelSize="h4"
          className="has-offenses"
          warning
          appendLabel={i18n.t('legal.police.collection.appendTitle')}
          appendSize="h4"
          appendContent={i18n.m('legal.police.collection.appendMessage', { numberOfYearsString })}
          onUpdate={this.updateBranch}
          scrollToBottom={this.props.scrollToBottom}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
          content={(
            <ul>
              <li>{i18n.m('legal.police.label.summons', { numberOfYearsString })}</li>
              <li>{i18n.m('legal.police.label.arrests', { numberOfYearsString })}</li>
              <li>{i18n.m('legal.police.label.charges', { numberOfYearsString })}</li>
              <li>{i18n.m('legal.police.label.probation', { numberOfYearsString })}</li>
              <li>{i18n.m('legal.police.label.trial')}</li>
            </ul>
          )}
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
        </BranchCollection>
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
