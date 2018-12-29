import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { EngagedValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import EngagedInTerrorismItem from './EngagedInTerrorismItem'

export default class EngagedInTerrorism extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasEngaged: this.props.HasEngaged,
      ...queue
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  updateBranch(values) {
    this.update({
      HasEngaged: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.engaged.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.engaged.collection.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-engaged"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.associations.engaged')}</h1>
        <Branch
          name="has_engaged"
          label={i18n.t('legal.associations.engaged.heading.title')}
          labelSize="h4"
          className="legal-associations-engaged-has-engaged"
          {...this.props.HasEngaged}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasEngaged.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={EngagedValidator}
            description={i18n.t(
              'legal.associations.engaged.collection.description'
            )}
            appendTitle={i18n.t(
              'legal.associations.engaged.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'legal.associations.engaged.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <EngagedInTerrorismItem
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

EngagedInTerrorism.defaultProps = {
  name: 'engaged',
  HasEngaged: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'associations/engaged-in-terrorism',
  dispatch: () => {},
  validator: data => {
    return validate(schema('legal.associations.engaged-in-terrorism', data))
  },
  scrollToBottom: ''
}
