import React from 'react'
import { i18n } from '../../../../config'
import { GamblingValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, DateRange, Currency, Textarea, Field } from '../../../Form'

export default class Gambling extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      HasGamblingDebt: props.HasGamblingDebt,
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
    return new GamblingValidator(this.state, null).isValid()
  }

  /**
   * Updates triggered by the branching component.
   */
  onUpdate (val, event) {
    this.setState({ HasGamblingDebt: val }, () => {
      this.myDispatch(val === 'No' ? [] : this.state.List)
      this.handleValidation(event, null, null)
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
          HasGamblingDebt: this.state.HasGamblingDebt
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
    let losses = i18n.t('financial.gambling.collection.summary.unknownlosses')
    if (item.Losses && item.Losses.value) {
      losses = '$' + this.fancyNumber(item.Losses.value)
    }

    let from = ''
    if (item.Dates && item.Dates.from && item.Dates.from.date) {
      from = '' + item.Dates.from.date.getFullYear()
    }

    let to = ''
    if (item.Dates && item.Dates.to && item.Dates.to.date) {
      to = '' + item.Dates.to.date.getFullYear()
    } else if (item.Dates && item.Dates.present) {
      to = i18n.t('financial.gambling.collection.summary.present')
    }

    const dates = from === '' && to === ''
          ? i18n.t('financial.gambling.collection.summary.nodates')
          : `${from} - ${to}`

    return (
      <span>
        <span className="index">{i18n.t('financial.gambling.collection.summary.debt')} {index + 1}:</span>
        <span className="losses"><strong>{losses}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="gambling">
        <Branch name="has_gamblingdebt"
                value={this.state.HasGamblingDebt}
                help="financial.gambling.branch.help"
                onUpdate={this.onUpdate.bind(this)}>
        </Branch>
        <Show when={this.state.HasGamblingDebt === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.myDispatch}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('financial.gambling.collection.summary.title')}
                     appendLabel={i18n.t('financial.gambling.collection.append')}>

            <h3>{i18n.t('financial.gambling.heading.details')}</h3>

            <Field title={i18n.t('financial.gambling.heading.dates')}
                   titleSize="h4"
                   help="financial.gambling.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         label={i18n.t('financial.gambling.label.dates')}
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('financial.gambling.heading.losses')}
                   titleSize="h4"
                   help="financial.gambling.help.losses">
              <Currency name="Losses"
                        className="losses"
                        placeholder={i18n.t('financial.gambling.placeholder.losses')}
                        min="1"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.gambling.heading.description')}
                   titleSize="h4"
                   help="financial.gambling.help.description">
              <Textarea name="Description"
                        className="description"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.gambling.heading.actions')}
                   titleSize="h4"
                   help="financial.gambling.help.actions">
              <Textarea name="Actions"
                        className="actions"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}
