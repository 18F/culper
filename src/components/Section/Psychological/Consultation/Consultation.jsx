import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../Form'
import Order from '../Order'
import { ConsultationValidator } from '../../../../validators'

export default class Consultation extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Consulted: props.Consulted,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.update = this.update.bind(this)
    this.updateConsulted = this.updateConsulted.bind(this)
    this.updateList = this.updateList.bind(this)
    // this.isValid = this.isValid.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Consulted: this.state.Consulted,
          List: this.state.List,
          ListBranch: this.state.ListBranch
        })
      }
    })
  }

  updateList (values) {
    this.update('List', values.items)
    this.update('ListBranch', values.branch)
  }

  updateConsulted (values) {
    this.update('Consulted', values)
  }

  // handleValidation (event, status, error) {
  //   let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
  //   let complexStatus = null
  //   if (codes.length > 0) {
  //     complexStatus = false
  //   } else if (this.isValid()) {
  //     complexStatus = true
  //   }

  //   this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
  //     const errorObject = { [this.props.name]: codes }
  //     const statusObject = { [this.props.name]: { status: complexStatus } }
  //     super.handleValidation(event, statusObject, errorObject)
  //   })
  // }

  summary (item, index) {
    const o = (item || {}).Consultation || {}
    const occurred = (o.Occurred || {}).date ? `${o.Occurred.month}/${o.Occurred.year}` : ''
    const courtName = (o.CourtName || {}).value ? o.CourtName.value : null
    const type = i18n.t('psychological.consultation.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="courtname">
          <strong>
            {courtName || i18n.t('psychological.consultation.collection.summaryCourtName')}
          </strong>
        </span>
        <span className="occurred"><strong>{courtName && occurred}</strong></span>
      </span>
    )
  }

  // isValid () {
  //   return new ConsultationValidator(this.state).isValid()
  // }

  render () {
    return (
      <div className="consultation">
        <h2>{i18n.t('psychological.heading.consultation')}</h2>
        { i18n.m('psychological.heading.consultation2') }
        <Branch name="is_incompetent"
                value={this.state.Consulted}
                onError={this.props.onError}
                onUpdate={this.updateConsulted}>
        </Branch>

        <Show when={this.state.Consulted === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.props.onError}
                     description={i18n.t('psychological.consultation.collection.description')}
                     appendTitle={i18n.t('psychological.consultation.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.consultation.collection.appendLabel')}>
            <Order name="Consultation"
                   prefix="consultation"
                   ApplicantBirthDate={this.props.ApplicantBirthDate}
                   bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Consultation.defaultProps = {
  Consulted: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr }
}
