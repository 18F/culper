import React from 'react'
import { i18n } from '../../../../config'
import { TaxesValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, DateControl, Number, Field,
         Checkbox, Text, Textarea } from '../../../Form'
import FailureType from './FailureType'

export default class Taxes extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasTaxes: props.HasTaxes,
      List: props.List,
      errorCodes: []
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new TaxesValidator(this.state, null).isValid()
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasTaxes: val }, () => {
      this.updateList(val === 'No' ? [] : this.state.List)
      this.handleValidation(event, null, null)
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasTaxes: this.state.HasTaxes
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item || {})
    const agency = (obj.Agency || {}).value || i18n.t('financial.taxes.collection.summary.unknown')
    const year = (obj.Year || {}).value || ''

    return (
      <span>
        <span className="index">{i18n.t('financial.taxes.collection.summary.item')} {index + 1}:</span>
        <span><strong>{agency}</strong></span>
        <span className="dates">{year}</span>
      </span>
    )
  }

  render () {
    return (
      <div className="taxes">
        <Branch name="has_taxes"
                className="taxes-branch"
                value={this.state.HasTaxes}
                help="financial.taxes.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasTaxes === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('financial.taxes.collection.summary.title')}
                     appendTitle={i18n.t('financial.taxes.collection.appendTitle')}
                     appendMessage={i18n.m('financial.taxes.collection.appendMessage')}
                     appendLabel={i18n.t('financial.taxes.collection.append')}>

            <Field title={i18n.t('financial.taxes.heading.failure')}
                   help="financial.taxes.help.failure"
                   adjustFor="buttons"
                   shrink={true}>
              <FailureType name="Failure"
                           className="taxes-failure"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.taxes.heading.year')}
                   help="financial.taxes.help.year">
              <Number name="Year"
                      className="taxes-year"
                      placeholder={i18n.t('financial.taxes.placeholder.year')}
                      min="1000"
                      bind={true}
                      />
              <div className="taxes-year coupled-flags">
                <Checkbox name="YearEstimated"
                          ref="estimated"
                          label={i18n.t('financial.taxes.label.estimated')}
                          toggle="false"
                          bind={true}
                          />
              </div>
            </Field>

            <Field title={i18n.t('financial.taxes.heading.reason')}
                   help="financial.taxes.help.reason">
              <Textarea name="Reason"
                        className="taxes-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.taxes.heading.agency')}
                   help="financial.taxes.help.agency">
              <Text name="Agency"
                    className="taxes-agency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.taxes.heading.taxtype')}
                   help="financial.taxes.help.taxtype">
              <Text name="TaxType"
                    className="taxes-taxtype"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.taxes.heading.amount')}
                   help="financial.taxes.help.amount">
              <div>
                <i className="fa fa-dollar"></i>
                <Number name="Amount"
                        className="taxes-amount"
                        placeholder={i18n.t('financial.taxes.placeholder.amount')}
                        min="1"
                        bind={true}
                        />
                <div className="taxes-amount coupled-flags">
                  <Checkbox name="AmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.taxes.label.estimated')}
                            toggle="false"
                            bind={true}
                            />
                </div>
              </div>
            </Field>

            <Field title={i18n.t('financial.taxes.heading.date')}
                   help="financial.taxes.help.date"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="Date"
                           className="taxes-date"
                           hideDay={true}
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.taxes.heading.description')}
                   help="financial.taxes.help.description">
              <Textarea name="Description"
                        className="taxes-description"
                        bind={true}
                        />
            </Field>

          </Accordion>
        </Show>
      </div>
    )
  }
}

Taxes.defaultProps = {
  HasTaxes: '',
  List: []
}
