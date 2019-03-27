import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'
import validate, { CompetenceOrderValidator } from 'validators'

import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import Subsection from 'components/Section/shared/Subsection'

import { PSYCHOLOGICAL, PSYCHOLOGICAL_COMPETENCE } from 'config/formSections/psychological'
import connectPsychologicalSection from '../PsychologicalConnector'

import Order from '../Order'

const sectionConfig = {
  section: PSYCHOLOGICAL.name,
  store: PSYCHOLOGICAL.store,
  subsection: PSYCHOLOGICAL_COMPETENCE.name,
  storeKey: PSYCHOLOGICAL_COMPETENCE.storeKey,
}

export class Competence extends Subsection {
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
      IsIncompetent: this.props.IsIncompetent,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateIsIncompentent = (values) => {
    this.update({
      IsIncompetent: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const occurred = DateSummary(o.Occurred || {})
    const courtName = (o.CourtName || {}).value || ''

    return Summary({
      type: i18n.t('psychological.competence.collection.itemType'),
      index,
      left: courtName,
      right: occurred,
      placeholder: i18n.t(
        'psychological.competence.collection.summaryCourtName'
      ),
    })
  }

  render() {
    return (
      <div
        className="section-content competence"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('psychological.destination.competence')}</h1>
        <Branch
          name="is_incompetent"
          label={i18n.t('psychological.heading.competence')}
          labelSize="h4"
          {...this.props.IsIncompetent}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateIsIncompentent}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.IsIncompetent.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={CompetenceOrderValidator}
            description={i18n.t(
              'psychological.competence.collection.description'
            )}
            appendTitle={i18n.t(
              'psychological.competence.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'psychological.competence.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Order
              name="Item"
              prefix="competence"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
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

Competence.defaultProps = {
  IsIncompetent: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('psychological.competence', data)),
  scrollToBottom: '.bottom-btns',
}

export default connectPsychologicalSection(Competence, sectionConfig)
