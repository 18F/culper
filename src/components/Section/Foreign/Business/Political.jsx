import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import {
  ForeignBusinessPoliticalValidator,
  PoliticalValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import PoliticalItem from './PoliticalItem'

export default class Political extends SubsectionElement {
  constructor(props) {
    super(props)

    this.updateHasForeignPolitical = this.updateHasForeignPolitical.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasForeignPolitical: this.props.HasForeignPolitical,
      ...queue
    })
  }

  updateHasForeignPolitical(values) {
    this.update({
      HasForeignPolitical: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  summary(item, index) {
    const obj = (item && item.Item) || {}
    const dates = DateSummary(obj.Dates)
    const pos = (obj.Position || {}).value || ''
    const country = (obj.Country || {}).value || ''
    const text = country.length ? `${pos} (${country})` : pos

    return Summary({
      type: i18n.t('foreign.business.political.collection.summary.item'),
      index: index,
      left: text,
      right: dates,
      placeholder: i18n.t(
        'foreign.business.political.collection.summary.unknown'
      )
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-business-political"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="has_foreign_political"
          label={i18n.t('foreign.business.political.heading.title')}
          labelSize="h2"
          {...this.props.HasForeignPolitical}
          warning={true}
          onUpdate={this.updateHasForeignPolitical}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasForeignPolitical.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={PoliticalValidator}
            summary={this.summary}
            description={i18n.t(
              'foreign.business.political.collection.summary.title'
            )}
            appendTitle={i18n.t(
              'foreign.business.political.collection.appendTitle'
            )}
            appendLabel={i18n.t('foreign.business.political.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <PoliticalItem
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

Political.defaultProps = {
  name: 'Political',
  HasForeignPolitical: {},
  List: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'foreign',
  subsection: 'business/political',
  dispatch: () => {},
  validator: data => {
    return validate(schema('foreign.business.political', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
