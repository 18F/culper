import React from 'react'
import { i18n } from '../../../../config'
import { CardAbuseValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, DateControl, Currency, Field,
         Address, Checkbox, Text, Textarea } from '../../../Form'

export default class Card extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasCardAbuse: props.HasCardAbuse,
      List: props.List,
      ListBranch: props.ListBranch,
      errorCodes: []
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
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
    return new CardAbuseValidator(this.state, null).isValid()
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasCardAbuse: val }, () => {
      this.updateList({
        items: val === 'No' ? [] : this.state.List,
        branch: ''
      })
      this.handleValidation(event, null, null)
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList (values) {
    this.setState({ List: values.items, ListBranch: values.branch }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          ListBranch: this.state.ListBranch,
          HasCardAbuse: this.state.HasCardAbuse
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item || {})
    const agency = (obj.Agency || {}).value || i18n.t('financial.card.collection.summary.unknown')
    const date = (obj.Date || {})

    let from = ''
    if (date.month && date.year) {
      from = '' + date.month + '/' + date.year
    }

    return (
      <span>
        <span className="index">{i18n.t('financial.card.collection.summary.item')} {index + 1}:</span>
        <span><strong>{agency}</strong></span>
        <span className="dates"><strong>{from}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="card-abuse">
        <Branch name="has_cardabuse"
                className="card-branch"
                value={this.state.HasCardAbuse}
                help="financial.card.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasCardAbuse === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('financial.card.collection.summary.title')}
                     appendTitle={i18n.t('financial.card.collection.appendTitle')}
                     appendLabel={i18n.t('financial.card.collection.append')}>

            <Field title={i18n.t('financial.card.heading.agency')}
                   help="financial.card.help.agency">
              <Text name="Agency"
                    className="card-agency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.card.heading.address')}
                   help="financial.card.help.address"
                   adjustFor="address">
              <Address name="Address"
                       className="card-address"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('financial.card.heading.date')}
                   help="financial.card.help.date"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="Date"
                           className="card-date"
                           hideDay={true}
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('financial.card.heading.reason')}
                   help="financial.card.help.reason">
              <Textarea name="Reason"
                        className="card-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.card.heading.amount')}
                   help="financial.card.help.amount">
              <div>
                <Currency name="Amount"
                          className="card-amount"
                          placeholder={i18n.t('financial.card.placeholder.amount')}
                          min="1"
                          bind={true}
                          />
                <div className="flags">
                  <Checkbox name="AmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.card.label.estimated')}
                            toggle="false"
                            bind={true}
                            />
                </div>
              </div>
            </Field>

            <Field title={i18n.t('financial.card.heading.description')}
                   help="financial.card.help.description">
              <Textarea name="Description"
                        className="card-description"
                        bind={true}
                        />
            </Field>

          </Accordion>
        </Show>
      </div>
    )
  }
}

Card.defaultProps = {
  HasCardAbuse: '',
  List: [],
  ListBranch: ''
}
