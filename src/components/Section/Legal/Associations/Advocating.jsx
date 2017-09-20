import React from 'react'
import { i18n } from '../../../../config'
import schematize from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsAdvocatingValidator, AdvocatingValidator } from '../../../../validators'
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
      ListBranch: this.props.ListBranch,
      HasAdvocated: this.props.HasAdvocated,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateBranch (values) {
    this.update({
      HasAdvocated: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
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
      placeholder: i18n.m('legal.associations.advocating.collection.unknown')
    })
  }

  render () {
    return (
      <div className="legal-associations-advocating">
        <Branch name="has_advocated"
                label={i18n.t('legal.associations.advocating.heading.title')}
                labelSize="h2"
                className="legal-associations-advocating-has-advocated"
                value={this.props.HasAdvocated}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasAdvocated === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
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
  HasAdvocated: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/advocating',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schematize('legal.associations.advocating', props))
  },
  scrollToBottom: ''
}
