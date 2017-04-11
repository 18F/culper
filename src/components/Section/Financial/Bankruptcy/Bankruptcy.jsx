import React from 'react'
import { i18n } from '../../../../config'
import { BankruptcyValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Comments, DateControl, Number, Field,
         Text, Name, Address, PetitionType, Checkbox, NotApplicable } from '../../../Form'

export default class Bankruptcy extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      Comments: props.Comments,
      HasBankruptcy: props.HasBankruptcy,
      errorCodes: []
    }

    this.commentsUpdated = this.commentsUpdated.bind(this)
    this.myDispatch = this.myDispatch.bind(this)
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
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new BankruptcyValidator(this.state, null).isValid()
  }

  /**
   * Updates triggered by the branching component.
   */
  onUpdate (val, event) {
    this.setState({ HasBankruptcy: val }, () => {
      this.myDispatch(val === 'No' ? [] : this.state.List)
      this.handleValidation(event, null, null)
    })
  }

  commentsUpdated (val) {
    this.setState({ Comments: val }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          Comments: this.state.Comments,
          HasBankruptcy: this.state.HasBankruptcy
        })
      }
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasBankruptcy: this.state.HasBankruptcy
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    let address1 = ''
    let address2 = ''
    if (item.CourtAddress) {
      address1 += `${item.CourtAddress.address || ''}`.trim()
      if (item.CourtAddress.addressType === 'United States') {
        address2 = `${item.CourtAddress.city || ''}, ${item.CourtAddress.state || ''} ${item.CourtAddress.zipcode || ''}`.trim()
      } else if (item.CourtAddress.addressType === 'APOFPO') {
        address2 = `${item.CourtAddress.apoFpoType || ''}, ${item.CourtAddress.apoFpo || ''} ${item.CourtAddress.zipcode || ''}`.trim()
      } else if (item.CourtAddress.addressType === 'International') {
        address2 = `${item.CourtAddress.city || ''}, ${item.CourtAddress.country || ''}`.trim()
      }
    }

    if (address1.length === 0 || address2.length === 1) {
      address1 = i18n.t('financial.bankruptcy.collection.summary.unknown')
    }

    let from = i18n.t('financial.bankruptcy.collection.summary.nodates')
    if (item.DateFiled && item.DateFiled.month && item.DateFiled.year) {
      from = '' + item.DateFiled.month + '/' + item.DateFiled.year
    }

    return (
      <span>
        <span className="index">{i18n.t('financial.bankruptcy.collection.summary.item')} {index + 1}:</span>
        <span>{address1}<br />{address2}</span>
        <span className="dates">{from}</span>
      </span>
    )
  }

  render () {
    return (
      <div className="bankruptcy">
        <Branch name="has_bankruptcydebt"
                className="bankruptcy-branch"
                value={this.state.HasBankruptcy}
                help="financial.bankruptcy.help"
                onUpdate={this.onUpdate.bind(this)}>
        </Branch>
        <Show when={this.state.HasBankruptcy === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.myDispatch}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('financial.bankruptcy.collection.summary.title')}
                     appendLabel={i18n.t('financial.bankruptcy.collection.append')}>

            <h3>{i18n.t('financial.bankruptcy.heading.petitionType')}</h3>
            <PetitionType name="PetitionType"
                          bind={true}
                          />

            <Field title={i18n.t('financial.bankruptcy.heading.courtNumber')}
                   help="financial.bankruptcy.courtNumber.help">
              <Text name="CourtNumber"
                    className="courtnumber"
                    placeholder={i18n.t('financial.bankruptcy.courtNumber.placeholder')}
                    title={i18n.t('financial.bankruptcy.courtNumber.title')}
                    placeholder={i18n.t('financial.bankruptcy.courtNumber.placeholder')}
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.bankruptcy.heading.dateFiled')}
                   help="financial.bankruptcy.dateFiled.help"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="DateFiled"
                           className="datefiled"
                           bind={true}
                           hideDay={true} />
            </Field>

            <Field title={i18n.t('financial.bankruptcy.heading.dateDischarged')}
                   help="financial.bankruptcy.dateDischarged.help"
                   adjustFor="buttons"
                   shrink={true}>
              <NotApplicable name="DischargeDateNotApplicable"
                             bind={true}>
                <DateControl name="DateDischarged"
                             className="datedischarged"
                             receiveProps="true"
                             bind={true}
                             hideDay={true} />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('financial.bankruptcy.heading.totalAmount')}
                   help="financial.bankruptcy.totalAmount.help">
              <div>
                <i className="fa fa-dollar"></i>
                <Number name="TotalAmount"
                        className="amount"
                        min="0"
                        placeholder={i18n.t('financial.bankruptcy.totalAmount.placeholder')}
                        bind={true}
                        />
                <div className="text-right">
                  <Checkbox name="TotalAmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.bankruptcy.totalAmount.estimated')}
                            toggle="false"
                            checked={this.state.TotalAmountEstimated}
                            bind={true}
                            />
                </div>
              </div>
            </Field>

            <h3>{i18n.t('financial.bankruptcy.heading.nameDebt')}</h3>
            <Name name="NameDebt"
                  className="namedebt"
                  bind={true}
                  />

            <Field title={i18n.t('financial.bankruptcy.heading.courtInvolved')}
                   help="financial.bankruptcy.courtInvolved.help">
              <Text name="CourtInvolved"
                    placeholder={i18n.t('financial.bankruptcy.courtInvolved.placeholder')}
                    className="courtinvolved"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.bankruptcy.heading.courtAddress')}
                   help="financial.bankruptcy.courtAddress.help"
                   adjustFor="labels">
              <Address name="CourtAddress"
                       label={i18n.t('financial.bankruptcy.courtAddress.label')}
                       bind={true}
                       />
            </Field>
          </Accordion>
        </Show>
        <Comments name="Comments"
                  value={this.state.Comments}
                  label={i18n.t('financial.bankruptcy.comments.label')}
                  onUpdate={this.commentsUpdated}
                  onValidate={this.handleValidation}>
          <h3>{i18n.t('financial.bankruptcy.heading.comments')}</h3>
        </Comments>
      </div>
    )
  }
}
