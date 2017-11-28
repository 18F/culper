import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { ForeignBusinessVotingValidator, VotingValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import VotingItem from './VotingItem'

export default class Voting extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignVoting = this.updateHasForeignVoting.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasForeignVoting: this.props.HasForeignVoting,
      ...queue
    })
  }

  updateHasForeignVoting (values) {
    this.update({
      HasForeignVoting: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  summary (item, index) {
    const obj = ((item && item.Item) || {})
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
                labelSize="h2"
                {...this.props.HasForeignVoting}
                warning={true}
                onUpdate={this.updateHasForeignVoting}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasForeignVoting.value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={VotingValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.business.voting.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.voting.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.voting.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <VotingItem name="Item"
                        bind={true}
                        required={this.props.required}
                        scrollIntoView={this.props.scrollIntoView}
                        />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Voting.defaultProps = {
  name: 'Voting',
  HasForeignVoting: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/voting',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('foreign.business.voting', props))
  },
  defaultState: true,
  scrollToBottom: ''
}
