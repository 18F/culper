import React from 'react'

import i18n from 'util/i18n'
import schema from 'schema'
import validate from 'validators'
import { BranchCollection } from 'components/Form'

import { LEGAL, LEGAL_POLICE_OFFENSES } from 'config/formSections/legal'
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

  updateList = (collection) => {
    this.props.onUpdate(this.storeKey, { List: collection })
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
          onUpdate={this.updateList}
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
            bind
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            defaultState={this.props.defaultState}
            onError={this.handleError}
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
  onUpdate: () => {},
  onError: (value, arr) => arr,
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.police.offenses', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectLegalSection(Offenses, sectionConfig)
