import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, Name, Address, Country }  from '../../../Form'

export default class CoOwner extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateCountries = this.updateCountries.bind(this)
    this.updateRelationshipNature = this.updateRelationshipNature.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Name: this.props.Name,
        CurrentAddress: this.props.CurrentAddress,
        Countries: this.props.Countries,
        RelationshipNature: this.props.RelationshipNature,
        [field]: values
      })
    }
  }

  updateName (values) {
    this.update('Name', values)
  }

  updateAddress (values) {
    this.update('Address', values)
  }

  updateCountries (values) {
    this.update('Countries', values)
  }

  updateRelationshipNature (values) {
    this.update('RelationshipNature', values)
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="co-owner">

        <Field title={i18n.t(`foreign.${prefix}.heading.name`)}
          adjustFor="labels"
          shrink={true}>
          <Name name="Name"
            className="name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.address`)}
          adjustFor="labels"
          shrink={true}>
          <Address name="Address"
            {...this.props.Address}
            label={i18n.t(`foreign.${prefix}.label.address`)}
            onUpdate={this.updateAddress}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.countries`)}
          help={`foreign.${prefix}.help.countries`}>
          <Country name="Countries"
            {...this.props.Countries}
            multiple={true}
            onUpdate={this.updateCountries}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.relationshipNature`)}
          help={`foreign.${prefix}.help.relationshipNature`}>
          <Textarea name="RelationshipNature"
            className="relationship-nature"
            {...this.props.RelationshipNature}
            onUpdate={this.updateRelationshipNature}
            onValidate={this.props.onValidate}
          />
        </Field>
      </div>
    )
  }
}

CoOwner.defaultProps = {
  prefix: 'coOwner'

}
