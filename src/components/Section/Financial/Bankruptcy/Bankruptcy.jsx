import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Collection, Comments, DateControl, Number, Textarea, Help, HelpIcon, RadioGroup, Radio,
Text, Name, Address, PetitionType } from '../../../Form'

export default class Bankruptcy extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      HasBankruptcy: props.HasBankruptcy,
      errorCodes: []
    }

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
    for (let item of this.state.List) {
    }

    return true
  }

  /**
   * Updates triggered by the branching component.
   */
  onUpdate (val) {
    this.setState({ HasBankruptcy: val }, () => {
      if (val === 'No') {
        this.myDispatch([])
      }
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
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
   * Takes a value such as "1000" and converts it to "1,000".
   */
  fancyNumber (value) {
    const n = new window.Number(value)
    return n.toLocaleString()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    let losses = i18n.t('financial.bankruptcy.collection.summary.unknownlosses')
    if (item.Losses && item.Losses.value) {
      losses = '$' + this.fancyNumber(item.Losses.value)
    }

    let from = ''
    if (item.Dates && item.Dates.from) {
      from = '' + item.Dates.from.getFullYear()
    }

    let to = ''
    if (item.Dates && item.Dates.to) {
      to = '' + item.Dates.to.getFullYear()
    } else if (item.Dates && item.Dates.present) {
      to = i18n.t('financial.bankruptcy.collection.summary.present')
    }

    const dates = from === '' && to === ''
      ? i18n.t('financial.bankruptcy.collection.summary.nodates')
      : `${from} - ${to}`

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('financial.bankruptcy.collection.summary.debt')} {index + 1}:</div>
        <div className="table-cell losses"><strong>{losses}</strong></div>
        <div className="table-cell dates"><strong>{dates}</strong></div>
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
      <div>
        <Collection minimum="1"
          items={this.state.List}
          dispatch={this.myDispatch}
          summaryTitle=""
          appendLabel={i18n.t('financial.bankruptcy.collection.append')}>

          <h3>{i18n.t('financial.bankruptcy.heading.petitionType')}</h3>
          <Help id="financial.bankruptcy.petitionType.help">
            <PetitionType name="PetitionType" />
            <HelpIcon className="petition-type" />
          </Help>

          <h3>{i18n.t('financial.bankruptcy.heading.courtNumber')}</h3>
          <Help id="financial.bankruptcy.courtNumber.help">
            <Text name="courtNumber"
              className="courtnumber"
              title={i18n.t('financial.bankruptcy.courtNumber.title')}
              onValidate={this.handleValidation}
              placeholder={i18n.t('financial.bankruptcy.courtNumber.placeholder')}
            />
            <HelpIcon className="courtnumber" />
          </Help>

          <h3>{i18n.t('financial.bankruptcy.heading.dateFiled')}</h3>
          <Help id="financial.bankruptcy.dateFiled.help">
            <DateControl name="dateFiled"
              className="datefiled"
              hideDay={true} />
            <HelpIcon className="datefiled" />
          </Help>

          <h3>{i18n.t('financial.bankruptcy.heading.dateDischarged')}</h3>
          <Help id="financial.bankruptcy.dateDischarged.help">
            <DateControl name="dateDischarged"
              className="datedischarged"
              hideDay={true} />
            <HelpIcon className="datedischarged" />
          </Help>

          <h3>{i18n.t('financial.bankruptcy.heading.totalAmount')}</h3>
          <Help id="financial.bankruptcy.totalAmount.help">
            <i className="fa fa-dollar"></i>
            <Number name="totalAmount"
              className="amount"
              min="0"
              placeholder={i18n.t('financial.bankruptcy.totalAmount.placeholder')}
              onValidate={this.handleValidation}
            />
            <HelpIcon className="amount" />
          </Help>

          <h3>{i18n.t('financial.bankruptcy.heading.nameDebt')}</h3>
          <Name name="nameDebt"
            className="namedebt"
          />

          <h3>{i18n.t('financial.bankruptcy.heading.courtInvolved')}</h3>
          <Help id="financial.bankruptcy.courtInvolved.help">
            <Text name="courtInvolved"
              title={i18n.t('financial.bankruptcy.courtInvolved.title')}
              className="courtinvolved"
            />
            <HelpIcon className="courtinvolved"/>
          </Help>

          <h3>{i18n.t('financial.bankruptcy.heading.courtAddress')}</h3>
          <Address name="courtAddress" />

        </Collection>
      </div>
    )
  }

  render () {
    return (
      <div className="bankruptcy eapp-field-wrap">
        <h2>{i18n.t('financial.bankruptcy.title')}</h2>
        <Comments name="Comments"
          title="Add Optional Comment">
          <Branch name="has_bankruptcydebt"
            className="bankruptcy-branch"
            value={this.state.HasBankruptcy}
            help="financial.bankruptcy.help"
            onUpdate={this.onUpdate.bind(this)}>
            <div>{i18n.t('financial.bankruptcy.branch.question')}</div>
          </Branch>
          {this.visibleComponents()}
        </Comments>
      </div>
    )
  }
}
