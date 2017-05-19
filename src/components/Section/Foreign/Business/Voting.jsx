import React from 'react'
import { i18n } from '../../../../config'
import { NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessVotingValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateControl } from '../../../Form'

export default class Voting extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      error: props.error,
      valid: props.valid,
      errorCodes: []
    }

    this.updateHasForeignVoting = this.updateHasForeignVoting.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasForeignVoting: this.props.HasForeignVoting
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateHasForeignVoting (values) {
    this.update([
      { name: 'HasForeignVoting', value: values }
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
    return new ForeignBusinessVotingValidator(this.state, this.props).isValid()
  }

  summary (item, index) {
    const obj = item || {}
    const country = (item.Country || {}).value || i18n.t('foreign.business.voting.collection.summary.unknown')
    const date = DateSummary(obj.Date)

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.voting.collection.summary.item')} {index + 1}:</span>
        <span><strong>{country}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-voting">
        <Branch name="has_foreign_voting"
                label={i18n.t('foreign.business.voting.heading.title')}
                labelSize="h3"
                help="foreign.business.voting.help.branch"
                value={this.props.HasForeignVoting}
                onUpdate={this.updateHasForeignVoting}
                onValidate={this.handleValidation}>
        </Branch>

        <Show when={this.props.HasForeignVoting === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.business.voting.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.voting.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.voting.collection.append')}>
            <Field title={i18n.t('foreign.business.voting.heading.date')}
                   help="foreign.business.voting.help.date"
                   adjustFor="datecontrol">
              <DateControl name="Date"
                           className="foreign-business-voting-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.voting.heading.country')}
                   help="foreign.business.voting.help.country"
                   adjustFor="country">
              <Country name="Country"
                       className="foreign-business-voting-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.voting.heading.reason')}
                   help="foreign.business.voting.help.reason"
                   adjustFor="textarea">
              <Textarea name="Reason"
                        className="foreign-business-voting-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.voting.heading.eligibility')}
                   help="foreign.business.voting.help.eligibility"
                   adjustFor="text">
              <Text name="Eligibility"
                    className="foreign-business-voting-eligibility"
                    bind={true}
                    />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Voting.defaultProps = {
  name: 'Voting',
  HasForeignVoting: '',
  List: [],
  ListBranch: '',
  error: false,
  valid: false
}
