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
  constructor (props) {
    super(props)

    this.state = {
      HasCreditCounseling: props.HasCreditCounseling,
      List: props.List,
      ListBranch: props.ListBranch,
      errorCodes: []
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasCreditCounseling: val }, () => {
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
          HasCreditCounseling: this.state.HasCreditCounseling
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item.Item || {})
    const name = (obj.Name || {}).value || ''

    return Summary({
      type: i18n.t('financial.credit.collection.summary.item'),
      index: index,
      left: name,
      right: null,
      placeholder: i18n.m('financial.credit.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="credit-counseling">
        <Branch name="has_credit"
                label={i18n.t('financial.credit.title')}
                labelSize="h2"
                className="credit-branch"
                value={this.state.HasCreditCounseling}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasCreditCounseling === 'Yes'}>
          <Accordion items={this.state.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.credit.collection.summary.title')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     validator={CreditItemValidator}
                     appendTitle={i18n.t('financial.credit.collection.appendTitle')}
                     appendLabel={i18n.t('financial.credit.collection.append')}>
                     <CreditItem name="Item"
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
  HasCreditCounseling: '',
  List: [],
  ListBranch: '',
  addressBooks: {},
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'credit',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('financial.credit', props))
  },
  defaultState: true
}
