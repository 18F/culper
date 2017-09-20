import React from 'react'
import { i18n } from '../../../../config'
import schematize from '../../../../schema'
import validate from '../../../../validators'
import { NonpaymentValidator, NonpaymentItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Summary, DateSummary } from '../../../Summary'
import { Branch, Show, Accordion } from '../../../Form'
import NonpaymentItem from './NonpaymentItem'

export default class Nonpayment extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasNonpayment: props.HasNonpayment,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasNonpayment: val }, () => {
      this.updateList({
        items: val === 'Yes' ? this.state.List : [],
        branch: ''
      })
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList (values) {
    this.setState({ List: values.items, ListBranch: values.branch }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          ListBranch: this.state.ListBranch,
          HasNonpayment: this.state.HasNonpayment
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (row, index) {
    const obj = (row.Item || {})
    const date = DateSummary(obj.Date)
    const name = (obj.Name || {}).value || ''
    const amount = (obj.Amount || {}).value
    const text = `${name}${amount ? ', $' + amount : ''}`.trim()

    return Summary({
      type: i18n.t('financial.nonpayment.collection.summary.item'),
      index: index,
      left: text,
      right: date,
      placeholder: i18n.m('financial.nonpayment.collection.summary.unknown')
    })
  }

  message () {
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

  render () {
    return (
      <div className="nonpayment">
        <Branch name="has_nonpayment"
                label={i18n.t('financial.nonpayment.title')}
                labelSize="h2"
                className="nonpayment-branch"
                value={this.state.HasNonpayment}
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
        <Show when={this.state.HasNonpayment === 'Yes'}>
          <Accordion items={this.state.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.nonpayment.collection.summary.title')}
                     appendTitle={i18n.t('financial.nonpayment.collection.appendTitle')}
                     required={this.props.required}
                     validator={NonpaymentItemValidator}
                     scrollIntoView={this.props.scrollIntoView}
                     appendMessage={this.message()}
                     appendLabel={i18n.t('financial.nonpayment.collection.append')}>
            <NonpaymentItem name="Item"
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
  HasNonpayment: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'nonpayment',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schematize('financial.nonpayment', props))
  }
}
