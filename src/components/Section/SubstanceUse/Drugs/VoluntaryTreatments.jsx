import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { DrugVoluntaryTreatmentValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import VoluntaryTreatment from './VoluntaryTreatment'

export default class VoluntaryTreatments extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateTreatmentVoluntary = this.updateTreatmentVoluntary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        TreatmentVoluntary: this.props.TreatmentVoluntary,
        List: this.props.List,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateTreatmentVoluntary (values) {
    this.update({
      TreatmentVoluntary: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.TreatmentDates)
    const name = (o.TreatmentProvider || {}).value

    return Summary({
      type: i18n.t('substance.drugs.voluntary.collection.itemType'),
      index: index,
      left: name,
      right: range,
      placeholder: i18n.m('substance.drugs.voluntary.collection.summary')
    })
  }

  render () {
    return (
      <div className="voluntary-treatments">
        <Branch name="TreatmentVoluntary"
                label={i18n.t('substance.drugs.heading.voluntaryTreatments')}
                labelSize="h2"
                className="treatment-voluntary"
                {...this.props.TreatmentVoluntary}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateTreatmentVoluntary}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.TreatmentVoluntary.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={DrugVoluntaryTreatmentValidator}
                     description={i18n.t('substance.drugs.voluntary.collection.description')}
                     appendTitle={i18n.t('substance.drugs.voluntary.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.voluntary.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <VoluntaryTreatment name="Item"
                                bind={true}
                                addressBooks={this.props.addressBooks}
                                dispatch={this.props.dispatch}
                                required={this.props.required}
                                scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

VoluntaryTreatments.defaultProps = {
  TreatmentVoluntary: {},
  List: {},
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/voluntary',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return validate(schema('substance.drug.voluntary', props))
  },
  scrollToBottom: ''
}
