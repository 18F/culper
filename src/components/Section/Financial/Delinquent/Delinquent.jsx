import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { DelinquentValidator, DelinquentItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import DelinquentItem from './DelinquentItem'

export default class Delinquent extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasDelinquent: this.props.HasDelinquent,
      List: this.props.List,
      ...queue
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (values) {
    this.update({
      HasDelinquent: values,
      List: values.value === 'Yes' ? this.props.List : {}
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList (values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item.Item || {})
    const date = (obj.Date || {})
    const from = DateSummary({date: date})
    const name = (obj.Name || {}).value || ''
    const amount = (obj.Amount || {}).value || ''
    const text = `${name}${amount ? ', $' + amount : ''}`.trim()

    return Summary({
      type: i18n.t('financial.delinquent.collection.summary.item'),
      index: index,
      left: text,
      right: from,
      placeholder: i18n.m('financial.delinquent.collection.summary.unknown')
    })
  }

  message () {
    return (
      <div>
        <ul>
          <li>{i18n.m('financial.delinquent.para.alimony')}</li>
          <li>{i18n.m('financial.delinquent.para.judgement')}</li>
          <li>{i18n.m('financial.delinquent.para.lien')}</li>
          <li>{i18n.m('financial.delinquent.para.federal')}</li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div className="delinquent">
        <Branch name="has_delinquent"
                label={i18n.t('financial.delinquent.title')}
                labelSize="h2"
                className="delinquent-branch eapp-field-wrap"
                {...this.props.HasDelinquent}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
          {i18n.m('financial.delinquent.para.details')}
          <ul>
            <li>{i18n.m('financial.delinquent.para.alimony')}</li>
            <li>{i18n.m('financial.delinquent.para.judgement')}</li>
            <li>{i18n.m('financial.delinquent.para.lien')}</li>
            <li>{i18n.m('financial.delinquent.para.federal')}</li>
          </ul>
        </Branch>
        <Show when={(this.props.HasDelinquent || {}).value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.delinquent.collection.summary.title')}
                     appendTitle={i18n.t('financial.delinquent.collection.appendTitle')}
                     appendMessage={this.message()}
                     validator={DelinquentItemValidator}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     appendLabel={i18n.t('financial.delinquent.collection.append')}>
            <DelinquentItem name="Item"
                            bind={true}
                            dispatch={this.props.dispatch}
                            addressBooks={this.props.addressBooks}
                            required={this.props.required}
                            scrollIntoView={this.props.scrollIntoView}
                            />

          </Accordion>
        </Show>
      </div>
    )
  }
}

Delinquent.defaultProps = {
  HasDelinquent: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'delinquent',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('financial.delinquent', data))
  },
  defaultState: true
}
