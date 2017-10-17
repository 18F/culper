import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { CitizenshipMultipleValidator, CitizenshipItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Branch, Show, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import CitizenshipItem from './CitizenshipItem'

export default class Multiple extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasMultiple = this.updateHasMultiple.bind(this)
    this.updateCitizenships = this.updateCitizenships.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Citizenships: this.props.Citizenships,
      CitizenshipsBranch: this.props.CitizenshipsBranch,
      HasMultiple: this.props.HasMultiple,
      ...queue
    })
  }

  updateHasMultiple (values) {
    this.update({
      HasMultiple: values,
      Citizenships: values.value === 'Yes' ? this.props.Citizenships : [],
      CitizenshipsBranch: values.value === 'Yes' ? this.props.CitizenshipsBranch : ''
    })
  }

  updateCitizenships (values) {
    this.update({
      Citizenships: values.items,
      CitizenshipsBranch: values.branch
    })
  }

  summaryCitizenships (item, index) {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Dates)
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : ''

    return Summary({
      type: i18n.t('citizenship.multiple.collection.citizenship.summary.item'),
      index: index,
      left: country,
      right: dates,
      placeholder: i18n.m('citizenship.multiple.collection.citizenship.summary.unknown')
    })
  }

  render () {
    return (
      <div className="multiple">
        <Field title={i18n.t('citizenship.multiple.heading.title')}
               titleSize="h2"
               className="no-margin-bottom"
               />

        <Branch name="has_multiple"
                label={i18n.t('citizenship.multiple.heading.hasmultiple')}
                labelSize="h3"
                className="has-multiple"
                {...this.props.HasMultiple}
                warning={true}
                onUpdate={this.updateHasMultiple}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />

        <Show when={this.props.HasMultiple.value === 'Yes'}>
          <Accordion items={this.props.Citizenships}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.CitizenshipsBranch}
                     onUpdate={this.updateCitizenships}
                     onError={this.handleError}
                     validator={CitizenshipItemValidator}
                     summary={this.summaryCitizenships}
                     description={i18n.t('citizenship.multiple.collection.citizenship.summary.title')}
                     appendTitle={i18n.t('citizenship.multiple.collection.citizenship.appendTitle')}
                     appendLabel={i18n.t('citizenship.multiple.collection.citizenship.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <CitizenshipItem name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Multiple.defaultProps = {
  HasMultiple: {},
  Citizenships: [],
  CitizenshipsBranch: '',
  Passports: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'citizenship',
  subsection: 'multiple',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('citizenship.multiple', props))
  },
  defaultState: true
}
