import React from 'react'
import i18n from 'util/i18n'
import { Summary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import { FOREIGN, FOREIGN_ACTIVITIES_INDIRECT } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import IndirectInterest from './IndirectInterest'

const sectionConfig = {
  key: FOREIGN_ACTIVITIES_INDIRECT.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_ACTIVITIES_INDIRECT.name,
  storeKey: FOREIGN_ACTIVITIES_INDIRECT.storeKey,
}

export class IndirectActivity extends Subsection {
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
      HasInterests: this.props.HasInterests,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasInterests = (values) => {
    this.update({
      HasInterests: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const firstname = (o.Firstname || {}).value ? o.Firstname.value : ''
    const lastname = (o.Lastname || {}).value ? o.Lastname.value : ''
    const name = `${firstname} ${lastname}`.trim()
    const interestType = (o.InterestType || {}).value
      ? o.InterestType.value
      : ''
    const cost = (o.Cost || {}).value ? `$${o.Cost.value}` : ''
    const summary = [interestType, name].reduce((prev, next) => {
      if (prev && next) {
        return `${prev} - ${next}`
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.indirect.collection.itemType'),
      index,
      left: summary,
      right: cost,
      placeholder: i18n.t('foreign.activities.indirect.collection.summary'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content indirect"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_ACTIVITIES_INDIRECT.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.activities.indirect')}</h1>
        <Branch
          name="has_interests"
          label={i18n.t('foreign.activities.indirect.heading.title')}
          labelSize="h4"
          {...this.props.HasInterests}
          help="foreign.activities.indirect.help.indirectControl"
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHasInterests}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasInterests.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('foreign.activities.indirect.collection.description')}
            appendTitle={i18n.t('foreign.activities.indirect.collection.appendTitle')}
            appendLabel={i18n.t('foreign.activities.indirect.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <IndirectInterest
              name="Item"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
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

IndirectActivity.defaultProps = {
  name: 'indirect',
  HasInterests: {},
  List: {},
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'activities/indirect',
  addressBooks: {},
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(IndirectActivity, sectionConfig)
