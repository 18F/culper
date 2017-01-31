import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Help, HelpIcon, Text, Name, DateControl, Branch, Comments } from '../../../Form'

export default class Passport extends ValidationElement {
  constructor (props) {
    super(props)

    // Regular expressions were based on the information provided by
    // U.S. Citizenship and Immigration Services (USCIS) at:
    //
    // https://e-verify-uscis.gov/esp/help/EvHelpPassportandPassportCardNbr.htm
    this.state = {
      Name: props.Name || {},
      Number: props.Number || '',
      Card: props.Card || false,
      Issued: props.Issued || {},
      Expiration: props.Expiration || {},
      Comments: props.Comments || '',
      HasPassport: props.HasPassport,
      reBook: '^[a-zA-Z]{1}[0-9]{6,9}$',
      reCard: '^[cC]{1}[0-9]{8}$',
      error: false,
      valid: false,
      errorCodes: []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.handleUpdate('Card', event.target.checked, () => {
      // This allows us to force a blur/validation using
      // the new regular expression
      this.refs.number.refs.text.refs.input.focus()
      this.refs.number.refs.text.refs.input.blur()
    })
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
   * Handle the update event.
   */
  handleUpdate (field, values, callback) {
    this.setState({ [field]: values }, () => {
      if (callback) {
        callback()
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          Number: this.state.Number,
          Card: this.state.Card,
          Issued: this.state.Issued,
          Expiration: this.state.Expiration,
          Comments: this.state.Comments,
          HasPassport: this.state.HasPassport
        })
      }
    })
  }

  isValid () {
    if (!this.state.Name.first || !this.state.Name.last) {
      return false
    }

    let re = this.state.Card ? new RegExp(this.state.reBook) : new RegExp(this.state.reCard)
    if (!re.test(this.state.Number)) {
      return false
    }

    if (!this.isValidEstimatedDate(this.state.Issued)) {
      return false
    }

    if (!this.isValidEstimatedDate(this.state.Expiration)) {
      return false
    }

    if (this.state.Expiration.date < this.state.Issued.date) {
      return false
    }

    return true
  }

  isValidEstimatedDate (obj) {
    let month = parseInt(obj.month || '1')
    let day = parseInt(obj.day || '1')
    let year = parseInt(obj.year)
    // let estimated = obj.estimated

    if (month < 1 && month > 12) {
      return false
    }

    if (day < 1 && day > 31) {
      return false
    }

    if (year < 1) {
      return false
    }

    return true
  }

  /**
   * Handle when the yes/no option has been changed
   */
  yesNoClicked (val) {
    this.handleUpdate('HasPassport', val)
  }

  /**
   * Render children only when we explicit state there is passport information
   */
  visibleComponents () {
    if (this.state.HasPassport !== 'Yes') {
      return ''
    }

    let re = this.state.reBook
    if (this.state.Card) {
      re = this.state.reCard
    }

    return (
      <div>
        <h3>Provide the name in which passport was first issued</h3>
        <Name name="name"
              {...this.state.Name}
              className="eapp-field-wrap"
              onUpdate={this.handleUpdate.bind(this, 'Name')}
              onValidate={this.handleValidation}
              />

        <h3>{i18n.t('foreign.passport.number')}</h3>
        <div className="eapp-field-wrap">
          <Help id="foreign.passport.help.number">
            <div className="number">
              <Text name="number"
                    value={this.state.Number}
                    label={i18n.t('foreign.passport.label.number')}
                    placeholder={i18n.t('foreign.passport.placeholder.number')}
                    pattern={re}
                    maxlength="9"
                    ref="number"
                    onUpdate={this.handleUpdate.bind(this, 'Number')}
                    onValidate={this.handleValidation}
                    />
              <div className="text-right">
                <input id="passportCard"
                      type="checkbox"
                      value="card"
                      checked={this.state.Card}
                      onChange={this.handleChange} />
                <label>{i18n.t('foreign.passport.card')}</label>
              </div>
            </div>
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('foreign.passport.issued')}</h3>
        <div className="eapp-field-wrap">
          <Help id="foriegn.passport.help.issued">
            <DateControl name="issued"
                         {...this.state.Issued}
                         onUpdate={this.handleUpdate.bind(this, 'Issued')}
                         onValidate={this.handleValidation}
                         />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('foreign.passport.expiration')}</h3>
        <div className="eapp-field-wrap">
          <Help id="foriegn.passport.help.expiration">
            <DateControl name="expiration"
                         {...this.state.Expiration}
                         onUpdate={this.handleUpdate.bind(this, 'Expiration')}
                         onValidate={this.handleValidation}
                         />
            <HelpIcon />
          </Help>
        </div>

        <Comments name="comments"
                  value={this.state.Comments}
                  label={i18n.t('foreign.passport.comment.label')}
                  className="eapp-field-wrap"
                  onUpdate={this.handleUpdate.bind(this, 'Comments')}
                  onValidate={this.handleValidation}
                  >
          <h3>{i18n.t('foreign.passport.comment.title')}</h3>
        </Comments>
      </div>
    )
  }

  render () {
    return (
      <div className="passport">
        <p>
          {i18n.t('foreign.passport.info.text')}<br />
          <a href="https://travel.state.gov/content/travel/en.html" target="_blank" title="U.S. State Department Help">
            {i18n.t('foreign.passport.info.link')}
          </a>
        </p>
        <Branch name="has_passport"
                value={this.state.HasPassport}
                onUpdate={this.yesNoClicked.bind(this)}
                className="eapp-field-wrap"
                label={i18n.t('foreign.passport.question.title')}
                help="foreign.passport.branch.help"
                >
        </Branch>
        {this.visibleComponents()}
      </div>
    )
  }
}
