import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { DomesticViolenceItem } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import DomesticViolence from './DomesticViolence'

export default class DomesticViolenceList extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HasDomesticViolence: this.props.HasDomesticViolence,
      List: this.props.List,
      ...queue
    })
  }

  updateBranch(values) {
    this.update({
      HasDomesticViolence: values,
      List: values.value === 'No' ? Accordion.defaultList : this.props.List
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  summary(item, index) {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Issued)
    const description =
      o.Explanation && o.Explanation.value ? o.Explanation.value : ''

    return Summary({
      type: i18n.t('legal.police.collection.summary.item'),
      index: index,
      left: description,
      right: dates,
      placeholder: i18n.t('legal.police.collection.summary.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content domestic-violence-list"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">Domestic violence</h1>
        <Branch
          name="has_domestic_violence"
          label={i18n.t('legal.police.label.domesticViolence')}
          labelSize="h4"
          className="has-domestic-violence"
          {...this.props.HasDomesticViolence}
          warning={true}
          onUpdate={this.updateBranch}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />
        <Show when={(this.props.HasDomesticViolence || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            label={i18n.t('legal.police.label.domesticViolence')}
            labelSize="h2"
            className="has-order"
            summary={this.summary}
            appendTitle={i18n.t('legal.police.label.domesticViolenceAppend')}
            onError={this.handleError}
            onUpdate={this.updateList}
            validator={DomesticViolenceItem}
            required={this.props.required}
            scrollToBottom={this.props.scrollToBottom}
            scrollIntoView={this.props.scrollIntoView}>
            <DomesticViolence
              name="Item"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              bind={true}
              onError={this.handleError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DomesticViolenceList.defaultProps = {
  HasDomesticViolence: {},
  List: Accordion.defaultList,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'police/domesticviolence',
  addressBooks: {},
  dispatch: action => {},
  validator: data => {
    return validate(schema('legal.police.domesticviolence', data))
  },
  scrollToBottom: ''
}
