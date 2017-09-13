import React from 'react'
import { i18n } from '../../../../config'
import { Summary } from '../../../Summary'
import { TaxesValidator, TaxValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import TaxesItem from './TaxesItem'

export default class Taxes extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasTaxes: props.HasTaxes,
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
    this.setState({ HasTaxes: val }, () => {
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
          HasTaxes: this.state.HasTaxes
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item.Item || {})
    const year = (obj.Year || {}).value || ''
    const agency = (obj.Agency || {}).value || ''

    return Summary({
      type: i18n.t('financial.taxes.collection.summary.item'),
      index: index,
      left: agency,
      right: year,
      placeholder: i18n.m('financial.taxes.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="taxes">
        <Branch name="has_taxes"
                className="taxes-branch"
                value={this.state.HasTaxes}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasTaxes === 'Yes'}>
          <Accordion items={this.state.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     validator={TaxValidator}
                     description={i18n.t('financial.taxes.collection.summary.title')}
                     appendTitle={i18n.t('financial.taxes.collection.appendTitle')}
                     appendLabel={i18n.t('financial.taxes.collection.append')}>
                     <TaxesItem name="Item"
                       bind={true}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}
                       required={this.props.required}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Taxes.defaultProps = {
  HasTaxes: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'taxes',
  dispatch: () => {},
  validator: (state, props) => {
    return new TaxesValidator(state).isValid()
  },
  defaultState: true
}
