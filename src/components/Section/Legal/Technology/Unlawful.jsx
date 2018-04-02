import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { UnlawfulValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import UnlawfulItem from './UnlawfulItem'

export default class Unlawful extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasUnlawful: this.props.HasUnlawful,
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
      HasUnlawful: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = ((item && item.Item) || {})
    const dates = DateSummary(o.Date)
    const incident = (o.Incident || {}).value ? o.Incident.value : ''

    return Summary({
      type: i18n.t('legal.technology.unlawful.collection.item'),
      index: index,
      left: incident,
      right: dates,
      placeholder: i18n.t('legal.technology.unlawful.collection.unknown')
    })
  }

  render () {
    return (
      <div className="section-content legal-technology-unlawful" {...super.dataAttributes(this.props)}>
        <Branch name="has_unlawful"
                label={i18n.t('legal.technology.unlawful.heading.title')}
                labelSize="h2"
                className="legal-technology-unlawful-has-unlawful"
                {...this.props.HasUnlawful}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasUnlawful.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={UnlawfulValidator}
                     description={i18n.t('legal.technology.unlawful.collection.description')}
                     appendTitle={i18n.t('legal.technology.unlawful.collection.appendTitle')}
                     appendLabel={i18n.t('legal.technology.unlawful.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <UnlawfulItem name="Item"
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

Unlawful.defaultProps = {
  name: 'unlawful',
  HasUnlawful: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'technology/unlawful',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('legal.technology.unlawful', data))
  },
  scrollToBottom: ''
}
