import React from 'react'
import { i18n } from '../../../../config'
import { BankruptcyValidator } from '../../../../validators'
import { ValidationElement, Branch, Collection, Comments, DateControl, Number, Help, HelpIcon,
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
      <div className="table">
        <div className="table-cell index">{i18n.t('financial.bankruptcy.collection.summary.item')} {index + 1}:</div>
        <div className="table-cell">{address1}<br />{address2}</div>
        <div className="table-cell dates">{from}</div>
      </div>
    )
  }

  /**
   * Render children only when we explicit state to do so
   */
  visibleComponents () {
    if (this.state.HasBankruptcy !== 'Yes') {
      return ''
    }

    return (
      <Collection minimum="1"
                  items={this.state.List}
                  dispatch={this.myDispatch}
                  summary={this.summary}
                  summaryTitle={i18n.t('financial.bankruptcy.collection.summary.title')}
                  appendLabel={i18n.t('financial.bankruptcy.collection.append')}>

        <h3>{i18n.t('financial.bankruptcy.heading.petitionType')}</h3>
        <PetitionType name="PetitionType"
                      className="eapp-field-wrap"
                      />

        <h3>{i18n.t('financial.bankruptcy.heading.courtNumber')}</h3>
        <div className="eapp-field-wrap">
          <Help id="financial.bankruptcy.courtNumber.help">
            <Text name="CourtNumber"
                  className="courtnumber"
                  placeholder={i18n.t('financial.bankruptcy.courtNumber.placeholder')}
                  title={i18n.t('financial.bankruptcy.courtNumber.title')}
                  onValidate={this.handleValidation}
                  placeholder={i18n.t('financial.bankruptcy.courtNumber.placeholder')}
                  />
            <HelpIcon className="courtnumber" />
          </Help>
        </div>

        <h3>{i18n.t('financial.bankruptcy.heading.dateFiled')}</h3>
        <div className="eapp-field-wrap">
          <Help id="financial.bankruptcy.dateFiled.help">
            <DateControl name="DateFiled"
                         className="datefiled"
                         onValidate={this.handleValidation}
                         hideDay={true} />
            <HelpIcon className="datefiled" />
          </Help>
        </div>

        <h3>{i18n.t('financial.bankruptcy.heading.dateDischarged')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="financial.bankruptcy.dateDischarged.help">
            <NotApplicable name="DischargeDateNotApplicable"
                           onValidate={this.handleValidation}>
              <DateControl name="DateDischarged"
                           className="datedischarged"
                           receiveProps="true"
                           onValidate={this.handleValidation}
                           hideDay={true} />
            </NotApplicable>
            <HelpIcon className="datedischarged" />
          </Help>
        </div>

        <h3>{i18n.t('financial.bankruptcy.heading.totalAmount')}</h3>
        <div className="eapp-field-wrap">
          <Help id="financial.bankruptcy.totalAmount.help">
            <i className="fa fa-dollar"></i>
            <Number name="TotalAmount"
                    className="amount"
                    min="0"
                    placeholder={i18n.t('financial.bankruptcy.totalAmount.placeholder')}
                    onValidate={this.handleValidation}
                    />
            <HelpIcon className="amount" />
            <div className="coupled-flags">
              <Checkbox name="TotalAmountEstimated"
                        ref="estimated"
                        label={i18n.t('financial.bankruptcy.totalAmount.estimated')}
                        toggle="false"
                        checked={this.state.TotalAmountEstimated}
                        onValidate={this.handleValidation}
                        />
            </div>
          </Help>
        </div>

        <h3>{i18n.t('financial.bankruptcy.heading.nameDebt')}</h3>
        <Name name="NameDebt"
              onValidate={this.handleValidation}
              className="namedebt eapp-field-wrap"
              />

        <h3>{i18n.t('financial.bankruptcy.heading.courtInvolved')}</h3>
        <div className="eapp-field-wrap">
          <Help id="financial.bankruptcy.courtInvolved.help">
            <Text name="CourtInvolved"
                  placeholder={i18n.t('financial.bankruptcy.courtInvolved.placeholder')}
                  onValidate={this.handleValidation}
                  className="courtinvolved"
                  />
            <HelpIcon className="courtinvolved"/>
          </Help>
        </div>

        <h3>{i18n.t('financial.bankruptcy.heading.courtAddress')}</h3>
        <div className="eapp-field-wrap">
          <Help id="financial.bankruptcy.courtAddress.help">
            <Address name="CourtAddress"
                     label={i18n.t('financial.bankruptcy.courtAddress.label')}
                     onValidate={this.handleValidation}
                     />
            <HelpIcon />
          </Help>
        </div>
      </Collection>
    )
  }

  render () {
    return (
      <div className="bankruptcy">
        <Branch name="has_bankruptcydebt"
                className="bankruptcy-branch eapp-field-wrap"
                value={this.state.HasBankruptcy}
                help="financial.bankruptcy.help"
                onUpdate={this.onUpdate.bind(this)}>
        </Branch>
        {this.visibleComponents()}
        <Comments name="Comments"
                  value={this.state.Comments}
                  label={i18n.t('financial.bankruptcy.comments.label')}
                  className="eapp-field-wrap"
                  onUpdate={this.commentsUpdated}
                  onValidate={this.handleValidation}>
          <h3>{i18n.t('financial.bankruptcy.heading.comments')}</h3>
        </Comments>
      </div>
    )
  }
}
