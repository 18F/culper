import React from 'react'
import { i18n } from 'config'
import { Summary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_VOTING } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import VotingItem from './VotingItem'

const sectionConfig = {
  key: FOREIGN_BUSINESS_VOTING.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_VOTING.name,
  storeKey: FOREIGN_BUSINESS_VOTING.storeKey,
}

export class Voting extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      HasForeignVoting: this.props.HasForeignVoting,
      ...queue,
    })
  }

  updateHasForeignVoting = (values) => {
    this.update({
      HasForeignVoting: values,
      List: values.value === 'Yes'
        ? this.props.List
        : { items: [], branch: {} },
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const obj = (item && item.Item) || {}
    const date = DateSummary(obj.Date)
    const country = (obj.Country || {}).value || ''

    return Summary({
      type: i18n.t('foreign.business.voting.collection.summary.item'),
      index,
      left: country,
      right: date,
      placeholder: i18n.t('foreign.business.voting.collection.summary.unknown'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content foreign-business-voting"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_BUSINESS_VOTING.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.voting')}</h1>
        <Branch
          name="has_foreign_voting"
          label={i18n.t('foreign.business.voting.heading.title')}
          labelSize="h4"
          {...this.props.HasForeignVoting}
          warning={true}
          onUpdate={this.updateHasForeignVoting}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasForeignVoting.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            summary={this.summary}
            description={i18n.t('foreign.business.voting.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.voting.collection.appendTitle')}
            appendLabel={i18n.t('foreign.business.voting.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <VotingItem
              name="Item"
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
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/voting',
  dispatch: () => {},
  defaultState: true,
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(Voting, sectionConfig)
