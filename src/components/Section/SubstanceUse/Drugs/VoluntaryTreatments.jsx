import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import VoluntaryTreatment from './VoluntaryTreatment'
import { DrugVoluntaryTreatmentsValidator } from '../../../../validators'

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
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateTreatmentVoluntary (values) {
    this.update({
      TreatmentVoluntary: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).VoluntaryTreatment || {}
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
        <h2>{i18n.m('substance.drugs.heading.voluntaryTreatments')}</h2>
        <Branch name="TreatmentVoluntary"
                className="treatment-voluntary"
                value={this.props.TreatmentVoluntary}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateTreatmentVoluntary}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.TreatmentVoluntary === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.drugs.voluntary.collection.description')}
                     appendTitle={i18n.t('substance.drugs.voluntary.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.voluntary.collection.appendLabel')}
                     scrollIntoView={this.props.scrollIntoView}>
            <VoluntaryTreatment name="VoluntaryTreatment" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

VoluntaryTreatments.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/voluntary',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugVoluntaryTreatmentsValidator(props).isValid()
  }
}
