import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalTechnologyManipulatingValidator, ManipulatingValidator } from '../../../../validators'
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
      ListBranch: this.props.ListBranch,
      HasManipulating: this.props.HasManipulating,
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
      HasManipulating: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
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
      <div className="legal-technology-manipulating">
        <Branch name="has_manipulating"
                label={i18n.t('legal.technology.manipulating.heading.title')}
                labelSize="h2"
                className="legal-technology-manipulating-has-manipulating"
                value={this.props.HasManipulating}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasManipulating === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
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
  HasManipulating: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'technology/manipulating',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new LegalTechnologyManipulatingValidator(props).isValid()
  },
  scrollToBottom: ''
}
