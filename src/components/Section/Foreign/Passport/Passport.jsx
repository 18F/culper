import React from 'react'
import { i18n } from '../../../../config'
import { PassportValidator } from '../../../../validators'
import { ValidationElement, Help, HelpIcon, Text, Suggestions, Name, DateControl, Branch, Comments, Radio, RadioGroup } from '../../../Form'

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
      Card: props.Card || 'Book',
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

    this.onSuggestion = this.onSuggestion.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.handleUpdate('Card', event.target.value, () => {
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
    return new PassportValidator(this.state, null).isValid()
  }

  /**
   * Handle when the yes/no option has been changed
   */
  yesNoClicked (val, event) {
    this.handleUpdate('HasPassport', val, () => {
      this.handleValidation(event, null, null)
    })
  }

  renderSuggestion (suggestion) {
    const name = `${suggestion.first || ''} ${suggestion.middle || ''} ${suggestion.last || ''} ${suggestion.suffix || ''}`.trim()
    return (<span>{name}</span>)
  }

  onSuggestion (suggestion) {
    this.handleUpdate('Name', suggestion)
  }

  /**
   * Render children only when we explicit state there is passport information
   */
  visibleComponents () {
    if (this.state.HasPassport !== 'Yes') {
      return ''
    }

    let re = this.state.reBook
    if (this.state.Card === 'Card') {
      re = this.state.reCard
    }

    return (
      <div>
        <h3>Provide the name in which passport was first issued</h3>
        <Suggestions suggestions={this.props.suggestedNames}
                     renderSuggestion={this.renderSuggestion}
                     onSuggestion={this.onSuggestion}
                     withSuggestions="true"
                     suggestionTitle={i18n.t('suggestions.name.title')}
                     suggestionParagraph={i18n.m('suggestions.name.para')}
                     suggestionLabel={i18n.t('suggestions.name.label')}
                     suggestionDismissLabel={i18n.t('suggestions.name.dismiss')}
                     suggestionUseLabel={i18n.t('suggestions.name.use')}
                     >
          <Name name="name"
                {...this.state.Name}
                className="eapp-field-wrap"
                onUpdate={this.handleUpdate.bind(this, 'Name')}
                onValidate={this.handleValidation}
                />
        </Suggestions>

        <h3>{i18n.t('foreign.passport.number')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="foreign.passport.help.number" errorPrefix="passport">
            <RadioGroup className="passport-card option-list"
                        selectedValue={this.state.Card}>
              <Radio name="passport-book"
                    label={i18n.t('foreign.passport.label.book')}
                    value="Book"
                    onChange={this.handleChange}
                    />
              <Radio name="passport-card"
                    label={i18n.t('foreign.passport.label.card')}
                    value="Card"
                    onChange={this.handleChange}
                    />
            </RadioGroup>
            <HelpIcon />
            <Text name="number"
                  value={this.state.Number.value}
                  label={i18n.t('foreign.passport.label.number')}
                  placeholder={i18n.t('foreign.passport.placeholder.number')}
                  pattern={re}
                  maxlength="9"
                  className="number"
                  ref="number"
                  onUpdate={this.handleUpdate.bind(this, 'Number')}
                  onValidate={this.handleValidation}
                  />
          </Help>
        </div>

        <h3>{i18n.t('foreign.passport.issued')}</h3>
        <div className="eapp-field-wrap">
          <Help id="foreign.passport.help.issued">
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
          <Help id="foreign.passport.help.expiration">
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
          {i18n.t('foreign.passport.info.text')}
        </p>
        <p>
          <a href="https://travel.state.gov/content/travel/en.html" target="_blank" title="U.S. State Department Help">
            {i18n.t('foreign.passport.info.link')}
          </a>
        </p>
        <h3>{i18n.t('foreign.passport.question.title')}</h3>
        <Branch name="has_passport"
                value={this.state.HasPassport}
                onUpdate={this.yesNoClicked.bind(this)}
                className="eapp-field-wrap"
                help="foreign.passport.branch.help"
                >
        </Branch>
        {this.visibleComponents()}
      </div>
    )
  }
}
