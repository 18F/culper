import React from 'react'
import { i18n } from '../../../../config'
import { BankruptcyValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion } from '../../../Form'
import Bankruptcy from './Bankruptcy'
import { AddressSummary, DateSummary } from '../../../Summary'

export default class Bankruptcies extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      errorCodes: []
    }

    this.updateList = this.updateList.bind(this)
    this.updateHasBankrupty = this.updateHasBankrupty.bind(this)
    this.summary = this.summary.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasBankruptcy: this.props.HasBankruptcy,
        [field]: values
      })
    }
  }

  updateList (values) {
    this.update('List', values.items)
    this.update('ListBranch', values.branch)
  }

  updateHasBankrupty (values) {
    this.update('HasBankruptcy', values)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, s, e)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new BankruptcyValidator(this.props, null).isValid()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const b = item.Bankruptcy || {}
    const address = AddressSummary(b.CourtAddress, i18n.t('financial.bankruptcy.collection.summary.unknown'))
    const from = DateSummary(b.DateFiled, i18n.t('financial.bankruptcy.collection.summary.nodates'))

    return (
      <span>
        <span className="index">{i18n.t('financial.bankruptcy.collection.summary.item')} {index + 1}:</span>
        <span><strong>{address}</strong></span>
        <span className="dates"><strong>{from}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="bankruptcies">
        <Branch name="has_bankruptcydebt"
          className="bankruptcy-branch"
          value={this.props.HasBankruptcy}
          help="financial.bankruptcy.help"
          onUpdate={this.updateHasBankrupty}>
        </Branch>
        <Show when={this.props.HasBankruptcy === 'Yes'}>
          <Accordion minimum="1"
            items={this.props.List}
            branch={this.props.ListBranch}
            onUpdate={this.updateList}
            onValidate={this.handleValidation}
            summary={this.summary}
            description={i18n.t('financial.bankruptcy.collection.summary.title')}
            appendTitle={i18n.t('financial.bankruptcy.collection.summary.appendTitle')}
            appendMessage={i18n.m('financial.bankruptcy.collection.summary.appendMessage')}
            appendLabel={i18n.t('financial.bankruptcy.collection.append')}>
            <Bankruptcy name="Bankruptcy"
              bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}
