import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary, NameSummary } from '../../../Summary'
import { ForeignBusinessVenturesValidator, VenturesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import VenturesItem from './VenturesItem'

export default class Ventures extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignVentures = this.updateHasForeignVentures.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasForeignVentures: this.props.HasForeignVentures,
      List: this.props.List,
      ...queue
    })
  }

  updateHasForeignVentures (values) {
    this.update({
      HasForeignVentures: values,
      List: values.value === 'Yes' ? this.props.List : { branch: {}, items: [] }
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
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.ventures.collection.summary.item'),
      index: index,
      left: name,
      right: date,
      placeholder: i18n.m('foreign.business.ventures.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="section-content foreign-business-ventures" {...super.dataAttributes(this.props)}>
        <Branch name="has_foreign_ventures"
                label={i18n.t('foreign.business.ventures.heading.title')}
                labelSize="h2"
                adjustFor="p"
                {...this.props.HasForeignVentures}
                warning={true}
                onUpdate={this.updateHasForeignVentures}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.business.ventures.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignVentures.value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={VenturesValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.business.ventures.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.ventures.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.ventures.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.ventures.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <VenturesItem name="Item"
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

Ventures.defaultProps = {
  name: 'Ventures',
  HasForeignVentures: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/ventures',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('foreign.business.ventures', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
