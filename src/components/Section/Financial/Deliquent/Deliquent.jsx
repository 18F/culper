import React from 'react'
import { i18n } from '../../../../config'
import { DeliquentValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, DateControl, Number, Field,
         NotApplicable, Address, Checkbox, Text, Textarea } from '../../../Form'
import Infractions from './Infractions'

export default class Deliquent extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasDeliquent: props.HasDeliquent,
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
    return new DeliquentValidator(this.state, null).isValid()
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasDeliquent: val }, () => {
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
          HasDeliquent: this.state.HasDeliquent
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item || {})
    const name = (obj.Name || {}).value || i18n.t('financial.deliquent.collection.summary.unknown')
    const amount = (obj.Amount || {}).value
    const text = `${name}${amount ? ', $' + amount : ''}`.trim()
    const date = (obj.Date || {})

    let from = ''
    if (date.month && date.year) {
      from = '' + date.month + '/' + date.year
    }

    return (
      <span>
        <span className="index">{i18n.t('financial.deliquent.collection.summary.item')} {index + 1}:</span>
        <span><strong>{text}</strong></span>
        <span className="dates">{from}</span>
      </span>
    )
  }

  message () {
    return (
      <div>
        <ul>
          <li>{i18n.m('financial.deliquent.para.alimony')}</li>
          <li>{i18n.m('financial.deliquent.para.judgement')}</li>
          <li>{i18n.m('financial.deliquent.para.lien')}</li>
          <li>{i18n.m('financial.deliquent.para.federal')}</li>
        </ul>

        {i18n.m('financial.deliquent.collection.appendMessage')}
      </div>
    )
  }

  render () {
    return (
      <div className="deliquent">
        <Branch name="has_deliquent"
                className="deliquent-branch"
                value={this.state.HasDeliquent}
                help="financial.deliquent.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasDeliquent === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('financial.deliquent.collection.summary.title')}
                     appendTitle={i18n.t('financial.deliquent.collection.appendTitle')}
                     appendMessage={this.message()}
                     appendLabel={i18n.t('financial.deliquent.collection.append')}>

            <Field title={i18n.t('financial.deliquent.heading.name')}
                   help="financial.deliquent.help.name">
              <Text name="Name"
                    className="deliquent-name"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.infractions')}
                   help="financial.deliquent.help.infractions">
              <Infractions name="Infractions"
                           className="deliquent-infractions"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.accountnumber')}
                   help="financial.deliquent.help.accountnumber">
              <Text name="AccountNumber"
                    className="deliquent-accountnumber"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.propertytype')}
                   help="financial.deliquent.help.propertytype">
              <Text name="PropertyType"
                    className="deliquent-propertytype"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.amount')}
                   help="financial.deliquent.help.amount">
              <div>
                <i className="fa fa-dollar"></i>
                <Number name="Amount"
                        className="deliquent-amount"
                        placeholder={i18n.t('financial.deliquent.placeholder.amount')}
                        min="1"
                        bind={true}
                        />
                <div className="flags">
                  <Checkbox name="AmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.deliquent.label.estimated')}
                            toggle="false"
                            bind={true}
                            />
                </div>
              </div>
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.reason')}
                   help="financial.deliquent.help.reason">
              <Textarea name="Reason"
                        className="deliquent-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.status')}
                   help="financial.deliquent.help.status">
              <Text name="Status"
                    className="deliquent-status"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.date')}
                   help="financial.deliquent.help.date"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="Date"
                           className="deliquent-date"
                           hideDay={true}
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.resolved')}
                   help="financial.deliquent.help.resolved"
                   adjustFor="buttons"
                   shrink={true}>
              <NotApplicable name="ResolvedNotApplicable"
                             label={i18n.t('financial.deliquent.label.notresolved')}
                             or={i18n.m('financial.deliquent.para.or')}
                             bind={true}>
                <DateControl name="Resolved"
                             className="deliquent-resolved"
                             hideDay={true}
                             bind={true}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.courtname')}
                   help="financial.deliquent.help.courtname">
              <Text name="CourtName"
                    className="deliquent-courtname"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.courtaddress')}
                   help="financial.deliquent.help.courtaddress"
                   adjustFor="big-buttons">
              <Address name="CourtAddress"
                       className="deliquent-courtaddress"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('financial.deliquent.heading.description')}
                   help="financial.deliquent.help.description">
              <Textarea name="Description"
                        className="deliquent-description"
                        bind={true}
                        />
            </Field>

          </Accordion>
        </Show>
      </div>
    )
  }
}

Deliquent.defaultProps = {
  HasDeliquent: '',
  List: []
}
