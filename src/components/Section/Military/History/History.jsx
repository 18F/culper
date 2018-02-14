import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { MilitaryHistoryValidator, MilitaryServiceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import MilitaryService from './MilitaryService'

export const serviceNameDisplay = (service) => {
  let display = (service || {}).value

  switch (display) {
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
  }

  return display
}

export default class History extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateServed = this.updateServed.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasServed: this.props.HasServed,
      List: this.props.List,
      ...queue
    })
  }

  updateServed (values) {
    // If there is no history clear out any previously entered data
    this.update({
      HasServed: values
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Dates)
    const service = serviceNameDisplay(o.Service)

    return Summary({
      type: i18n.t('military.history.collection.summary.item'),
      index: index,
      left: service,
      right: dates,
      placeholder: i18n.m('military.history.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="military-history">
        <Branch name="has_served"
                label={i18n.t('military.history.heading.served')}
                labelSize="h2"
                className="served"
                {...this.props.HasServed}
                help="military.history.help.served"
                warning={true}
                onUpdate={this.updateServed}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasServed.value === 'Yes'}>
          <Accordion {...this.props.List}
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
                     scrollIntoView={this.props.scrollIntoView}>
            <MilitaryService name="Item"
                             bind={true}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'history',
  addressBooks: {},
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('military.history', data))
  },
  defaultState: true,
  required: false
}
