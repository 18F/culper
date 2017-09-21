import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { ForeignBusinessPoliticalValidator, PoliticalValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import PoliticalItem from './PoliticalItem'

export default class Political extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignPolitical = this.updateHasForeignPolitical.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignPolitical: this.props.HasForeignPolitical,
      ...queue
    })
  }

  updateHasForeignPolitical (values) {
    this.update({
      HasForeignPolitical: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = ((item && item.Item) || {})
    const dates = DateSummary(obj.Dates)
    const pos = (obj.Position || {}).value || ''
    const country = (obj.Country || {}).value || ''
    const text = country.length ? `${pos} (${country})` : pos

    return Summary({
      type: i18n.t('foreign.business.political.collection.summary.item'),
      index: index,
      left: text,
      right: dates,
      placeholder: i18n.m('foreign.business.political.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-political">
        <Branch name="has_foreign_political"
                label={i18n.t('foreign.business.political.heading.title')}
                labelSize="h2"
                value={this.props.HasForeignPolitical}
                warning={true}
                onUpdate={this.updateHasForeignPolitical}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasForeignPolitical === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={PoliticalValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.business.political.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.political.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.political.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
                     <PoliticalItem name="Item"
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

Political.defaultProps = {
  name: 'Political',
  HasForeignPolitical: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/political',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('foreign.business.political', props))
  },
  defaultState: true,
  scrollToBottom: ''
}
