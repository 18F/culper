import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { RevokedValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import RevokedItem from './RevokedItem'

export default class Revoked extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasRevocations: this.props.HasRevocations,
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
      HasRevocations: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Date)
    const agency = (o.Agency || {}).value || ''

    return Summary({
      type: i18n.t('legal.investigations.revoked.collection.item'),
      index: index,
      left: agency,
      right: dates,
      placeholder: i18n.t('legal.investigations.revoked.collection.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content investigations-revoked"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.investigations.revoked')}</h1>
        <Branch
          name="has_revoked"
          label={i18n.t('legal.investigations.revoked.heading.title')}
          labelSize="h4"
          className="legal-investigations-revoked-has-revocations"
          {...this.props.HasRevocations}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('legal.investigations.revoked.para.downgrade')}
        </Branch>

        <Show when={this.props.HasRevocations.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={RevokedValidator}
            description={i18n.t(
              'legal.investigations.revoked.collection.description'
            )}
            appendTitle={i18n.t(
              'legal.investigations.revoked.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'legal.investigations.revoked.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <RevokedItem
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

Revoked.defaultProps = {
  name: 'revoked',
  HasRevocations: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'investigations/revoked',
  dispatch: () => {},
  validator: data => {
    return validate(schema('legal.investigations.revoked', data))
  },
  scrollToBottom: ''
}
