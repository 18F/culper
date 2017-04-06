import React from 'react'
import { i18n } from '../../../../config'
import { DeliquentValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, DateControl, Number, Help, HelpIcon,
         NotApplicable, Address, Checkbox, Text, Textarea } from '../../../Form'

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
                className="deliquent-branch eapp-field-wrap no-label"
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

            <h3>{i18n.t('financial.deliquent.heading.name')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.name">
                <Text name="Name"
                      className="deliquent-name"
                      bind={true}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.accountnumber')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.accountnumber">
                <Text name="AccountNumber"
                      className="deliquent-accountnumber"
                      bind={true}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.propertytype')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.propertytype">
                <Text name="PropertyType"
                      className="deliquent-propertytype"
                      bind={true}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.amount')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.amount">
                <i className="fa fa-dollar"></i>
                <Number name="Amount"
                        className="deliquent-amount"
                        placeholder={i18n.t('financial.deliquent.placeholder.amount')}
                        min="1"
                        bind={true}
                        />
                <HelpIcon />
                <div className="deliquent-amount coupled-flags">
                  <Checkbox name="AmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.deliquent.label.estimated')}
                            toggle="false"
                            bind={true}
                            />
                </div>
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.reason')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.reason">
                <Textarea name="Reason"
                          className="deliquent-reason"
                          bind={true}
                          />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.status')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.status">
                <Text name="Status"
                      className="deliquent-status"
                      bind={true}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.date')}</h3>
            <div className="eapp-field-wrap">
              <Help id="financial.deliquent.help.date">
                <DateControl name="Date"
                             className="deliquent-date"
                             hideDay={true}
                             bind={true}
                             />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.resolved')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.resolved">
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
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.courtname')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.courtname">
                <Text name="CourtName"
                      className="deliquent-courtname"
                      bind={true}
                      />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.courtaddress')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.courtaddress">
                <Address name="CourtAddress"
                         className="deliquent-courtaddress"
                         bind={true}
                         />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('financial.deliquent.heading.description')}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id="financial.deliquent.help.description">
                <Textarea name="Description"
                          className="deliquent-description"
                          bind={true}
                          />
                <HelpIcon />
              </Help>
            </div>

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
