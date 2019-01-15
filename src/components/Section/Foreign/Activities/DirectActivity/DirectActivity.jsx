import React from 'react'
import { i18n } from '../../../../../config'
import schema from '../../../../../schema'
import validate from '../../../../../validators'
import { Summary } from '../../../../Summary'
import { Accordion, Branch, Show } from '../../../../Form'
import {
  ForeignDirectActivityValidator,
  ForeignDirectInterestValidator
} from '../../../../../validators'
import SubsectionElement from '../../../SubsectionElement'
import DirectInterest from './DirectInterest'

export default class DirectActivity extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasInterests = this.updateHasInterests.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HasInterests: this.props.HasInterests,
      List: this.props.List,
      ...queue
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  updateHasInterests(values) {
    this.update({
      HasInterests: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item || {}).Item || {}
    const who = ((o.InterestTypes || {}).values || []).join(', ')
    const interestType = (o.InterestType || {}).value
      ? o.InterestType.value
      : ''
    const cost = (o.Cost || {}).value ? '$' + o.Cost.value : ''
    const summary = [who, interestType].reduce((prev, next) => {
      if (prev && next) {
        return prev + ' - ' + next
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.direct.collection.itemType'),
      index: index,
      left: summary,
      right: cost,
      placeholder: i18n.t('foreign.activities.direct.collection.summary')
    })
  }

  render() {
    return (
      <div
        className="section-content direct"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">Direct control</h1>
        <Branch
          name="has_interests"
          label={i18n.t('foreign.activities.direct.heading.title')}
          labelSize="h4"
          {...this.props.HasInterests}
          help="foreign.activities.direct.help.directControl"
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHasInterests}
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.activities.direct.para.intro')}
        </Branch>

        <Show when={this.props.HasInterests.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ForeignDirectInterestValidator}
            description={i18n.t(
              'foreign.activities.direct.collection.description'
            )}
            appendTitle={i18n.t(
              'foreign.activities.direct.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'foreign.activities.direct.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <DirectInterest
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

DirectActivity.defaultProps = {
  name: 'direct',
  HasInterests: {},
  List: {},
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'foreign',
  subsection: 'activities/direct',
  addressBooks: {},
  dispatch: action => {},
  validator: data => {
    return validate(schema('foreign.activities.direct', data))
  }
}
