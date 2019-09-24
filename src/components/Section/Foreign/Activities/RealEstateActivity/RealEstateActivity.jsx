import React from 'react'
import i18n from 'util/i18n'
import { Summary, AddressSummary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import { FOREIGN, FOREIGN_ACTIVITIES_REAL_ESTATE } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import RealEstateInterest from './RealEstateInterest'

const sectionConfig = {
  key: FOREIGN_ACTIVITIES_REAL_ESTATE.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_ACTIVITIES_REAL_ESTATE.name,
  storeKey: FOREIGN_ACTIVITIES_REAL_ESTATE.storeKey,
}
export class RealEstateActivity extends Subsection {
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
    const who = ((o.InterestTypes || {}).values || []).join(', ')
    const acquired = DateSummary(o.Acquired)
    const address = AddressSummary(o.Address, '')
    const summary = [who, address].reduce((prev, next) => {
      if (prev && next) {
        return (
          <span>
            {`${prev} - ${next}`}
          </span>
        )
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.realestate.collection.itemType'),
      index,
      left: who || address ? summary : '',
      right: acquired,
      placeholder: i18n.t('foreign.activities.realestate.collection.summary'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content realestate"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_ACTIVITIES_REAL_ESTATE.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.activities.realestate')}</h1>
        <Branch
          name="has_interests"
          label={i18n.t('foreign.activities.realestate.heading.title')}
          labelSize="h4"
          {...this.props.HasInterests}
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
            description={i18n.t('foreign.activities.realestate.collection.description')}
            appendTitle={i18n.t('foreign.activities.realestate.collection.appendTitle')}
            appendLabel={i18n.t('foreign.activities.realestate.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <RealEstateInterest
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

RealEstateActivity.defaultProps = {
  name: 'realestate',
  HasInterests: {},
  List: {},
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'activities/realestate',
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(RealEstateActivity, sectionConfig)
