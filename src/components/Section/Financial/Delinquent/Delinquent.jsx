import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { DelinquentValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, DateControl, Currency, Field,
         NotApplicable, Location, Checkbox, Text, Textarea } from '../../../Form'
import Infractions from './Infractions'

export default class Delinquent extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasDelinquent: props.HasDelinquent,
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
    this.setState({ HasDelinquent: val }, () => {
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
          HasDelinquent: this.state.HasDelinquent
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
    const name = (obj.Name || {}).value || ''
    const amount = (obj.Amount || {}).value || ''
    const text = `${name}${amount ? ', $' + amount : ''}`.trim()

    return Summary({
      type: i18n.t('financial.delinquent.collection.summary.item'),
      index: index,
      left: text,
      right: from,
      placeholder: i18n.m('financial.delinquent.collection.summary.unknown')
    })
  }

  message () {
    return (
      <div>
        <ul>
          <li>{i18n.m('financial.delinquent.para.alimony')}</li>
          <li>{i18n.m('financial.delinquent.para.judgement')}</li>
          <li>{i18n.m('financial.delinquent.para.lien')}</li>
          <li>{i18n.m('financial.delinquent.para.federal')}</li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div className="delinquent">
        <Branch name="has_delinquent"
                className="delinquent-branch eapp-field-wrap"
                value={this.state.HasDelinquent}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasDelinquent === 'Yes'}>
          <Accordion items={this.state.List}
                     branch={this.state.ListBranch}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.delinquent.collection.summary.title')}
                     appendTitle={i18n.t('financial.delinquent.collection.appendTitle')}
                     appendMessage={this.message()}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     appendLabel={i18n.t('financial.delinquent.collection.append')}>

           <Field title={i18n.t('financial.delinquent.heading.name')}
             scrollIntoView={this.props.scrollIntoView}>
              <Text name="Name"
                    className="delinquent-name"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.infractions')}
              scrollIntoView={this.props.scrollIntoView}>
              <Infractions name="Infractions"
                           className="delinquent-infractions"
                           bind={true}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.accountnumber')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="AccountNumber"
                    className="delinquent-accountnumber"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.propertytype')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="PropertyType"
                    className="delinquent-propertytype"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.amount')}
              scrollIntoView={this.props.scrollIntoView}>
              <div>
                <Currency name="Amount"
                          className="delinquent-amount"
                          placeholder={i18n.t('financial.delinquent.placeholder.amount')}
                          min="1"
                          bind={true}
                          required={this.props.required}
                          />
                <div className="flags">
                  <Checkbox name="AmountEstimated"
                            ref="estimated"
                            label={i18n.t('financial.delinquent.label.estimated')}
                            toggle="false"
                            bind={true}
                            />
                </div>
              </div>
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.reason')}
                   scrollIntoView={this.props.scrollIntoView}
                   help="financial.delinquent.help.reason">
              <Textarea name="Reason"
                        className="delinquent-reason"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.status')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="Status"
                    className="delinquent-status"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.date')}
                   adjustFor="labels"
                   scrollIntoView={this.props.scrollIntoView}
                   shrink={true}>
              <DateControl name="Date"
                           className="delinquent-date"
                           hideDay={true}
                           bind={true}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.resolved')}
                   adjustFor="label"
                   scrollIntoView={this.props.scrollIntoView}
                   shrink={true}>
              <NotApplicable name="ResolvedNotApplicable"
                             label={i18n.t('financial.delinquent.label.notresolved')}
                             or={i18n.m('financial.delinquent.para.or')}
                             bind={true}>
                <DateControl name="Resolved"
                             className="delinquent-resolved"
                             hideDay={true}
                             bind={true}
                             required={this.props.required}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.courtname')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="CourtName"
                    className="delinquent-courtname"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.courtaddress')}
                   help="financial.delinquent.help.courtaddress"
                   scrollIntoView={this.props.scrollIntoView}
                   adjustFor="address">
              <Location name="CourtAddress"
                        layout={Location.ADDRESS}
                        geocode={true}
                        className="delinquent-courtaddress"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('financial.delinquent.heading.description')}
                   scrollIntoView={this.props.scrollIntoView}
                   help="financial.delinquent.help.description">
              <Textarea name="Description"
                        className="delinquent-description"
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

Delinquent.defaultProps = {
  HasDelinquent: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'delinquent',
  dispatch: () => {},
  validator: (state, props) => {
    return new DelinquentValidator(state, props).isValid()
  },
  defaultState: true
}
