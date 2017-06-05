import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryHistoryValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import MilitaryService from './MilitaryService'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class History extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasServed: props.HasServed,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateServed = this.updateServed.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateServed (value, event) {
    this.onUpdate('HasServed', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('List', [])
      this.onUpdate('ListBranch', '')
    }
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const service = o.Service || i18n.t('military.history.collection.summary.unknown')
    const dates = DateSummary(o.Dates)

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
                value={this.state.HasServed}
                help="military.history.help.served"
                onUpdate={this.updateServed}
                onError={this.handleError}>
        </Branch>

        <Show when={this.state.HasServed === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
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
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'history',
  dispatch: () => {},
  validator: (state, props) => {
    return new MilitaryHistoryValidator(state, props).isValid()
  },
  defaultState: true
}
