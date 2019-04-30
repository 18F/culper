import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ForeignDirectInterestValidator } from 'validators'
import { Summary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import { FOREIGN, FOREIGN_ACTIVITIES_DIRECT } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../../ForeignConnector'
import DirectInterest from './DirectInterest'

const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_ACTIVITIES_DIRECT.name,
  storeKey: FOREIGN_ACTIVITIES_DIRECT.storeKey,
}
export class DirectActivity extends Subsection {
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
      HasInterests: this.props.HasInterests,
      List: this.props.List,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasInterests = (values) => {
    this.update({
      HasInterests: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const who = ((o.InterestTypes || {}).values || []).join(', ')
    const interestType = (o.InterestType || {}).value
      ? o.InterestType.value
      : ''
    const cost = (o.Cost || {}).value ? `$${o.Cost.value}` : ''
    const summary = [who, interestType].reduce((prev, next) => {
      if (prev && next) {
        return `${prev} - ${next}`
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.direct.collection.itemType'),
      index,
      left: summary,
      right: cost,
      placeholder: i18n.t('foreign.activities.direct.collection.summary'),
    })
  }

  render() {
    return (
      <div
        className="section-content direct"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_ACTIVITIES_DIRECT.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.activities.direct')}</h1>
        <Branch
          name="has_interests"
          label={i18n.t('foreign.activities.direct.heading.title')}
          labelSize="h4"
          {...this.props.HasInterests}
          help="foreign.activities.direct.help.directControl"
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHasInterests}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.activities.direct.para.intro')}
        </Branch>

        <Show when={this.props.HasInterests.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ForeignDirectInterestValidator}
            description={i18n.t('foreign.activities.direct.collection.description')}
            appendTitle={i18n.t('foreign.activities.direct.collection.appendTitle')}
            appendLabel={i18n.t('foreign.activities.direct.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DirectInterest
              name="Item"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              bind
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DirectActivity.defaultProps = {
  name: 'direct',
  HasInterests: {},
  List: {},
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'activities/direct',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('foreign.activities.direct', data)),
}

export default connectForeignSection(DirectActivity, sectionConfig)
