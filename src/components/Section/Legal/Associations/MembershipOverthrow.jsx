import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { OverthrowValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import MembershipOverthrowItem from './MembershipOverthrowItem'

export default class MembershipOverthrow extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasOverthrow: this.props.HasOverthrow,
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
      HasOverthrow: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.overthrow.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.overthrow.collection.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-overthrow"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.associations.overthrow')}</h1>
        <Branch
          name="has_overthrow"
          label={i18n.t('legal.associations.overthrow.heading.title')}
          labelSize="h4"
          className="legal-associations-overthrow-has-overthrow"
          {...this.props.HasOverthrow}
          warning={true}
          onError={this.handleError}
          validator={OverthrowValidator}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasOverthrow.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            validator={OverthrowValidator}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            description={i18n.t(
              'legal.associations.overthrow.collection.description'
            )}
            appendTitle={i18n.t(
              'legal.associations.overthrow.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'legal.associations.overthrow.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <MembershipOverthrowItem
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

MembershipOverthrow.defaultProps = {
  name: 'overthrow',
  HasOverthrow: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'associations/membership-overthrow',
  addressBooks: {},
  dispatch: action => {},
  validator: data => {
    return validate(schema('legal.associations.membership-overthrow', data))
  },
  scrollToBottom: ''
}
