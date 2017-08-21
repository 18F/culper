import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, Name, Location, Country } from '../../../Form'

export default class CoOwner extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateCountries = this.updateCountries.bind(this)
    this.updateRelationshipNature = this.updateRelationshipNature.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Address: this.props.Address,
      Countries: this.props.Countries,
      RelationshipNature: this.props.RelationshipNature,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateCountries (values) {
    this.update({
      Countries: values
    })
  }

  updateRelationshipNature (values) {
    this.update({
      RelationshipNature: values
    })
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="co-owner">

        <h3>{i18n.t(`foreign.${prefix}.heading.name`)}</h3>
        <Name name="Name"
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              />

        <Field title={i18n.t(`foreign.${prefix}.heading.address`)}
               adjustFor="address"
               shrink={true}>
          <Location name="Address"
                    {...this.props.Address}
                    label={i18n.t(`foreign.${prefix}.label.address`)}
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBooks={this.props.addressBooks}
                    addressBook="ForeignNational"
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.countries`)}
               help={`foreign.${prefix}.help.countries`}>
          <Country name="Countries"
                   {...this.props.Countries}
                   multiple={true}
                   onUpdate={this.updateCountries}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t(`foreign.${prefix}.heading.relationshipNature`)}>
          <Textarea name="RelationshipNature"
                    className="relationship-nature"
                    {...this.props.RelationshipNature}
                    onUpdate={this.updateRelationshipNature}
                    onError={this.props.onError}
                    />
        </Field>
      </div>
    )
  }
}

CoOwner.defaultProps = {
  prefix: 'coOwner',
  addressBooks: {},
  dispatch: (action) => {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
