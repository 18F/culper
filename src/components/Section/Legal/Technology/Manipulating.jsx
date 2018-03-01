import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { ManipulatingValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import ManipulatingItem from './ManipulatingItem'

export default class Manipulating extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasManipulating: this.props.HasManipulating,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateBranch (values) {
    this.update({
      HasManipulating: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = ((item && item.Item) || {})
    const dates = DateSummary(o.Date)
    const incident = (o.Incident || {}).value ? o.Incident.value : ''

    return Summary({
      type: i18n.t('legal.technology.manipulating.collection.item'),
      index: index,
      left: incident,
      right: dates,
      placeholder: i18n.m('legal.technology.manipulating.collection.unknown')
    })
  }

  render () {
    return (
      <div className="section-content legal-technology-manipulating" {...super.dataAttributes(this.props)}>
        <Branch name="has_manipulating"
                label={i18n.t('legal.technology.manipulating.heading.title')}
                labelSize="h2"
                className="legal-technology-manipulating-has-manipulating"
                {...this.props.HasManipulating}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasManipulating.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ManipulatingValidator}
                     description={i18n.t('legal.technology.manipulating.collection.description')}
                     appendTitle={i18n.t('legal.technology.manipulating.collection.appendTitle')}
                     appendLabel={i18n.t('legal.technology.manipulating.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <ManipulatingItem name="Item"
                              bind={true}
                              addressBooks={this.props.addressBooks}
                              dispatch={this.props.dispatch}
                              required={this.props.required}
                              scrollIntoView={this.props.scrollIntoView}
                              />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Manipulating.defaultProps = {
  name: 'manipulating',
  HasManipulating: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'technology/manipulating',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('legal.technology.manipulating', data))
  },
  scrollToBottom: ''
}
