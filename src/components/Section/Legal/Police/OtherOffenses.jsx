import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { OtherOffenseValidator } from 'validators'
import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  LEGAL,
  LEGAL_POLICE_ADDITIONAL_OFFENSES,
} from 'config/formSections/legal'
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

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      HasOtherOffenses: this.props.HasOtherOffenses,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasOtherOffenses = (values) => {
    this.update({
      HasOtherOffenses: values,
      List: values.value === 'Yes' ? this.props.List : [],
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
    } = this.props

    return (
      <div
        className="section-content police-other-offenses"
        data-section={LEGAL.key}
        data-subsection={LEGAL_POLICE_ADDITIONAL_OFFENSES.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.police.additionalOffenses')}</h1>
        <Branch
          name="has_otheroffenses"
          label={i18n.t('legal.police.para.otherOffense.intro')}
          labelSize="h4"
          className="has-otheroffenses"
          {...this.props.HasOtherOffenses}
          warning
          onUpdate={this.updateHasOtherOffenses}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          <ul>
            <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
          </ul>
        </Branch>

        <Show when={this.props.HasOtherOffenses.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={OtherOffenseValidator}
            summary={this.summary}
            description={i18n.t('legal.police.collection.summary.title')}
            appendTitle={i18n.t('legal.police.collection.appendTitle')}
            appendMessage={this.otherOffenseBranch()}
            appendLabel={i18n.t('legal.police.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <OtherOffense
              name="Item"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              bind
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              requireLegalPoliceFirearms={requireLegalPoliceFirearms}
              requireLegalPoliceDrugs={requireLegalPoliceDrugs}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OtherOffenses.defaultProps = {
  List: Accordion.defaultList,
  HasOtherOffenses: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'police/additionaloffenses',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.police.additionaloffenses', data)),
  defaultState: true,
  scrollToBottom: '',
  requireLegalPoliceFirearms: true,
  requireLegalPoliceDrugs: true,
}

export default connectLegalSection(OtherOffenses, sectionConfig)
