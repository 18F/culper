import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { HistoryValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import HistoryItem from './HistoryItem'

export default class History extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasHistory: this.props.HasHistory,
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
      HasHistory: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Granted)
    const agency = (o.Agency || {}).Agency || ''

    return Summary({
      type: i18n.t('legal.investigations.history.collection.item'),
      index: index,
      left: agency,
      right: dates,
      placeholder: i18n.t('legal.investigations.history.collection.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content investigations-history"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.investigations.history')}</h1>
        <Branch
          name="has_history"
          label={i18n.t('legal.investigations.history.heading.title')}
          labelSize="h4"
          className="legal-investigations-history-has-history"
          {...this.props.HasHistory}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasHistory.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={HistoryValidator}
            description={i18n.t(
              'legal.investigations.history.collection.description'
            )}
            appendTitle={i18n.t(
              'legal.investigations.history.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'legal.investigations.history.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <HistoryItem
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

History.defaultProps = {
  name: 'history',
  HasHistory: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'investigations/history',
  dispatch: () => {},
  validator: data => {
    return validate(schema('legal.investigations.history', data))
  },
  scrollToBottom: ''
}
