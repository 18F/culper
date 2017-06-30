import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryHistoryValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import MilitaryService from './MilitaryService'

export const serviceNameDisplay = (service) => {
  switch (service) {
    case 'AirForce':
      service = 'Air Force'
      break
    case 'AirNationalGuard':
      service = 'Air National Guard'
      break
    case 'ArmyNationalGuard':
      service = 'Army National Guard'
      break
    case 'CoastGuard':
      service = 'Coast Guard'
      break
    case 'MarineCorps':
      service = 'Marine Corps'
      break
  }

  return service
}

export default class History extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateServed = this.updateServed.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasServed: this.props.HasServed,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateServed (value, event) {
    // If there is no history clear out any previously entered data
    this.update({
      HasServed: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Dates)
    const service = serviceNameDisplay(o.Service || i18n.t('military.history.collection.summary.unknown'))

    return (
      <span>
        <span className="index">{i18n.t('military.history.collection.summary.item')} {index + 1}:</span>
        <span><strong>{service}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="history">
        <Branch name="has_served"
                className="served"
                value={this.props.HasServed}
                help="military.history.help.served"
                warning={true}
                onUpdate={this.updateServed}
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.HasServed === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('military.history.collection.summary.title')}
                     appendTitle={i18n.t('military.history.collection.appendTitle')}
                     appendLabel={i18n.t('military.history.collection.append')}>
            <MilitaryService name="Item"
                             bind={true}
                             />
          </Accordion>
        </Show>
      </div>
    )
  }
}

History.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'history',
  dispatch: () => {},
  validator: (state, props) => {
    return new MilitaryHistoryValidator(props, props).isValid()
  },
  defaultState: true
}
