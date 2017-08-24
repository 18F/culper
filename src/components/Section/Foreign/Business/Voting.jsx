import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
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
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignVoting: this.props.HasForeignVoting,
      ...queue
    })
  }

  updateHasForeignVoting (values) {
    this.update({
      HasForeignVoting: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = item || {}
    const date = DateSummary(obj.Date)
    const country = (obj.Country || {}).value || ''

    return Summary({
      type: i18n.t('foreign.business.voting.collection.summary.item'),
      index: index,
      left: country,
      right: date,
      placeholder: i18n.m('foreign.business.voting.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-voting">
        <Branch name="has_foreign_voting"
                label={i18n.t('foreign.business.voting.heading.title')}
                labelSize="h3"
                value={this.props.HasForeignVoting}
                warning={true}
                onUpdate={this.updateHasForeignVoting}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasForeignVoting === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.voting.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.voting.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.voting.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Field title={i18n.t('foreign.business.voting.heading.date')}
                   help="foreign.business.voting.help.date"
                   adjustFor="datecontrol"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateControl name="Date"
                           className="foreign-business-voting-date"
                           bind={true}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.voting.heading.country')}
                adjustFor="country"
                scrollIntoView={this.props.scrollIntoView}>
              <Country name="Country"
                       className="foreign-business-voting-country"
                       bind={true}
                       required={this.props.required}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.voting.heading.reason')}
              adjustFor="textarea"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Reason"
                        className="foreign-business-voting-reason"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.voting.heading.eligibility')}
              adjustFor="text"
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="Eligibility"
                    className="foreign-business-voting-eligibility"
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

Voting.defaultProps = {
  name: 'Voting',
  HasForeignVoting: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/voting',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessVotingValidator(state, props).isValid()
  },
  defaultState: true,
  scrollToBottom: ''
}
