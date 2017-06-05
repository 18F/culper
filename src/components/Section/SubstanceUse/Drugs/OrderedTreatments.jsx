import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { DateSummary } from '../../../Summary'
import OrderedTreatment from './OrderedTreatment'
import { DrugOrderedTreatmentsValidator } from '../../../../validators'

const orderedByList = {
  'Employer': i18n.t('substance.drugs.ordered.orderedBy.label.employer'),
  'MedicalProfessional': i18n.t('substance.drugs.ordered.orderedBy.label.medicalProfessional'),
  'MentalHealthProfessional': i18n.t('substance.drugs.ordered.orderedBy.label.mentalHealthProfessional'),
  'Judge': i18n.t('substance.drugs.ordered.orderedBy.label.judge'),
  'None': i18n.t('substance.drugs.ordered.orderedBy.label.none')
}

export default class OrderedTreatments extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateTreatmentOrdered = this.updateTreatmentOrdered.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        TreatmentOrdered: this.props.TreatmentOrdered,
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

  updateTreatmentOrdered (values) {
    this.update({TreatmentOrdered: values})
  }

  summary (item, index) {
    const o = (item || {}).OrderedTreatment || {}
    const range = DateSummary(o.TreatmentDates)
    const orderedBy = (o.OrderedBy || []).map(key => { return orderedByList[key] }).join(', ')
    const type = i18n.t('substance.drugs.ordered.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {orderedBy || i18n.t('substance.drugs.ordered.collection.summary')}
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
      <div className="ordered-treatments">
        <h2>{i18n.m('substance.drugs.heading.orderedTreatments')}</h2>
        <Branch name="TreatmentOrdered"
          className="treatment-ordered"
          value={this.props.TreatmentOrdered}
          onError={this.handleError}
          onUpdate={this.updateTreatmentOrdered}>
        </Branch>

        <Show when={this.props.TreatmentOrdered === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            description={i18n.t('substance.drugs.ordered.collection.description')}
            appendTitle={i18n.t('substance.drugs.ordered.collection.appendTitle')}
            appendLabel={i18n.t('substance.drugs.ordered.collection.appendLabel')}>
            <OrderedTreatment name="OrderedTreatment" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OrderedTreatments.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/ordered',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugOrderedTreatmentsValidator(props).isValid()
  }
}
