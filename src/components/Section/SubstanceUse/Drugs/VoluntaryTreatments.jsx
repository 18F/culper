import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { DateSummary } from '../../../Summary'
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
    this.update({TreatmentVoluntary: values})
  }

  summary (item, index) {
    const o = (item || {}).VoluntaryTreatment || {}
    const range = DateSummary(o.TreatmentDates)
    const name = (o.TreatmentProvider || {}).value
    const type = i18n.t('substance.drugs.voluntary.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {name || i18n.t('substance.drugs.voluntary.collection.summary')}
          </strong>
        </span>
        <span className="dates">
          <strong>{range}</strong>
        </span>
      </span>
    )
  }

  render () {
    return (
      <div className="voluntary-treatments">
        <h2>{i18n.m('substance.drugs.heading.voluntaryTreatments')}</h2>
        <Branch name="TreatmentVoluntary"
          className="treatment-voluntary"
          value={this.props.TreatmentVoluntary}
          onError={this.handleError}
          onUpdate={this.updateTreatmentVoluntary}>
        </Branch>

        <Show when={this.props.TreatmentVoluntary === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            description={i18n.t('substance.drugs.voluntary.collection.description')}
            appendTitle={i18n.t('substance.drugs.voluntary.collection.appendTitle')}
            appendLabel={i18n.t('substance.drugs.voluntary.collection.appendLabel')}>
            <VoluntaryTreatment name="VoluntaryTreatment" bind={true} />
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
