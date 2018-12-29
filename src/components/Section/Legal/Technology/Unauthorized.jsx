import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import {
  LegalTechnologyUnauthorizedValidator,
  UnauthorizedValidator
} from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import UnauthorizedItem from './UnauthorizedItem'

export default class Unauthorized extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasUnauthorized: this.props.HasUnauthorized,
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
      HasUnauthorized: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Date)
    const incident = (o.Incident || {}).value ? o.Incident.value : ''

    return Summary({
      type: i18n.t('legal.technology.unauthorized.collection.item'),
      index: index,
      left: incident,
      right: dates,
      placeholder: i18n.t('legal.technology.unauthorized.collection.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content legal-technology-unauthorized"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.technology.unauthorized')}</h1>
        {i18n.m('legal.technology.unauthorized.para.intro')}
        <Branch
          name="has_unauthorized"
          label={i18n.t('legal.technology.unauthorized.heading.title')}
          labelSize="h4"
          className="legal-technology-unauthorized-has-unauthorized"
          {...this.props.HasUnauthorized}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasUnauthorized.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={UnauthorizedValidator}
            description={i18n.t(
              'legal.technology.unauthorized.collection.description'
            )}
            appendTitle={i18n.t(
              'legal.technology.unauthorized.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'legal.technology.unauthorized.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <UnauthorizedItem
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

Unauthorized.defaultProps = {
  name: 'unauthorized',
  HasUnauthorized: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'technology/unauthorized',
  addressBooks: {},
  dispatch: action => {},
  validator: data => {
    return validate(schema('legal.technology.unauthorized', data))
  },
  scrollToBottom: ''
}
