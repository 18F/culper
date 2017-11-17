import React from 'react'
import { i18n } from '../../../../../config'
import schema from '../../../../../schema'
import validate from '../../../../../validators'
import { Summary, AddressSummary, DateSummary } from '../../../../Summary'
import { Accordion, Branch, Show } from '../../../../Form'
import { ForeignRealEstateActivityValidator, ForeignRealEstateInterestValidator } from '../../../../../validators'
import SubsectionElement from '../../../SubsectionElement'
import RealEstateInterest from './RealEstateInterest'

export default class RealEstateActivity extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasInterests = this.updateHasInterests.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasInterests: this.props.HasInterests,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateHasInterests (values) {
    this.update({
      HasInterests: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const who = ((o.InterestTypes || {}).values || []).join(', ')
    const acquired = DateSummary(o.Acquired)
    const address = AddressSummary(o.Address, '')
    const summary = [who, address].reduce((prev, next) => {
      if (prev && next) {
        return <span>{prev} - {next}</span>
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.realestate.collection.itemType'),
      index: index,
      left: who || address ? summary : '',
      right: acquired,
      placeholder: i18n.m('foreign.activities.realestate.collection.summary')
    })
  }

  render () {
    return (
      <div className="realestate">
        <Branch name="has_interests"
                label={i18n.t('foreign.activities.realestate.heading.title')}
                labelSize="h2"
                {...this.props.HasInterests}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasInterests}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasInterests.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ForeignRealEstateInterestValidator}
                     description={i18n.t('foreign.activities.realestate.collection.description')}
                     appendTitle={i18n.t('foreign.activities.realestate.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.realestate.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <RealEstateInterest name="Item"
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/realestate',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('foreign.activities.realestate', props))
  },
  scrollToBottom: ''
}
