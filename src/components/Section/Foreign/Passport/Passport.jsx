import React from 'react'
import { i18n } from '../../../../config'
import { PassportValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Show, Text, Suggestions, Name,
         DateControl, Branch, Radio, RadioGroup } from '../../../Form'

export default class Passport extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateNumber = this.updateNumber.bind(this)
    this.updateCard = this.updateCard.bind(this)
    this.updateIssued = this.updateIssued.bind(this)
    this.updateExpiration = this.updateExpiration.bind(this)
    this.showSuggestions = this.showSuggestions.bind(this)
    this.onSuggestion = this.onSuggestion.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  update (queue, fn) {
    this.props.onUpdate({
      Name: this.props.Name,
      Number: this.props.Number,
      Card: this.props.Card,
      Issued: this.props.Issued,
      Expiration: this.props.Expiration,
      Comments: this.props.Comments,
      HasPassport: this.props.HasPassport,
      suggestedNames: this.props.suggestedNames,
      ...queue
    })

    if (fn) {
      fn()
    }
  }

  /**
   * Handle the change event.
   */
  updateCard (event) {
    this.update({
      Card: event.target.value
    }, () => {
      // This allows us to force a blur/validation using
      // the new regular expression
      this.refs.number.refs.text.refs.input.focus()
      this.refs.number.refs.text.refs.input.blur()
    })
  }

  /**
   * Handle when the yes/no option has been changed
   */
  updateBranch (val, event) {
    this.update({
      HasPassport: val,
      Name: val === 'Yes' ? this.props.Name : {},
      Number: val === 'Yes' ? this.props.Number : '',
      Issued: val === 'Yes' ? this.props.Issued : {},
      Expired: val === 'Yes' ? this.props.Expired : {}
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateNumber (values) {
    this.update({
      Number: values
    })
  }

  updateIssued (values) {
    this.update({
      Issued: values
    })
  }

  updateExpiration (values) {
    this.update({
      Expiration: values
    })
  }

  renderSuggestion (suggestion) {
    suggestion = suggestion || {}
    const name = `${suggestion.first || ''} ${suggestion.middle || ''} ${suggestion.last || ''} ${suggestion.suffix || ''}`.trim()
    return (<span>{name}</span>)
  }

  onSuggestion (suggestion) {
    this.update({
      Name: suggestion,
      suggestedNames: []
    })
  }

  onDismiss (suggestion) {
    this.update({
      suggestedNames: []
    })
  }

  showSuggestions () {
    // If we have a name already, don't show
    if (this.props.Name && this.props.Name.first && this.props.Name.last) {
      return false
    }

    // If we have suggestions, show them
    return this.props.suggestedNames.length
  }

  render () {
    let re = this.props.reBook
    if (this.props.Card === 'Card') {
      re = this.props.reCard
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
                help="foreign.passport.branch.help"
                value={this.props.HasPassport}
                warning={true}
                onUpdate={this.updateBranch}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                >
        </Branch>
        <Show when={this.props.HasPassport === 'Yes'}>
          <div>
            <h3>{i18n.t('foreign.passport.name')}</h3>
            <Suggestions show={this.showSuggestions()}
                         suggestions={this.props.suggestedNames}
                         renderSuggestion={this.renderSuggestion}
                         withSuggestions={true}
                         suggestionTitle={i18n.t('suggestions.name.title')}
                         suggestionParagraph={i18n.m('suggestions.name.para')}
                         suggestionLabel={i18n.t('suggestions.name.label')}
                         suggestionDismissLabel={i18n.t('suggestions.name.dismiss')}
                         suggestionUseLabel={i18n.t('suggestions.name.use')}
                         onSuggestion={this.onSuggestion}
                         onDismiss={this.onDismiss}
                         />
           <Field scrollIntoView={this.props.scrollIntoView}>
              <Name name="name"
                    {...this.props.Name}
                    onUpdate={this.updateName}
                    onError={this.handleError}
                    required={this.props.required}
                    scrollIntoView={this.props.scrollIntoView}
                    />
            </Field>

            <Field title={i18n.t('foreign.passport.number')}
                   help="foreign.passport.help.number"
                   errorPrefix="passport"
                   adjustFor="buttons"
                   shrink={true}
                   scrollIntoView={this.props.scrollIntoView}>
              <div>
                <RadioGroup className="option-list"
                            onError={this.handleError}
                            required={this.props.required}
                            selectedValue={this.props.Card}>
                  <Radio name="passport-book"
                         className="passport-book"
                         label={i18n.t('foreign.passport.label.book')}
                         value="Book"
                         onChange={this.updateCard}
                         onError={this.handleError}
                         />
                  <Radio name="passport-card"
                         className="passport-card"
                         label={i18n.t('foreign.passport.label.card')}
                         value="Card"
                         onChange={this.updateCard}
                         onError={this.handleError}
                         />
                </RadioGroup>
                <Text name="number"
                      value={this.props.Number.value}
                      label={i18n.t('foreign.passport.label.number')}
                      placeholder={i18n.t('foreign.passport.placeholder.number')}
                      pattern={re}
                      maxlength="9"
                      className="number passport-number"
                      ref="number"
                      prefix="passport"
                      onUpdate={this.updateNumber}
                      onError={this.handleError}
                      required={this.props.required}
                      />
              </div>
            </Field>

            <Field title={i18n.t('foreign.passport.issued')}
                   help="foreign.passport.help.issued"
                   adjustFor="labels"
                   shrink={true}
                   scrollIntoView={this.props.scrollIntoView}>
              <DateControl name="issued"
                           className="passport-issued"
                           {...this.props.Issued}
                           onUpdate={this.updateIssued}
                           onError={this.handleError}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('foreign.passport.expiration')}
                   help="foreign.passport.help.expiration"
                   adjustFor="labels"
                   shrink={true}
                   scrollIntoView={this.props.scrollIntoView}>
              <DateControl name="expiration"
                           className="passport-expiration"
                           {...this.props.Expiration}
                           maxDate={null}
                           onUpdate={this.updateExpiration}
                           onError={this.handleError}
                           required={this.props.required}
                           />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

// Regular expressions were based on the information provided by
// U.S. Citizenship and Immigration Services (USCIS) at:
//
// https://e-verify-uscis.gov/esp/help/EvHelpPassportandPassportCardNbr.htm
Passport.defaultProps = {
  Name: {},
  Number: '',
  Card: 'Book',
  Issued: {},
  Expiration: {},
  Comments: '',
  HasPassport: '',
  suggestedNames: [],
  reBook: '^[a-zA-Z]{1}[0-9]{6,9}$',
  reCard: '^[cC]{1}[0-9]{8}$',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'passport',
  dispatch: () => {},
  validator: (state, props) => {
    return new PassportValidator(props, props).isValid()
  }
}
