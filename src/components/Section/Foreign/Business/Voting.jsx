import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignBusinessVotingValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateControl } from '../../../Form'

export default class Voting extends SubsectionElement {
  constructor (props) {
    super(props)

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

  summary (item, index) {
    const obj = item || {}
    const country = (obj.Country || {}).value || i18n.t('foreign.business.voting.collection.summary.unknown')
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
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.HasForeignVoting === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
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
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/voting',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessVotingValidator(state, props).isValid()
  },
  defaultState: true
}
