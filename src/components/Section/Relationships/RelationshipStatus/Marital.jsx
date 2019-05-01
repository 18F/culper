import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'
import validate, { DivorceValidator } from 'validators'

import { RELATIONSHIPS, RELATIONSHIPS_STATUS_MARITAL } from 'config/formSections/relationships'

import Subsection from 'components/Section/shared/Subsection'
import { Summary, NameSummary, DateSummary } from 'components/Summary'
import {
  Field, Show, RadioGroup, Radio, Accordion,
} from 'components/Form'

import connectRelationshipsSection from '../RelationshipsConnector'

import CivilUnion from './CivilUnion'
import Divorce from './Divorce'

const sectionConfig = {
  section: RELATIONSHIPS.name,
  store: RELATIONSHIPS.store,
  subsection: RELATIONSHIPS_STATUS_MARITAL.name,
  storeKey: RELATIONSHIPS_STATUS_MARITAL.storeKey,
}

export class Marital extends Subsection {
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
      Status: this.props.Status,
      CivilUnion: this.props.CivilUnion,
      DivorcedList: this.props.DivorcedList,
      ...queue,
    })
  }

  updateStatus = (values) => {
    this.update({
      Status: values,
    })
  }

  updateCivilUnion = (values) => {
    this.update({
      CivilUnion: values,
    })
  }

  updateDivorcedList = (values) => {
    this.update({
      DivorcedList: values,
    })
  }

  /**
   * Listens for updates when a spouses name is updated. This is to notify
   * other parts of the app that this information has changed
   */
  updateSpouse = () => {
    this.props.onUpdate('ClearSameSpouseConfirmed', true)
  }

  divorceSummary = (item, index) => {
    const o = (item || {}).Item || {}
    const date = DateSummary(o.DateDivorced)
    const name = NameSummary(o.Name)
    return Summary({
      type: i18n.t('relationships.civilUnion.divorce.collection.itemType'),
      index,
      left: name,
      right: date,
      placeholder: i18n.t('relationships.relatives.collection.summary.unknown'),
    })
  }

  showDivorce = () => {
    const status = (this.props.Status || {}).value
    const divorced = ((this.props.CivilUnion || {}).Divorced || {}).value

    if (['Married', 'Separated'].includes(status)) {
      return divorced === 'Yes'
    }

    if (['Annulled', 'Divorced', 'Widowed'].includes(status)) {
      return true
    }

    return false
  }

  render() {
    return (
      <div
        className="section-content marital"
        data-section={RELATIONSHIPS.key}
        data-subsection={RELATIONSHIPS_STATUS_MARITAL.key}
      >
        <h1 className="section-header">{i18n.t('relationships.marital.sectionTitle.title')}</h1>

        <Field
          title={i18n.t('relationships.marital.heading.title')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <RadioGroup
            name="status"
            className="status-options option-list option-list-vertical"
            selectedValue={this.props.Status.value}
            required={this.props.required}
            onError={this.handleError}
          >
            <Radio
              label={i18n.m('relationships.marital.label.status.never')}
              className="status-never"
              value="NeverMarried"
              onUpdate={this.updateStatus}
              onError={this.handleError}
            />
            <Radio
              label={i18n.m('relationships.marital.label.status.married')}
              className="status-married"
              value="Married"
              onUpdate={this.updateStatus}
              onError={this.handleError}
            />
            <Radio
              label={i18n.m('relationships.marital.label.status.separated')}
              className="status-separated"
              value="Separated"
              onUpdate={this.updateStatus}
              onError={this.handleError}
            />
            <Radio
              label={i18n.m('relationships.marital.label.status.annulled')}
              className="status-annulled"
              value="Annulled"
              onUpdate={this.updateStatus}
              onError={this.handleError}
            />
            <Radio
              label={i18n.m('relationships.marital.label.status.divorced')}
              className="status-divorced"
              value="Divorced"
              onUpdate={this.updateStatus}
              onError={this.handleError}
            />
            <Radio
              label={i18n.m('relationships.marital.label.status.widowed')}
              className="status-widowed"
              value="Widowed"
              onUpdate={this.updateStatus}
              onError={this.handleError}
            />
          </RadioGroup>
        </Field>

        <Show when={['Married', 'Separated'].includes(this.props.Status.value)}>
          <CivilUnion
            name="civilUnion"
            {...this.props.CivilUnion}
            onUpdate={this.updateCivilUnion}
            applicantBirthdate={this.props.applicantBirthdate}
            onError={this.handleError}
            onSpouseUpdate={this.updateSpouse}
            addressBooks={this.props.addressBooks}
            currentAddress={this.props.currentAddress}
            dispatch={this.props.dispatch}
            defaultState={this.props.defaultState}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Show>
        <Show when={this.showDivorce()}>
          <p>{i18n.t('relationships.civilUnion.divorce.para.intro')}</p>
          <Accordion
            scrollTo="scrollToDivorce"
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            {...this.props.DivorcedList}
            onUpdate={this.updateDivorcedList}
            onError={this.handleError}
            required={this.props.required}
            validator={DivorceValidator}
            scrollIntoView={this.props.scrollIntoView}
            summary={this.divorceSummary}
            description={i18n.t('relationships.civilUnion.divorce.collection.description')}
            appendTitle={i18n.t('relationships.civilUnion.divorce.collection.appendTitle')}
            appendLabel={i18n.t('relationships.civilUnion.divorce.collection.appendLabel')}
          >
            <Divorce
              name="Item"
              bind
              applicantBirthdate={this.props.applicantBirthdate}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Marital.defaultProps = {
  Status: {},
  CivilUnion: {},
  DivorcedList: Accordion.defaultList,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('relationships.status.marital', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
  scrollIntoView: false,
}

export default connectRelationshipsSection(Marital, sectionConfig)
