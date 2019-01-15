import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary, NameSummary } from '../../../Summary'
import {
  ForeignActivitiesSupportValidator,
  SupportValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import SupportItem from './SupportItem'

export default class Support extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasForeignSupport = this.updateHasForeignSupport.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HasForeignSupport: this.props.HasForeignSupport,
      List: this.props.List,
      ...queue
    })
  }

  updateHasForeignSupport(values) {
    this.update({
      HasForeignSupport: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  summary(item, index) {
    const o = (item || {}).Item || {}
    const name = NameSummary(o.Name)
    return Summary({
      type: i18n.t('foreign.activities.support.collection.summary.item'),
      index: index,
      left: name,
      placeholder: i18n.t(
        'foreign.activities.support.collection.summary.unknown'
      )
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-activities-support"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('foreign.destination.activities.support')}</h1>
        <Branch
          name="has_foreign_support"
          label={i18n.t('foreign.activities.support.heading.title')}
          labelSize="h4"
          {...this.props.HasForeignSupport}
          warning={true}
          onUpdate={this.updateHasForeignSupport}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasForeignSupport.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={SupportValidator}
            summary={this.summary}
            description={i18n.t(
              'foreign.activities.support.collection.summary.title'
            )}
            appendTitle={i18n.t(
              'foreign.activities.support.collection.appendTitle'
            )}
            appendLabel={i18n.t('foreign.activities.support.collection.append')}
            required={this.props.required}
            scrollToBottom={this.props.scrollToBottom}
            scrollIntoView={this.props.scrollIntoView}>
            <SupportItem
              name="Item"
              bind={true}
              dispatch={this.props.dispatch}
              addressBooks={this.props.addressBooks}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Support.defaultProps = {
  name: 'Support',
  HasForeignSupport: {},
  List: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'foreign',
  subsection: 'activities/support',
  addressBooks: {},
  dispatch: () => {},
  validator: data => {
    return validate(schema('foreign.activities.support', data))
  },
  defaultState: true
}
