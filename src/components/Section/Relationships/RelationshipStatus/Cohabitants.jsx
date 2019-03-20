import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'
import validate, { CohabitantValidator } from 'validators'

import { RELATIONSHIPS, RELATIONSHIPS_STATUS_COHABITANTS } from 'config/formSections/relationships'

import Subsection from 'components/Section/shared/Subsection'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, NameSummary, DateSummary } from 'components/Summary'

import connectRelationshipsSection from '../RelationshipsConnector'

import Cohabitant from './Cohabitant'

const sectionConfig = {
  section: RELATIONSHIPS.name,
  store: RELATIONSHIPS.store,
  subsection: RELATIONSHIPS_STATUS_COHABITANTS.name,
  storeKey: RELATIONSHIPS_STATUS_COHABITANTS.storeKey,
}

export class Cohabitants extends Subsection {
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
      HasCohabitant: this.props.HasCohabitant,
      CohabitantList: this.props.CohabitantList,
      ...queue,
    })
  }

  updateHasCohabitant = (values) => {
    this.update({
      HasCohabitant: values,
      CohabitantList: values.value === 'Yes' ? this.props.CohabitantsList : {},
    })
  }

  updateCohabitantList = (values) => {
    this.update({
      CohabitantList: values,
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const name = NameSummary(o.Name)
    const dates = DateSummary(o.CohabitationBegan)

    return Summary({
      type: i18n.t('relationships.cohabitant.collection.itemType'),
      index,
      left: name,
      right: dates,
      placeholder: i18n.t(
        'identification.othernames.collection.summary.unknown'
      ),
    })
  }

  render() {
    return (
      <div
        className="section-content cohabitants"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('relationships.cohabitant.sectionTitle.title')}</h1>

        <Branch
          name="hasCohabitant"
          label={i18n.t('relationships.cohabitant.heading.hasCohabitant')}
          labelSize="h4"
          className="has-cohabitant"
          {...this.props.HasCohabitant}
          warning
          help="relationships.cohabitant.help.hasCohabitant"
          onUpdate={this.updateHasCohabitant}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />

        <Show when={this.props.HasCohabitant.value === 'Yes'}>
          <Accordion
            {...this.props.CohabitantList}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateCohabitantList}
            onError={this.handleError}
            validator={CohabitantValidator}
            required={this.props.required}
            description={i18n.t(
              'relationships.cohabitant.collection.description'
            )}
            appendTitle={i18n.t(
              'relationships.cohabitant.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'relationships.cohabitant.collection.appendLabel'
            )}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Cohabitant
              name="Item"
              spouse={this.props.spouse}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              bind
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Cohabitants.defaultProps = {
  HasCohabitant: {},
  CohabitantList: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('relationships.status.cohabitant', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
  scrollIntoView: false,
}

export default connectRelationshipsSection(Cohabitants, sectionConfig)
