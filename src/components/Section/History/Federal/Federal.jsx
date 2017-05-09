import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Accordion, Field, DateRange, Text, Address } from '../../../Form'
import { DateSummary } from '../../../Summary'
import { FederalServiceValidator } from '../../../../validators'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Federal extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasFederalService: props.HasFederalService,
      List: props.List || [],
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
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
    return new FederalServiceValidator(this.state, null).isValid()
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateBranch (value, event) {
    this.onUpdate('HasFederalService', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('List', [])
    }

    // Force validation checks
    this.handleValidation(event, null, null)
  }

  updateCollection (collection) {
    this.onUpdate('List', collection)
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const agency = item && item.Name && item.Name.value
          ? item.Name.value
      : i18n.t('history.federal.collection.summary.unknown')
    const dates = DateSummary(item.Dates)

    return (
      <span>
        <span className="index">{i18n.t('history.federal.collection.summary.item')} {index + 1}:</span>
        <span className=""><strong>{agency}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="federal">
        <h3>{i18n.t('history.federal.heading.branch')}</h3>
        <Branch name="has_federalservice"
                value={this.state.HasFederalService}
                help="history.federal.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasFederalService === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateCollection}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('history.federal.collection.summary.title')}
                     appendLabel={i18n.t('history.federal.collection.append')}>
            <Field title={i18n.t('history.federal.heading.dates')}
                   help="history.federal.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('history.federal.heading.name')}
                   help="history.federal.help.name">
              <Text name="Name"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.position')}
                   help="history.federal.help.position">
              <Text name="Position"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.address')}
                   help="history.federal.help.address"
                   adjustFor="address">
              <Address name="Address"
                       bind={true}
                       />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}
