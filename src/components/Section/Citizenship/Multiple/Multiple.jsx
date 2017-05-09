import React from 'react'
import { i18n } from '../../../../config'
import { CitizenshipMultipleValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, BranchCollection } from '../../../Form'
import { DateSummary } from '../../../Summary'
import CitizenshipItem from './CitizenshipItem'
import PassportItem from './PassportItem'

/**
 * Convenience function to send updates along their merry way
 */
export const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Multiple extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasMultiple: props.HasMultiple,
      Citizenships: props.Citizenships,
      Passports: props.Passports,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateHasMultiple = this.updateHasMultiple.bind(this)
    this.updateCitizenships = this.updateCitizenships.bind(this)
    this.updatePassports = this.updatePassports.bind(this)
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
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new CitizenshipMultipleValidator(this.state, null).isValid()
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateHasMultiple (values) {
    this.onUpdate('HasMultiple', values)
  }

  updateCitizenships (values) {
    this.onUpdate('Citizenships', values)
  }

  updatePassports (values) {
    this.onUpdate('Passports', values)
  }

  summaryCitizenships (item, index) {
    const itemProperties = (item || {}).Item || {}
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : i18n.t('citizenship.multiple.collection.citizenship.summary.unknown')
    const dates = DateSummary(itemProperties.Dates)

    return (
      <span>
        <span className="index">{i18n.t('citizenship.multiple.collection.citizenship.summary.item')} {index + 1}:</span>
        <span><strong>{country}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  summaryPassports (item, index) {
    const itemProperties = (item || {}).Item || {}
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : i18n.t('citizenship.multiple.collection.passport.summary.unknown')
    const dates = DateSummary(itemProperties.Issued)

    return (
      <span>
        <span className="index">{i18n.t('citizenship.multiple.collection.passport.summary.item')} {index + 1}:</span>
        <span><strong>{country}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="multiple">
        <Branch name="has_multiple"
                label={i18n.t('citizenship.multiple.heading.hasmultiple')}
                labelSize="h3"
                className="has-multiple"
                value={this.state.HasMultiple}
                help="citizenship.multiple.help.hasmultiple"
                onUpdate={this.updateHasMultiple}
                onValidate={this.handleValidation}
                />

        <Show when={this.state.HasMultiple === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.Citizenships}
                     onUpdate={this.updateCitizenships}
                     onValidate={this.handleValidation}
                     summary={this.summaryCitizenships}
                     description={i18n.t('citizenship.multiple.collection.citizenship.summary.title')}
                     appendTitle={i18n.t('citizenship.multiple.collection.citizenship.appendTitle')}
                     appendMessage={i18n.m('citizenship.multiple.collection.citizenship.appendMessage')}
                     appendLabel={i18n.t('citizenship.multiple.collection.citizenship.append')}>
            <CitizenshipItem name="Item" bind={true} />
          </Accordion>
        </Show>

        <BranchCollection label={i18n.t('citizenship.multiple.heading.hasforeignpassport')}
                          appendLabel={i18n.t('citizenship.multiple.collection.passport.appendTitle')}
                          help="citizenship.multiple.help.hasforeignpassport"
                          className="has-foreignpassport"
                          items={this.state.Passports}
                          onUpdate={this.updatePassports}
                          onValidate={this.handleValidation}>
          <PassportItem name="Item" bind={true} />
        </BranchCollection>
      </div>
    )
  }
}

Multiple.defaultProps = {
  HasMultiple: '',
  Citizenships: [],
  Passports: []
}
