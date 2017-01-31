import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Collection, Comments, DateControl, Number, Textarea, Help, HelpIcon,
         Text, Name, Address, PetitionType } from '../../../Form'

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
    for (let item of this.state.List) {
      if (!item.PetitionType || !item.PetitionType.value) {
        return false
      }

      if (!item.CourtAddress) {
        return false
      }

      if (!item.CourtInvolved || !item.CourtInvolved.value) {
        return false
      }

      if (!item.CourtNumber || !item.CourtNumber.value) {
        return false
      }

      if (!item.DateDischarged || !item.DateDischarged.month || !item.DateDischarged.year) {
        return false
      }

      if (!item.DateFiled || !item.DateFiled.month || !item.DateFiled.year) {
        return false
      }

      if (!item.NameDebt || !item.NameDebt.first || !item.NameDebt.last || !item.NameDebt.middle) {
        return false
      }

      if (!item.TotalAmount || !item.TotalAmount.value) {
        return false
      }
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
    let petition = i18n.t('financial.bankruptcy.collection.summary.unknown')
    if (item.PetitionType) {
      switch (item.PetitionType.value) {
        case 'Chapter7':
          petition = `${i18n.t('financial.bankruptcy.collection.summary.chapter')} 7`
          break
        case 'Chapter11':
          petition = `${i18n.t('financial.bankruptcy.collection.summary.chapter')} 11`
          break
        case 'Chapter13':
          petition = `${i18n.t('financial.bankruptcy.collection.summary.chapter')} 13`
          break
      }
    }

    let from = i18n.t('financial.bankruptcy.collection.summary.unknown')
    if (item.DateFiled && item.DateFiled.month && item.DateFiled.year) {
      from = '' + item.DateFiled.month + '/' + item.DateFiled.year
    }

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('financial.bankruptcy.collection.summary.item')} {index + 1}:</div>
        <div className="table-cell">{petition}</div>
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
                  label={i18n.t('financial.bankruptcy.courtNumber.label')}
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
        <div className="eapp-field-wrap">
          <Help id="financial.bankruptcy.dateDischarged.help">
            <DateControl name="DateDischarged"
                         className="datedischarged"
                         onValidate={this.handleValidation}
                         hideDay={true} />
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
                    label={i18n.t('financial.bankruptcy.totalAmount.label')}
                    placeholder={i18n.t('financial.bankruptcy.totalAmount.placeholder')}
                    onValidate={this.handleValidation}
                    />
            <HelpIcon className="amount" />
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
                  label={i18n.t('financial.bankruptcy.courtInvolved.label')}
                  placeholder={i18n.t('financial.bankruptcy.courtInvolved.placeholder')}
                  onValidate={this.handleValidation}
                  className="courtinvolved"
                  />
            <HelpIcon className="courtinvolved"/>
          </Help>
        </div>

        <h3>{i18n.t('financial.bankruptcy.heading.courtAddress')}</h3>
        <div className="eapp-field-wrap">
          <Help id="financial.bankruptcy.help.court">
            <Address name="CourtAddress"
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
                label={i18n.t('financial.bankruptcy.branch.question')}
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
