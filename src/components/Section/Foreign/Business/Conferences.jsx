import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { ForeignBusinessConferencesValidator, ConferencesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import ConferencesItem from './ConferencesItem'

export default class Conferences extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignConferences = this.updateHasForeignConferences.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasForeignConferences: this.props.HasForeignConferences,
      ...queue
    })
  }

  updateHasForeignConferences (values) {
    this.update({
      HasForeignConferences: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  summary (item, index) {
    const obj = ((item && item.Item) || {})
    const date = DateSummary(item.Dates)
    const city = (obj.City || {}).value || ''

    return Summary({
      type: i18n.t('foreign.business.conferences.collection.summary.item'),
      index: index,
      left: city,
      right: date,
      placeholder: i18n.m('foreign.business.conferences.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-conferences">
        <Branch name="has_foreign_conferences"
                label={i18n.t('foreign.business.conferences.heading.title')}
                labelSize="h2"
                adjustFor="p"
                {...this.props.HasForeignConferences}
                warning={true}
                onUpdate={this.updateHasForeignConferences}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.business.conferences.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignConferences.value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ConferencesValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.business.conferences.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.conferences.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.conferences.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.conferences.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <ConferencesItem name="Item"
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

Conferences.defaultProps = {
  name: 'Conferences',
  HasForeignConferences: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/conferences',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('foreign.business.conferences', props))
  },
  defaultState: true,
  scrollToBottom: ''
}
