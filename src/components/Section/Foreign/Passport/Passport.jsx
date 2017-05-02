import React from 'react'
import { i18n } from '../../../../config'
import { PassportValidator } from '../../../../validators'
import { ValidationElement, Field, Show, Text, Suggestions, Name,
         DateControl, Branch, Radio, RadioGroup } from '../../../Form'

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
    suggestion = suggestion || {}
    const name = `${suggestion.first || ''} ${suggestion.middle || ''} ${suggestion.last || ''} ${suggestion.suffix || ''}`.trim()
    return (<span>{name}</span>)
  }

  onSuggestion (suggestion) {
    this.handleUpdate('Name', suggestion)
  }

  dismissSuggestions () {
    // If we have a name already, don't show
    if (this.state.Name && this.state.Name.first && this.state.Name.last) {
      return true
    }

    // If we have suggestions, show them
    if (this.props.suggestedNames && this.props.suggestedNames.length) {
      return false
    }
    return true
  }

  render () {
    let re = this.state.reBook
    if (this.state.Card === 'Card') {
      re = this.state.reCard
    }

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
                help="foreign.passport.branch.help"
                >
        </Branch>
        <Show when={this.state.HasPassport === 'Yes'}>
          <div>
            <h3>{i18n.t('foreign.passport.name')}</h3>
            <Suggestions suggestions={this.props.suggestedNames}
                         renderSuggestion={this.renderSuggestion}
                         onSuggestion={this.onSuggestion}
                         withSuggestions="true"
                         dismissSuggestions={this.dismissSuggestions()}
                         suggestionTitle={i18n.t('suggestions.name.title')}
                         suggestionParagraph={i18n.m('suggestions.name.para')}
                         suggestionLabel={i18n.t('suggestions.name.label')}
                         suggestionDismissLabel={i18n.t('suggestions.name.dismiss')}
                         suggestionUseLabel={i18n.t('suggestions.name.use')}
                         >
              <Name name="name"
                    {...this.state.Name}
                    onUpdate={this.handleUpdate.bind(this, 'Name')}
                    onValidate={this.handleValidation}
                    />
            </Suggestions>

            <Field title={i18n.t('foreign.passport.number')}
                   help="foreign.passport.help.number"
                   errorPrefix="passport"
                   adjustFor="buttons"
                   shrink={true}>
              <div>
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
              </div>
            </Field>

            <Field title={i18n.t('foreign.passport.issued')}
                   help="foreign.passport.help.issued"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="issued"
                           {...this.state.Issued}
                           onUpdate={this.handleUpdate.bind(this, 'Issued')}
                           onValidate={this.handleValidation}
                           />
            </Field>

            <Field title={i18n.t('foreign.passport.expiration')}
                   help="foreign.passport.help.expiration"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="expiration"
                           {...this.state.Expiration}
                           onUpdate={this.handleUpdate.bind(this, 'Expiration')}
                           onValidate={this.handleValidation}
                           />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}
