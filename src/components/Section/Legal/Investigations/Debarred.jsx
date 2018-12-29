import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { DebarredValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import DebarredItem from './DebarredItem'

export default class Debarred extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasDebarment: this.props.HasDebarment,
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
      HasDebarment: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Date)
    const agency = (o.Agency || {}).value || ''

    return Summary({
      type: i18n.t('legal.investigations.debarred.collection.item'),
      index: index,
      left: agency,
      right: dates,
      placeholder: i18n.t('legal.investigations.debarred.collection.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content investigations-debarred"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.investigations.debarred')}</h1>
        <Branch
          name="has_debarred"
          label={i18n.t('legal.investigations.debarred.heading.title')}
          labelSize="h4"
          className="legal-investigations-debarred-has-debarment"
          {...this.props.HasDebarment}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasDebarment.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={DebarredValidator}
            description={i18n.t(
              'legal.investigations.debarred.collection.description'
            )}
            appendTitle={i18n.t(
              'legal.investigations.debarred.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'legal.investigations.debarred.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <DebarredItem
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

Debarred.defaultProps = {
  name: 'debarred',
  HasDebarment: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'investigations/debarred',
  dispatch: () => {},
  validator: data => {
    return validate(schema('legal.investigations.debarred', data))
  },
  scrollToBottom: ''
}
