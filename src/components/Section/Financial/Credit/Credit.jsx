import React from 'react'
import { i18n } from '../../../../config'
import { Summary } from '../../../Summary'
import { CreditValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Telephone, Text, Textarea, Location } from '../../../Form'

export default class Credit extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCreditCounseling: props.HasCreditCounseling,
      List: props.List,
      ListBranch: props.ListBranch,
      errorCodes: []
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasCreditCounseling: val }, () => {
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
          HasCreditCounseling: this.state.HasCreditCounseling
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item || {})
    const name = (obj.Name || {}).value || ''

    return Summary({
      type: i18n.t('financial.credit.collection.summary.item'),
      index: index,
      left: name,
      right: null,
      placeholder: i18n.m('financial.credit.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="credit-counseling">
        <Branch name="has_credit"
                className="credit-branch"
                value={this.state.HasCreditCounseling}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasCreditCounseling === 'Yes'}>
          <Accordion items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.credit.collection.summary.title')}
                     appendTitle={i18n.t('financial.credit.collection.appendTitle')}
                     appendLabel={i18n.t('financial.credit.collection.append')}>

            <Field title={i18n.t('financial.credit.heading.explanation')}
                   scrollIntoView={this.props.scrollIntoView}
                   help="financial.credit.help.explanation">
              <Textarea name="Explanation"
                        className="credit-explanation"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('financial.credit.heading.name')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="Name"
                    className="credit-name"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('financial.credit.heading.telephone')}
                   help="financial.credit.help.telephone"
                   scrollIntoView={this.props.scrollIntoView}
                   adjustFor="telephone">
              <Telephone name="Telephone"
                         className="credit-telephone"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('financial.credit.heading.address')}
                   help="financial.credit.help.address"
                   scrollIntoView={this.props.scrollIntoView}
                   adjustFor="label">
              <Location name="Location"
                          layout={Location.CITY_STATE}
                          className="credit-location"
                          bind={true}
                          help=""
                          statePlaceholder={i18n.t('financial.credit.placeholder.state')}
                          cityPlaceholder={i18n.t('financial.credit.placeholder.city')}
                          required={this.props.required}
                          scrollIntoView={this.props.scrollIntoView}
                          />
            </Field>

            <Field title={i18n.t('financial.credit.heading.description')}
                   scrollIntoView={this.props.scrollIntoView}
                   help="financial.credit.help.description">
              <Textarea name="Description"
                        className="credit-description"
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

Credit.defaultProps = {
  HasCreditCounseling: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'credit',
  dispatch: () => {},
  validator: (state, props) => {
    return new CreditValidator(state, props).isValid()
  },
  defaultState: true
}
