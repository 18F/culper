import React from 'react'
import { i18n } from '../../../../config'
import { Field, ValidationElement, Text, Textarea, DateRange } from '../../../Form'

export default class DrugClearanceUse extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateInvolvementDates = this.updateInvolvementDates.bind(this)
    this.updateEstimatedUse = this.updateEstimatedUse.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Description: this.props.Description,
        InvolvementDates: this.props.InvolvementDates,
        EstimatedUse: this.props.EstimatedUse,
        ...updateValues
      })
    }
  }

  updateDescription (values) {
    this.update({Description: values})
  }

  updateInvolvementDates (values) {
    this.update({InvolvementDates: values})
  }

  updateEstimatedUse (values) {
    this.update({EstimatedUse: values})
  }

  render () {
    return (
      <div className="drug-clearance-use">
        <Field title={i18n.t('substance.drugs.clearance.heading.description')}
          help={'substance.drugs.clearance.help.description'}>
          <Textarea name="Description"
            className="description"
            {...this.props.Description}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.clearance.heading.involvementDates')}
          adjustFor="datecontrol"
          help={'substance.drugs.clearance.help.involvementDates'}>
          <DateRange name="InvolvementDates"
            className="involvement-dates"
            {...this.props.InvolvementDates}
            onUpdate={this.updateInvolvementDates}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.clearance.heading.estimatedUse')}
          help={'substance.drugs.clearance.help.estimatedUse'}>
          <Text name="EstimatedUse"
            className="estimated-use"
            {...this.props.EstimatedUse}
            onUpdate={this.updateEstimatedUse}
            onError={this.props.onError}
          />
        </Field>
      </div>
    )
  }
}

DrugClearanceUse.defaultProps = {
  onError: (value, arr) => { return arr }
}
