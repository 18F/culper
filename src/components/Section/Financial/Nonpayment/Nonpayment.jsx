import React from 'react'
import { i18n } from '../../../../config'
import { NonpaymentValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, DateControl, Currency, Field,
         NotApplicable, Checkbox, Text, Textarea } from '../../../Form'
import Infractions from './Infractions'

export default class Nonpayment extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasNonpayment: props.HasNonpayment,
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
    return new NonpaymentValidator(this.state, null).isValid()
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasNonpayment: val }, () => {
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
          HasNonpayment: this.state.HasNonpayment
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item || {})
    const name = (obj.Name || {}).value || i18n.t('financial.nonpayment.collection.summary.unknown')
    const amount = (obj.Amount || {}).value
    const text = `${name}${amount ? ', $' + amount : ''}`.trim()
    const date = (obj.Date || {})

    let from = ''
    if (date.month && date.year) {
      from = '' + date.month + '/' + date.year
    }

    return (
      <span>
        <span className="index">{i18n.t('financial.nonpayment.collection.summary.item')} {index + 1}:</span>
        <span><strong>{text}</strong></span>
        <span className="dates"><strong>{from}</strong></span>
      </span>
    )
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

        {i18n.m('financial.nonpayment.collection.appendMessage')}
      </div>
    )
  }

  render () {
    return (
      <div className="nonpayment">
        <Branch name="has_nonpayment"
                className="nonpayment-branch"
                value={this.state.HasNonpayment}
                help="financial.nonpayment.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasNonpayment === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('financial.nonpayment.collection.summary.title')}
                     appendTitle={i18n.t('financial.nonpayment.collection.appendTitle')}
                     appendMessage={this.message()}
                     appendLabel={i18n.t('financial.nonpayment.collection.append')}>

            <Field title={i18n.t('financial.nonpayment.heading.name')}
                   help="financial.nonpayment.help.name">
              <Text name="Name"
                    className="nonpayment-name"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.infractions')}
                   help="financial.nonpayment.help.infractions">
              <Infractions name="Infractions"
                           className="nonpayment-infractions"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.accountnumber')}
                   help="financial.nonpayment.help.accountnumber">
              <Text name="AccountNumber"
                    className="nonpayment-accountnumber"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.propertytype')}
                   help="financial.nonpayment.help.propertytype">
              <Text name="PropertyType"
                    className="nonpayment-propertytype"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.amount')}
                   help="financial.nonpayment.help.amount">
              <div>
                <Currency name="Amount"
                          className="nonpayment-amount"
                          placeholder={i18n.t('financial.nonpayment.placeholder.amount')}
                          min="1"
                          bind={true}
                          />
                <div className="flags">
                  <Checkbox name="AmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.nonpayment.label.estimated')}
                            toggle="false"
                            bind={true}
                            />
                </div>
              </div>
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.reason')}
                   help="financial.nonpayment.help.reason">
              <Textarea name="Reason"
                        className="nonpayment-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.status')}
                   help="financial.nonpayment.help.status">
              <Text name="Status"
                    className="nonpayment-status"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.resolved')}
                   help="financial.nonpayment.help.resolved"
                   adjustFor="buttons"
                   shrink={true}>
              <NotApplicable name="ResolvedNotApplicable"
                             label={i18n.t('financial.nonpayment.label.notresolved')}
                             or={i18n.m('financial.nonpayment.para.or')}
                             bind={true}>
                <DateControl name="Resolved"
                             className="nonpayment-resolved"
                             hideDay={true}
                             bind={true}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.date')}
                   help="financial.nonpayment.help.date"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="Date"
                           className="nonpayment-date"
                           hideDay={true}
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.nonpayment.heading.description')}
                   help="financial.nonpayment.help.description">
              <Textarea name="Description"
                        className="nonpayment-description"
                        bind={true}
                        />
            </Field>

          </Accordion>
        </Show>
      </div>
    )
  }
}

Nonpayment.defaultProps = {
  HasNonpayment: '',
  List: []
}
