import React from 'react'

import i18n from 'util/i18n'
import schema from 'schema'
import validate from 'validators'

import { BranchCollection } from 'components/Form'

import { LEGAL, LEGAL_POLICE_ADDITIONAL_OFFENSES } from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'

import connectLegalSection from '../LegalConnector'
import OtherOffense from './OtherOffense'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_POLICE_ADDITIONAL_OFFENSES.name,
  storeKey: LEGAL_POLICE_ADDITIONAL_OFFENSES.storeKey,
}

export class OtherOffenses extends Subsection {
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

  otherOffenseBranch = () => (
    <div>
      <ul className="other-offenses">
        <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
        <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
        <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
        <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
        <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
      </ul>
    </div>
  )

  render() {
    return (
      <div
        className="section-content police-other-offenses"
        data-section={LEGAL.key}
        data-subsection={LEGAL_POLICE_ADDITIONAL_OFFENSES.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.police.additionalOffenses')}</h1>

        <BranchCollection
          {...this.props.List}
          branchName="has_otheroffenses"
          label={i18n.t('legal.police.para.otherOffense.intro')}
          className="has-otheroffenses"
          warning
          appendLabel={i18n.t('legal.police.collection.appendTitle')}
          appendSize="h4"
          appendContent={this.otherOffenseBranch()}
          onUpdate={this.updateList}
          scrollToBottom={this.props.scrollToBottom}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
          content={(
            <ul>
              <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
              <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
              <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
              <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
              <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
            </ul>
          )}
        >
          <OtherOffense
            name="Item"
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            bind
            defaultState={this.props.defaultState}
            onError={this.handleError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </BranchCollection>
      </div>
    )
  }
}

OtherOffenses.defaultProps = {
  onUpdate: () => {},
  onError: (value, arr) => arr,
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.police.additionaloffenses', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectLegalSection(OtherOffenses, sectionConfig)
