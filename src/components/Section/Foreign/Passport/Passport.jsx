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
    this.updateExpired = this.updateExpired.bind(this)
    this.onSuggestion = this.onSuggestion.bind(this)
    this.dismissSuggestions = this.dismissSuggestions.bind(this)
  }

  update (queue, fn) {
    if (this.props.onUpdate) {
      let obj = {
        Name: this.props.Name,
        Number: this.props.Number,
        Card: this.props.Card,
        Issued: this.props.Issued,
        Expiration: this.props.Expiration,
        Comments: this.props.Comments,
        HasPassport: this.props.HasPassport
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }

    if (fn) {
      fn()
    }
  }

  /**
   * Handle the change event.
   */
  updateCard (event) {
    this.update([
      { name: 'Card', value: event.target.value }
    ], () => {
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
    this.update([
      { name: 'HasPassport', value: val },
      { name: 'Name', value: val === 'Yes' ? this.props.Name : {} },
      { name: 'Number', value: val === 'Yes' ? this.props.Number : '' },
      { name: 'Issued', value: val === 'Yes' ? this.props.Issued : {} },
      { name: 'Expired', value: val === 'Yes' ? this.props.Expired : {} }
    ])
  }

  updateName (values) {
    this.update([
      { name: 'Name', value: values }
    ])
  }

  updateNumber (values) {
    this.update([
      { name: 'Number', value: values }
    ])
  }

  updateIssued (values) {
    this.update([
      { name: 'Issued', value: values }
    ])
  }

  updateExpired (values) {
    this.update([
      { name: 'Expired', value: values }
    ])
  }

  renderSuggestion (suggestion) {
    suggestion = suggestion || {}
    const name = `${suggestion.first || ''} ${suggestion.middle || ''} ${suggestion.last || ''} ${suggestion.suffix || ''}`.trim()
    return (<span>{name}</span>)
  }

  onSuggestion (suggestion) {
    this.update([
      { name: 'Name', value: suggestion }
    ])
  }

  dismissSuggestions () {
    // If we have a name already, don't show
    if (this.props.Name && this.props.Name.first && this.props.Name.last) {
      return true
    }

    // If we have suggestions, show them
    if (this.props.suggestedNames && this.props.suggestedNames.length) {
      return false
    }
    return true
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
                >
        </Branch>
        <Show when={this.props.HasPassport === 'Yes'}>
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
                    {...this.props.Name}
                    onUpdate={this.updateName}
                    onError={this.handleError}
                    />
            </Suggestions>

            <Field title={i18n.t('foreign.passport.number')}
                   help="foreign.passport.help.number"
                   errorPrefix="passport"
                   adjustFor="buttons"
                   shrink={true}>
              <div>
                <RadioGroup className="passport-card option-list"
                            selectedValue={this.props.Card}>
                  <Radio name="passport-book"
                         label={i18n.t('foreign.passport.label.book')}
                         value="Book"
                         onChange={this.updateCard}
                         onError={this.handleError}
                         />
                  <Radio name="passport-card"
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
                      className="number"
                      ref="number"
                      prefix="passport"
                      onUpdate={this.updateNumber}
                      onError={this.handleError}
                      />
              </div>
            </Field>

            <Field title={i18n.t('foreign.passport.issued')}
                   help="foreign.passport.help.issued"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="issued"
                           {...this.props.Issued}
                           onUpdate={this.updateIssued}
                           onError={this.handleError}
                           />
            </Field>

            <Field title={i18n.t('foreign.passport.expiration')}
                   help="foreign.passport.help.expiration"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="expiration"
                           {...this.props.Expiration}
                           onUpdate={this.updateExpiration}
                           onError={this.handleError}
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
  reBook: '^[a-zA-Z]{1}[0-9]{6,9}$',
  reCard: '^[cC]{1}[0-9]{8}$',
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'passport',
  dispatch: () => {},
  validator: (state, props) => {
    return new PassportValidator(props, props).isValid()
  }
}
