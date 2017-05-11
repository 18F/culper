import React from 'react'
import { i18n } from '../../../../config'
import { DelinquentValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, DateControl, Currency, Field,
         NotApplicable, Address, Checkbox, Text, Textarea } from '../../../Form'
import Infractions from './Infractions'

export default class Delinquent extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasDelinquent: props.HasDelinquent,
      List: props.List,
      ListBranch: props.ListBranch,
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
    return new DelinquentValidator(this.state, null).isValid()
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasDelinquent: val }, () => {
      this.updateList(val === 'No' ? [] : this.state.List)
      this.handleValidation(event, null, null)
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
          HasDelinquent: this.state.HasDelinquent
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item || {})
    const name = (obj.Name || {}).value || i18n.t('financial.delinquent.collection.summary.unknown')
    const amount = (obj.Amount || {}).value
    const text = `${name}${amount ? ', $' + amount : ''}`.trim()
    const date = (obj.Date || {})

    let from = ''
    if (date.month && date.year) {
      from = '' + date.month + '/' + date.year
    }

    return (
      <span>
        <span className="index">{i18n.t('financial.delinquent.collection.summary.item')} {index + 1}:</span>
        <span><strong>{text}</strong></span>
        <span className="dates"><strong>{from}</strong></span>
      </span>
    )
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

        {i18n.m('financial.delinquent.collection.appendMessage')}
      </div>
    )
  }

  render () {
    return (
      <div className="delinquent">
        <Branch name="has_delinquent"
                className="delinquent-branch eapp-field-wrap"
                value={this.state.HasDelinquent}
                help="financial.delinquent.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasDelinquent === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('financial.delinquent.collection.summary.title')}
                     appendTitle={i18n.t('financial.delinquent.collection.appendTitle')}
                     appendMessage={this.message()}
                     appendLabel={i18n.t('financial.delinquent.collection.append')}>

            <Field title={i18n.t('financial.delinquent.heading.name')}
                   help="financial.delinquent.help.name">
              <Text name="Name"
                    className="delinquent-name"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.infractions')}
                   help="financial.delinquent.help.infractions">
              <Infractions name="Infractions"
                           className="delinquent-infractions"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.accountnumber')}
                   help="financial.delinquent.help.accountnumber">
              <Text name="AccountNumber"
                    className="delinquent-accountnumber"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.propertytype')}
                   help="financial.delinquent.help.propertytype">
              <Text name="PropertyType"
                    className="delinquent-propertytype"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.amount')}
                   help="financial.delinquent.help.amount">
              <div>
                <Currency name="Amount"
                          className="delinquent-amount"
                          placeholder={i18n.t('financial.delinquent.placeholder.amount')}
                          min="1"
                          bind={true}
                          />
                <div className="flags">
                  <Checkbox name="AmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.delinquent.label.estimated')}
                            toggle="false"
                            bind={true}
                            />
                </div>
              </div>
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.reason')}
                   help="financial.delinquent.help.reason">
              <Textarea name="Reason"
                        className="delinquent-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.status')}
                   help="financial.delinquent.help.status">
              <Text name="Status"
                    className="delinquent-status"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.date')}
                   help="financial.delinquent.help.date"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="Date"
                           className="delinquent-date"
                           hideDay={true}
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.resolved')}
                   help="financial.delinquent.help.resolved"
                   adjustFor="label"
                   shrink={true}>
              <NotApplicable name="ResolvedNotApplicable"
                             label={i18n.t('financial.delinquent.label.notresolved')}
                             or={i18n.m('financial.delinquent.para.or')}
                             bind={true}>
                <DateControl name="Resolved"
                             className="delinquent-resolved"
                             hideDay={true}
                             bind={true}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.courtname')}
                   help="financial.delinquent.help.courtname">
              <Text name="CourtName"
                    className="delinquent-courtname"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.courtaddress')}
                   help="financial.delinquent.help.courtaddress"
                   adjustFor="address">
              <Address name="CourtAddress"
                       className="delinquent-courtaddress"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.description')}
                   help="financial.delinquent.help.description">
              <Textarea name="Description"
                        className="delinquent-description"
                        bind={true}
                        />
            </Field>

          </Accordion>
        </Show>
      </div>
    )
  }
}

Delinquent.defaultProps = {
  HasDelinquent: '',
  List: [],
  ListBranch: ''
}
