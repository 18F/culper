import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { TravelValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_TRAVEL } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../ForeignConnector'
import TravelQuestions from './TravelQuestions'

const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_TRAVEL.name,
  storeKey: FOREIGN_TRAVEL.storeKey,
}

export class Travel extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      HasForeignTravelOutside: this.props.HasForeignTravelOutside,
      HasForeignTravelOfficial: this.props.HasForeignTravelOfficial,
      ...queue,
    })
  }

  updateHasForeignTravelOutside = (values) => {
    this.update({
      HasForeignTravelOutside: values,
    })
  }

  updateHasForeignTravelOfficial = (values) => {
    this.update({
      HasForeignTravelOfficial: values,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const obj = (item || {}).Item || {}
    const date = DateSummary(obj.Dates)
    const country = (obj.Country || {}).value || ''

    return Summary({
      type: i18n.t('foreign.travel.collection.summary.item'),
      index,
      left: country,
      right: date,
      placeholder: i18n.t('foreign.travel.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-travel"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.travel')}</h1>
        <Branch
          label={i18n.t('foreign.travel.heading.outside')}
          labelSize="h4"
          name="has_foreign_travel_outside"
          className="foreign-travel-outside"
          {...this.props.HasForeignTravelOutside}
          warning
          onUpdate={this.updateHasForeignTravelOutside}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.HasForeignTravelOutside || {}).value === 'Yes'}>
          <Branch
            label={i18n.t('foreign.travel.heading.official')}
            labelSize="h4"
            name="has_foreign_travel_official"
            className="foreign-travel-official"
            help="foreign.travel.help.official"
            {...this.props.HasForeignTravelOfficial}
            onUpdate={this.updateHasForeignTravelOfficial}
            required={this.props.required}
            onError={this.handleError}
            scrollIntoView={this.props.scrollIntoView}
          >
            {i18n.m('foreign.travel.para.personal')}
          </Branch>
        </Show>

        <Show
          when={
            (this.props.HasForeignTravelOutside || {}).value === 'Yes'
            && (this.props.HasForeignTravelOfficial || {}).value === 'No'
          }
        >
          <Accordion
            {...this.props.List}
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
            scrollIntoView={this.props.scrollIntoView}
          >
            <TravelQuestions
              name="Item"
              bind
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
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
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'travel',
  dispatch: () => {},
  validator: data => validate(schema('foreign.travel', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectForeignSection(Travel, sectionConfig)
