import React from 'react'
import { i18n } from '../../../../config'
import { HospitalizationsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Hospitalization from './Hospitalization'
import { dateRangeFormat } from '../summaryHelper'

export default class Hospitalizations extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      Hospitalized: props.Hospitalized,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.update = this.update.bind(this)
    this.updateHospitalized = this.updateHospitalized.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Hospitalized: this.state.Hospitalized,
          List: this.state.List
        })
      }
    })
  }

  updateList (values) {
    this.update('List', values.items)
    this.update('ListBranch', values.branch)
  }

  updateHospitalized (values) {
    this.update('Hospitalized', values)
  }

  summary (item, index) {
    const o = (item || {}).Hospitalization || {}
    const treatmentDate = (o.TreatmentDate || {})
    const formattedTreatmentDate = dateRangeFormat(treatmentDate)
    const facility = (o.Facility || {}).value ? o.Facility.value : null
    const type = i18n.t('psychological.hospitalization.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="facility">
          <strong>{facility || i18n.t('psychological.hospitalization.collection.summary')}</strong>
        </span>
        <span className="treatmentdate"><strong>{facility && formattedTreatmentDate}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="hospitalizations">
        <h2>{i18n.t('psychological.heading.hospitalization')}</h2>
        <Branch name="hospitalized"
                value={this.state.Hospitalized}
                onError={this.handleError}
                onUpdate={this.updateHospitalized}>
        </Branch>

        <Show when={this.state.Hospitalized === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('psychological.hospitalization.collection.description')}
                     appendTitle={i18n.t('psychological.hospitalization.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.hospitalization.collection.appendLabel')}>
            <Hospitalization name="Hospitalization"
                             ApplicantBirthDate={this.props.ApplicantBirthDate}
                             bind={true}
                             />
          </Accordion>

        </Show>
      </div>
    )
  }
}

Hospitalization.defaultProps = {
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'hospitalizations',
  dispatch: () => {},
  validator: (state, props) => {
    return new HospitalizationsValidator(state, props).isValid()
  }
}
