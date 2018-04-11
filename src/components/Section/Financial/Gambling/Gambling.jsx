import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { GamblingValidator, GamblingItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import GamblingItem from './GamblingItem'

export default class Gambling extends SubsectionElement {
  constructor (props) {
    super(props)

    this.myDispatch = this.myDispatch.bind(this)
    this.summary = this.summary.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasGamblingDebt: this.props.HasGamblingDebt,
      List: this.props.List,
      ...queue
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  onUpdate (values) {
    this.update({
      HasGamblingDebt: values,
      List: values.value === 'Yes' ? this.props.List : {}
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  myDispatch (values) {
    this.update({
      List: values
    })
  }

  /**
   * Takes a value such as "1000" and converts it to "1,000".
   */
  fancyNumber (value) {
    const n = new window.Number(value)
    return n.toLocaleString()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (row, index) {
    const item = row.Item || {}
    const dates = DateSummary(item.Dates)
    const losses = item.Losses && item.Losses.value
          ? `$${this.fancyNumber(item.Losses.value)}`
          : ''

    return Summary({
      type: i18n.t('financial.gambling.collection.summary.debt'),
      index: index,
      left: losses,
      right: dates,
      placeholder: i18n.m('financial.gambling.collection.summary.unknownlosses')
    })
  }

  render () {
    return (
      <div className="section-content gambling" {...super.dataAttributes(this.props)}>
        <Branch name="has_gamblingdebt"
                label={i18n.t('financial.gambling.title')}
                labelSize="h2"
                className="has-gambling-debt"
                {...this.props.HasGamblingDebt}
                warning={true}
                onUpdate={this.onUpdate.bind(this)}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={(this.props.HasGamblingDebt || {}).value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.myDispatch}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.gambling.collection.summary.title')}
                     required={this.props.required}
                     validator={GamblingItemValidator}
                     scrollIntoView={this.props.scrollIntoView}
                     appendLabel={i18n.t('financial.gambling.collection.append')}
                     appendTitle={i18n.t('financial.gambling.collection.appendTitle')}>
            <GamblingItem name="Item"
                          required={this.props.required}
                          scrollIntoView={this.props.scrollIntoView}
                          bind={true}
                          />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Gambling.defaultProps = {
  List: {},
  HasGamblingDebt: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'gambling',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('financial.gambling', data))
  },
  defaultState: true
}
