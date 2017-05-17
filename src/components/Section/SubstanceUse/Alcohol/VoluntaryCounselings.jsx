import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Accordion, Branch, Show } from '../../../Form'
import VoluntaryCounseling from './VoluntaryCounseling'
import { DateSummary } from '../../../Summary'
import { AlcoholVoluntaryCounselingsValidator } from '../../../../validators'

export default class VoluntaryCounselings extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errorCodes: props.ErrorCodes || []
    }

    this.update = this.update.bind(this)
    this.updateSoughtTreatment = this.updateSoughtTreatment.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        SoughtTreatment: this.props.SoughtTreatment,
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

  updateSoughtTreatment (values) {
    this.update({SoughtTreatment: values})
  }

  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  summary (item, index) {
    const o = (item || {}).NegativeImpact || {}
    const occurred = DateSummary(o.Occurred)
    const type = i18n.t('substance.alcohol.voluntaryCounseling.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {occurred || i18n.t('substance.alcohol.voluntaryCounseling.collection.summary')}
          </strong>
        </span>
      </span>
    )
  }

  isValid () {
    return new AlcoholVoluntaryCounselingsValidator(this.props).isValid()
  }

  render () {
    return (
      <div className="voluntary-counselings">
        <h2>{i18n.t('substance.alcohol.heading.voluntaryCounseling')}</h2>
        <Branch name="SoughtTreatment"
          className="sought-treatment"
          value={this.props.SoughtTreatment}
          onValidate={this.handleValidation}
          onUpdate={this.updateSoughtTreatment}>
        </Branch>

        <Show when={this.props.SoughtTreatment === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onValidate={this.handleValidation}
            description={i18n.t('substance.alcohol.voluntaryCounseling.collection.description')}
            appendTitle={i18n.t('substance.alcohol.voluntaryCounseling.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.voluntaryCounseling.collection.appendLabel')}>
            <VoluntaryCounseling name="VoluntaryCounseling"
              bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

VoluntaryCounselings.defaultProps = {
  List: [],
  ListBranch: ''
}
