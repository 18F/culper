import React from 'react'
import { i18n } from '../../../../config'
import { NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessPoliticalValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateControl, Address, Name,
         BirthPlace, DateRange, NotApplicable } from '../../../Form'

export default class Political extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      error: props.error,
      valid: props.valid,
      errorCodes: []
    }

    this.updateHasForeignPolitical = this.updateHasForeignPolitical.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasForeignPolitical: this.props.HasForeignPolitical
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateHasForeignPolitical (values) {
    this.update([
      { name: 'HasForeignPolitical', value: values }
    ])
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
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

  isValid () {
    return new ForeignBusinessPoliticalValidator(this.state, this.props).isValid()
  }

  summary (item, index) {
    const obj = item || {}
    const pos = (item.Position || {}).value || i18n.t('foreign.business.political.collection.summary.unknown')
    const country = (item.Country || {}).value || ''
    const dates = DateSummary(obj.Dates)
    const text = country.length ? `${pos} (${country})` : pos

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.political.collection.summary.item')} {index + 1}:</span>
        <span><strong>{text}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-political">
        <Branch name="has_foreign_political"
                label={i18n.t('foreign.business.political.heading.title')}
                labelSize="h3"
                help="foreign.business.political.help.branch"
                value={this.props.HasForeignPolitical}
                onUpdate={this.updateHasForeignPolitical}
                onValidate={this.handleValidation}>
        </Branch>

        <Show when={this.props.HasForeignPolitical === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.business.political.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.political.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.political.collection.append')}>
            <Field title={i18n.t('foreign.business.political.heading.position')}
                   help="foreign.business.political.help.position"
                   adjustFor="text">
              <Text name="Position"
                    className="foreign-business-political-position"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.dates')}
                   help="foreign.business.political.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="foreign-business-political-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.country')}
                   help="foreign.business.political.help.country"
                   adjustFor="country">
              <Country name="Country"
                       className="foreign-business-political-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.reason')}
                   help="foreign.business.political.help.reason"
                   adjustFor="textarea">
              <Textarea name="Reason"
                        className="foreign-business-political-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.eligibility')}
                   help="foreign.business.political.help.eligibility"
                   adjustFor="text">
              <Text name="Eligibility"
                    className="foreign-business-political-eligibility"
                    bind={true}
                    />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Political.defaultProps = {
  name: 'Political',
  HasForeignPolitical: '',
  List: [],
  ListBranch: '',
  error: false,
  valid: false
}
