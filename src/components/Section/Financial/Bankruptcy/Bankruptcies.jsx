import React from 'react'
import { i18n } from '../../../../config'
import { BankruptcyValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import Bankruptcy from './Bankruptcy'
import { Summary, AddressSummary, DateSummary } from '../../../Summary'

export default class Bankruptcies extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateList = this.updateList.bind(this)
    this.updateHasBankrupty = this.updateHasBankrupty.bind(this)
    this.summary = this.summary.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasBankruptcy: this.props.HasBankruptcy,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasBankrupty (values) {
    this.update({
      HasBankruptcy: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const b = item.Bankruptcy || {}
    const from = DateSummary(b.DateFiled)
    const address = AddressSummary(b.CourtAddress)

    return Summary({
      type: i18n.t('financial.bankruptcy.collection.summary.item'),
      index: index,
      left: address,
      right: from,
      placeholder: i18n.m('financial.bankruptcy.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="bankruptcies">
        <Branch name="has_bankruptcydebt"
                className="bankruptcy-branch"
                value={this.props.HasBankruptcy}
                help="financial.bankruptcy.help"
                warning={true}
                onUpdate={this.updateHasBankrupty}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.props.HasBankruptcy === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     summary={this.summary}
                     description={i18n.t('financial.bankruptcy.collection.summary.title')}
                     appendTitle={i18n.t('financial.bankruptcy.collection.summary.appendTitle')}
                     appendLabel={i18n.t('financial.bankruptcy.collection.append')}>
            <Bankruptcy name="Bankruptcy"
                        dispatch={this.props.dispatch}
                        addressBooks={this.props.addressBooks}
                        required={this.props.required}
                        scrollIntoView={this.props.scrollIntoView}
                        bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Bankruptcies.defaultProps = {
  List: [],
  ListBranch: '',
  HasBankruptcy: '',
  addressBooks: {},
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'bankruptcy',
  dispatch: () => {},
  validator: (state, props) => {
    return new BankruptcyValidator(state, props).isValid()
  },
  defaultState: true
}
