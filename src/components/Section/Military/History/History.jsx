import React from 'react'
import { MILITARY, MILITARY_HISTORY } from 'config/formSections/military'
import { i18n } from 'config'
import schema from 'schema'
import validate, { MilitaryServiceValidator } from 'validators'
import Subsection from 'components/Section/shared/Subsection'
import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import MilitaryService from 'components/Section/Military/History/MilitaryService'
import connectMilitarySection from 'components/Section/Military/MilitaryConnector'

const sectionConfig = {
  section: MILITARY.name,
  store: MILITARY.store,
  subsection: MILITARY_HISTORY.name,
  storeKey: MILITARY_HISTORY.storeKey,
}

export const serviceNameDisplay = (service) => {
  let display = (service || {}).value

  switch (display) {
    case 'Army':
      display = 'Army'
      break
    case 'AirForce':
      display = 'Air Force'
      break
    case 'AirNationalGuard':
      display = 'Air National Guard'
      break
    case 'ArmyNationalGuard':
      display = 'Army National Guard'
      break
    case 'CoastGuard':
      display = 'Coast Guard'
      break
    case 'MarineCorps':
      display = 'Marine Corps'
      break
    default:
      display = 'Unknown'
  }

  return display
}

class History extends Subsection {
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
      HasServed: this.props.HasServed,
      List: this.props.List,
      ...queue,
    })
  }

  updateServed = (values) => {
    // If there is no history clear out any previously entered data
    this.update({
      HasServed: values,
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
    const dates = DateSummary(o.Dates)
    const service = serviceNameDisplay(o.Service)

    return Summary({
      type: i18n.t('military.history.collection.summary.item'),
      index,
      left: service,
      right: dates,
      placeholder: i18n.t('military.history.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content military-history"
        data-section={MILITARY.key}
        data-subsection={MILITARY_HISTORY.key}
      >
        <h1 className="section-header">{i18n.t('military.destination.history')}</h1>
        <Branch
          name="has_served"
          label={i18n.t('military.history.heading.served')}
          labelSize="h4"
          className="served"
          {...this.props.HasServed}
          help="military.history.help.served"
          warning
          onUpdate={this.updateServed}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasServed.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('military.history.collection.summary.title')}
            appendTitle={i18n.t('military.history.collection.appendTitle')}
            appendLabel={i18n.t('military.history.collection.append')}
            validator={MilitaryServiceValidator}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <MilitaryService
              name="Item"
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

History.defaultProps = {
  List: { items: [] },
  HasServed: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'military',
  subsection: 'history',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('military.history', data)),
  defaultState: true,
  required: false,
}

export default connectMilitarySection(History, sectionConfig)
