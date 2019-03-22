import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate from 'validators'
import {
  Field,
  Show,
  Text,
  Suggestions,
  Name,
  DateControl,
  Branch,
} from 'components/Form'
import { FOREIGN, FOREIGN_PASSPORT } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../ForeignConnector'
import { extractDate } from '../../History/dateranges'


const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_PASSPORT.name,
  storeKey: FOREIGN_PASSPORT.storeKey,
}

export class Passport extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue, fn) => {
    this.props.onUpdate(this.storeKey, {
      Name: this.props.Name,
      Number: this.props.Number,
      Card: this.props.Card,
      Issued: this.props.Issued,
      Expiration: this.props.Expiration,
      Comments: this.props.Comments,
      HasPassports: this.props.HasPassports,
      suggestedNames: this.props.suggestedNames,
      ...queue,
    })

    if (fn) {
      fn()
    }
  }

  /**
   * Handle the change event.
   */
  updateCard = (values) => {
    this.update(
      {
        Card: values,
      },
      () => {
        // This allows us to force a blur/validation using
        // the new regular expression
        this.refs.number.refs.text.refs.input.focus()
        this.refs.number.refs.text.refs.input.blur()
      },
    )
  }

  /**
   * Handle when the yes/no option has been changed
   */
  updateBranch = (values) => {
    this.update({
      HasPassports: values,
      Name: values.value === 'Yes' ? this.props.Name : {},
      Number: values.value === 'Yes' ? this.props.Number : '',
      Issued: values.value === 'Yes' ? this.props.Issued : {},
      Expired: values.value === 'Yes' ? this.props.Expired : {},
    })
  }

  updateName = (values) => {
    this.update({
      Name: values,
    })
  }

  updateNumber = (values) => {
    this.update({
      Number: values,
    })
  }

  updateIssued = (values) => {
    this.update({
      Issued: values,
    })
  }

  updateExpiration = (values) => {
    this.update({
      Expiration: values,
    })
  }

  renderSuggestion = (suggestion = {}) => {
    const name = `${suggestion.first || ''} ${suggestion.middle || ''} ${suggestion.last || ''} ${suggestion.suffix || ''}`.trim()
    return <span>{name}</span>
  }

  onSuggestion = (suggestion) => {
    this.update({
      Name: suggestion,
      suggestedNames: [],
    })
  }

  onDismiss = () => {
    this.update({
      suggestedNames: [],
    })
  }

  showSuggestions = () => {
    // If we have a name already, don't show
    if (this.props.Name && this.props.Name.first && this.props.Name.last) {
      return false
    }

    // If we have suggestions, show them
    return this.props.suggestedNames.length
  }

  passportBeforeCutoff = () => {
    if (this.props.Issued) {
      const cutoffDate = new Date('1/1/1990 00:00')
      const issueDate = extractDate(this.props.Issued)

      if (issueDate && issueDate < cutoffDate) {
        return true
      }
    }

    return false
  }

  render() {
    const numberLength = this.passportBeforeCutoff() ? '255' : '9'
    const numberRegEx = this.passportBeforeCutoff()
      ? '^[a-zA-Z0-9]*$'
      : this.props.reBook

    return (
      <div
        className="section-content passport"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('foreign.passport.title')}</h1>

        <h3>{i18n.t('foreign.passport.info.text')}</h3>
        <Branch
          name="has_passport"
          label={i18n.t('foreign.passport.question.title')}
          labelSize="h4"
          {...this.props.HasPassports}
          warning
          onUpdate={this.updateBranch}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
        <Show when={this.props.HasPassports.value === 'Yes'}>
          <div>
            <Field
              title={i18n.t('foreign.passport.name')}
              titleSize="h4"
              optional
              className="no-margin-bottom"
            />
            <Suggestions
              show={this.showSuggestions()}
              suggestions={this.props.suggestedNames}
              renderSuggestion={this.renderSuggestion}
              withSuggestions
              suggestionTitle={i18n.t('suggestions.name.title')}
              suggestionParagraph={i18n.m('suggestions.name.para')}
              suggestionLabel={i18n.t('suggestions.name.label')}
              suggestionDismissLabel={i18n.t('suggestions.name.dismiss')}
              suggestionUseLabel={i18n.t('suggestions.name.use')}
              onSuggestion={this.onSuggestion}
              onDismiss={this.onDismiss}
            />
            <Field
              optional
              filterErrors={Name.requiredErrorsOnly}
              scrollIntoView={this.props.scrollIntoView}
            >
              <Name
                name="name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
              />
            </Field>

            <Field
              title={i18n.t('foreign.passport.issued')}
              help="foreign.passport.help.issued"
              adjustFor="labels"
              shrink
              scrollIntoView={this.props.scrollIntoView}
            >
              <DateControl
                name="issued"
                className="passport-issued"
                {...this.props.Issued}
                minDateEqualTo
                onUpdate={this.updateIssued}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('foreign.passport.expiration')}
              help="foreign.passport.help.expiration"
              adjustFor="labels"
              shrink
              scrollIntoView={this.props.scrollIntoView}
            >
              <DateControl
                name="expiration"
                className="passport-expiration"
                {...this.props.Expiration}
                minDate={this.props.Issued}
                minDateEqualTo
                noMaxDate
                prefix="passportInformation"
                onUpdate={this.updateExpiration}
                onError={this.handleError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('foreign.passport.label.bookNumber')}
              help="foreign.passport.help.number"
              errorPrefix="passport"
              adjustFor="buttons"
              shrink
              scrollIntoView={this.props.scrollIntoView}
            >
              <div>
                <Text
                  name="number"
                  {...this.props.Number}
                  pattern={numberRegEx}
                  maxlength={numberLength}
                  className="number passport-number"
                  ref="number"
                  prefix="passport"
                  onUpdate={this.updateNumber}
                  onError={this.handleError}
                  required={this.props.required}
                />
              </div>
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
  Number: {},
  Card: { value: 'Book' },
  Issued: {},
  Expiration: {},
  Comments: {},
  HasPassports: {},
  suggestedNames: [],
  reBook: '^[a-zA-Z0-9]{9}$',
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'passport',
  dispatch: () => {},
  validator: data => validate(schema('foreign.passport', data)),
}

export default connectForeignSection(Passport, sectionConfig)
