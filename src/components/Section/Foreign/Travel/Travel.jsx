import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignTravelValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import TravelQuestions from './TravelQuestions'

export default class Travel extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignTravelOutside = this.updateHasForeignTravelOutside.bind(this)
    this.updateHasForeignTravelOfficial = this.updateHasForeignTravelOfficial.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasForeignTravelOutside: this.props.HasForeignTravelOutside,
        HasForeignTravelOfficial: this.props.HasForeignTravelOfficial
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateHasForeignTravelOutside (values) {
    this.update([
      { name: 'HasForeignTravelOutside', value: values }
    ])
  }

  updateHasForeignTravelOfficial (values) {
    this.update([
      { name: 'HasForeignTravelOfficial', value: values }
    ])
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const country = (obj.Country || {}).value || i18n.t('foreign.travel.collection.summary.unknown')
    const date = DateSummary(obj.Dates)

    return (
      <span>
        <span className="index">{i18n.t('foreign.travel.collection.summary.item')} {index + 1}:</span>
        <span><strong>{country}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-travel">
        <Branch label={i18n.t('foreign.travel.heading.outside')}
                labelSize="h3"
                name="has_foreign_travel_outside"
                className="foreign-travel-outside"
                help="foreign.travel.help.outside"
                value={this.props.HasForeignTravelOutside}
                onUpdate={this.updateHasForeignTravelOutside}
                onError={this.handleError}>
        </Branch>

        <Branch label={i18n.t('foreign.travel.heading.official')}
                labelSize="h3"
                name="has_foreign_travel_official"
                className="foreign-travel-official"
                help="foreign.travel.help.official"
                value={this.props.HasForeignTravelOfficial}
                onUpdate={this.updateHasForeignTravelOfficial}
                onError={this.handleError}>
          {i18n.m('foreign.travel.para.personal')}
        </Branch>

        <Show when={this.props.HasForeignTravelOutside === 'Yes' && this.props.HasForeignTravelOfficial === 'No'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.travel.collection.summary.title')}
                     appendTitle={i18n.t('foreign.travel.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.travel.collection.append')}>
            <TravelQuestions name="Item" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Travel.defaultProps = {
  name: 'Travel',
  HasForeignTravelOutside: '',
  HasForeignTravelOfficial: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'travel',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignTravelValidator(state, props).isValid()
  },
  defaultState: true
}
