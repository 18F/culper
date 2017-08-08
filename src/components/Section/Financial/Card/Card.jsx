import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { CardAbuseValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, DateControl, Currency, Field,
         Location, Checkbox, Text, Textarea } from '../../../Form'

export default class Card extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCardAbuse: props.HasCardAbuse,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasCardAbuse: val }, () => {
      this.updateList({
        items: val === 'Yes' ? this.state.List : [],
        branch: ''
      })
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
    const date = (obj.Date || {})
    const from = DateSummary({date: date})
    const agency = (obj.Agency || {}).value || ''

    return Summary({
      type: i18n.t('financial.card.collection.summary.item'),
      index: index,
      left: agency,
      right: from,
      placeholder: i18n.m('financial.card.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="card-abuse">
        <Branch name="has_cardabuse"
                className="card-branch"
                value={this.state.HasCardAbuse}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasCardAbuse === 'Yes'}>
          <Accordion items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.card.collection.summary.title')}
                     appendTitle={i18n.t('financial.card.collection.appendTitle')}
                     appendLabel={i18n.t('financial.card.collection.append')}>

           <Field title={i18n.t('financial.card.heading.agency')}
               scrollIntoView={this.props.scrollIntoView}>
              <Text name="Agency"
                    className="card-agency"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('financial.card.heading.address')}
                   help="financial.card.help.address"
                   scrollIntoView={this.props.scrollIntoView}
                   adjustFor="address">
              <Location name="Address"
                        className="card-address"
                        layout={Location.ADDRESS}
                        geocode={true}
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('financial.card.heading.date')}
                   adjustFor="labels"
                   scrollIntoView={this.props.scrollIntoView}
                   shrink={true}>
              <DateControl name="Date"
                           className="card-date"
                           hideDay={true}
                           bind={true}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('financial.card.heading.reason')}
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Reason"
                        className="card-reason"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('financial.card.heading.amount')}
              scrollIntoView={this.props.scrollIntoView}>
              <div>
                <Currency name="Amount"
                          className="card-amount"
                          placeholder={i18n.t('financial.card.placeholder.amount')}
                          min="1"
                          bind={true}
                          required={this.props.required}
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
                   scrollIntoView={this.props.scrollIntoView}
                   help="financial.card.help.description">
              <Textarea name="Description"
                        className="card-description"
                        bind={true}
                        required={this.props.required}
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
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'card',
  dispatch: () => {},
  validator: (state, props) => {
    return new CardAbuseValidator(state, props).isValid()
  },
  defaultState: true
}
