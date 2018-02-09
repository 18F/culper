import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { TravelValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
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
    this.props.onUpdate({
      List: this.props.List,
      HasForeignTravelOutside: this.props.HasForeignTravelOutside,
      HasForeignTravelOfficial: this.props.HasForeignTravelOfficial,
      ...queue
    })
  }

  updateHasForeignTravelOutside (values) {
    this.update({
      HasForeignTravelOutside: values
    })
  }

  updateHasForeignTravelOfficial (values) {
    this.update({
      HasForeignTravelOfficial: values
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const date = DateSummary(obj.Dates)
    const country = (obj.Country || {}).value || ''

    return Summary({
      type: i18n.t('foreign.travel.collection.summary.item'),
      index: index,
      left: country,
      right: date,
      placeholder: i18n.m('foreign.travel.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-travel">
        <Branch label={i18n.t('foreign.travel.heading.outside')}
                labelSize="h2"
                name="has_foreign_travel_outside"
                className="foreign-travel-outside"
                {...this.props.HasForeignTravelOutside}
                warning={true}
                onUpdate={this.updateHasForeignTravelOutside}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={(this.props.HasForeignTravelOutside || {}).value === 'Yes'}>
          <Branch label={i18n.t('foreign.travel.heading.official')}
                  labelSize="h3"
                  name="has_foreign_travel_official"
                  className="foreign-travel-official"
                  help="foreign.travel.help.official"
                  {...this.props.HasForeignTravelOfficial}
                  onUpdate={this.updateHasForeignTravelOfficial}
                  required={this.props.required}
                  onError={this.handleError}
                  scrollIntoView={this.props.scrollIntoView}>
            {i18n.m('foreign.travel.para.personal')}
          </Branch>
        </Show>

        <Show when={(this.props.HasForeignTravelOutside || {}).value === 'Yes' && (this.props.HasForeignTravelOfficial || {}).value === 'No'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={TravelValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.travel.collection.summary.title')}
                     appendTitle={i18n.t('foreign.travel.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.travel.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <TravelQuestions name="Item"
                             bind={true}
                             required={this.props.required}
                             scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Travel.defaultProps = {
  name: 'Travel',
  HasForeignTravelOutside: {},
  HasForeignTravelOfficial: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'travel',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('foreign.travel', props))
  },
  defaultState: true,
  scrollToBottom: ''
}
