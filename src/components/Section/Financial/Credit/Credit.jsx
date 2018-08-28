import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary } from '../../../Summary'
import { CreditValidator, CreditItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import CreditItem from './CreditItem'

export default class Credit extends SubsectionElement {
  constructor(props) {
    super(props)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HasCreditCounseling: this.props.HasCreditCounseling,
      List: this.props.List,
      ...queue
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch(values) {
    this.update({
      HasCreditCounseling: values,
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
  summary(item, index) {
    const obj = item.Item || {}
    const name = (obj.Name || {}).value || ''

    return Summary({
      type: i18n.t('financial.credit.collection.summary.item'),
      index: index,
      left: name,
      right: null,
      placeholder: i18n.t('financial.credit.collection.summary.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content credit-counseling"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="has_credit"
          label={i18n.t('financial.credit.title')}
          labelSize="h2"
          className="credit-branch"
          {...this.props.HasCreditCounseling}
          warning={true}
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />
        <Show when={(this.props.HasCreditCounseling || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('financial.credit.collection.summary.title')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            validator={CreditItemValidator}
            appendTitle={i18n.t('financial.credit.collection.appendTitle')}
            appendLabel={i18n.t('financial.credit.collection.append')}>
            <CreditItem
              name="Item"
              bind={true}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Credit.defaultProps = {
  HasCreditCounseling: {},
  List: {},
  addressBooks: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'financial',
  subsection: 'credit',
  dispatch: () => {},
  validator: data => {
    return validate(schema('financial.credit', data))
  },
  defaultState: true
}
