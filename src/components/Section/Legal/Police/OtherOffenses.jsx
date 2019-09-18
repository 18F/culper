import React from 'react'

import i18n from 'util/i18n'
import { BranchCollection } from 'components/Form'
import {
  LEGAL,
  LEGAL_POLICE_ADDITIONAL_OFFENSES,
} from 'config/formSections/legal'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'

import OtherOffense from './OtherOffense'

const sectionConfig = {
  key: LEGAL_POLICE_ADDITIONAL_OFFENSES.key,
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
    const {
      requireLegalPoliceFirearms,
      requireLegalPoliceDrugs,
      // errors,
    } = this.props

    // TODO
    // const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content police-other-offenses"
        data-section={LEGAL.key}
        data-subsection={LEGAL_POLICE_ADDITIONAL_OFFENSES.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.police.additionalOffenses')}</h1>
        <BranchCollection
          {...this.props.List}
          name="has_otheroffenses"
          label={i18n.t('legal.police.para.otherOffense.intro')}
          className="has-otheroffenses"
          warning={true}
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
            bind={true}
            defaultState={this.props.defaultState}
            onError={this.handleError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            requireLegalPoliceFirearms={requireLegalPoliceFirearms}
            requireLegalPoliceDrugs={requireLegalPoliceDrugs}
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
  defaultState: true,
  scrollToBottom: '',
  requireLegalPoliceFirearms: true,
  requireLegalPoliceDrugs: true,
  errors: [],
}

export default connectSubsection(OtherOffenses, sectionConfig)
