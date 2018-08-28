import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import {
  NonpaymentValidator,
  NonpaymentItemValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Summary, DateSummary } from '../../../Summary'
import { Branch, Show, Accordion } from '../../../Form'
import NonpaymentItem from './NonpaymentItem'

export default class Nonpayment extends SubsectionElement {
  constructor(props) {
    super(props)

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HasNonpayment: this.props.HasNonpayment,
      List: this.props.List,
      ...queue
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch(values) {
    this.update({
      HasNonpayment: values,
      List: values.value === 'Yes' ? this.props.List : {}
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList(values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary(row, index) {
    const obj = row.Item || {}
    const date = DateSummary(obj.Date)
    const name = (obj.Name || {}).value || ''
    const amount = (obj.Amount || {}).value
    const text = `${name}${amount ? ', $' + amount : ''}`.trim()

    return Summary({
      type: i18n.t('financial.nonpayment.collection.summary.item'),
      index: index,
      left: text,
      right: date,
      placeholder: i18n.t('financial.nonpayment.collection.summary.unknown')
    })
  }

  message() {
    return (
      <div>
        <ul>
          <li>{i18n.m('financial.nonpayment.para.repo')}</li>
          <li>{i18n.m('financial.nonpayment.para.defaulted')}</li>
          <li>{i18n.m('financial.nonpayment.para.collections')}</li>
          <li>{i18n.m('financial.nonpayment.para.cancelled')}</li>
          <li>{i18n.m('financial.nonpayment.para.evicted')}</li>
          <li>{i18n.m('financial.nonpayment.para.garnished')}</li>
          <li>{i18n.m('financial.nonpayment.para.delinquent')}</li>
          <li>{i18n.m('financial.nonpayment.para.any')}</li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div
        className="section-content nonpayment"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="has_nonpayment"
          label={i18n.t('financial.nonpayment.title')}
          labelSize="h2"
          className="nonpayment-branch"
          {...this.props.HasNonpayment}
          warning={true}
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}>
          <ul>
            <li>{i18n.m('financial.nonpayment.para.repo')}</li>
            <li>{i18n.m('financial.nonpayment.para.defaulted')}</li>
            <li>{i18n.m('financial.nonpayment.para.collections')}</li>
            <li>{i18n.m('financial.nonpayment.para.cancelled')}</li>
            <li>{i18n.m('financial.nonpayment.para.evicted')}</li>
            <li>{i18n.m('financial.nonpayment.para.garnished')}</li>
            <li>{i18n.m('financial.nonpayment.para.delinquent')}</li>
            <li>{i18n.m('financial.nonpayment.para.any')}</li>
          </ul>
        </Branch>
        <Show when={(this.props.HasNonpayment || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t(
              'financial.nonpayment.collection.summary.title'
            )}
            appendTitle={i18n.t('financial.nonpayment.collection.appendTitle')}
            required={this.props.required}
            validator={NonpaymentItemValidator}
            scrollIntoView={this.props.scrollIntoView}
            appendMessage={this.message()}
            appendLabel={i18n.t('financial.nonpayment.collection.append')}>
            <NonpaymentItem
              name="Item"
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

Nonpayment.defaultProps = {
  HasNonpayment: {},
  List: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'financial',
  subsection: 'nonpayment',
  dispatch: () => {},
  validator: data => {
    return validate(schema('financial.nonpayment', data))
  }
}
