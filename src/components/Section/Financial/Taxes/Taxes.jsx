import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary } from '../../../Summary'
import { TaxesValidator, TaxValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import TaxesItem from './TaxesItem'

export default class Taxes extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasTaxes: this.props.HasTaxes,
      List: this.props.List,
      ...queue
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (values) {
    this.update({
      HasTaxes: values,
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
                label={i18n.t('financial.taxes.title')}
                labelSize="h2"
                className="taxes-branch"
                {...this.props.HasTaxes}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={(this.props.HasTaxes || {}).value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
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
  HasTaxes: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'taxes',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('financial.taxes', props))
  },
  defaultState: true
}
