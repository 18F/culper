import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { AdvocatingValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import AdvocatingItem from './AdvocatingItem'

export default class Advocating extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasAdvocated: this.props.HasAdvocated,
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
      HasAdvocated: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = ((item && item.Item) || {})
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.advocating.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.advocating.collection.unknown')
    })
  }

  render () {
    return (
      <div className="section-content legal-associations-advocating" {...super.dataAttributes(this.props)}>
        <Branch name="has_advocated"
                label={i18n.t('legal.associations.advocating.heading.title')}
                labelSize="h2"
                className="legal-associations-advocating-has-advocated"
                {...this.props.HasAdvocated}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasAdvocated.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={AdvocatingValidator}
                     description={i18n.t('legal.associations.advocating.collection.description')}
                     appendTitle={i18n.t('legal.associations.advocating.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.advocating.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <AdvocatingItem name="Item"
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

Advocating.defaultProps = {
  name: 'advocating',
  HasAdvocated: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/advocating',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('legal.associations.advocating', data))
  },
  scrollToBottom: ''
}
