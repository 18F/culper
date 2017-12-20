import React from 'react'
import { i18n } from '../../../../../config'
import { Address, ValidationElement, Currency, Field, Text, DateControl, Textarea, NotApplicable, Checkbox, CheckboxGroup, Location } from '../../../../Form'
import CoOwners from '../CoOwners'

export default class RealEstateInterest extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInterestTypes = this.updateInterestTypes.bind(this)
    this.updateRealEstateType = this.updateRealEstateType.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateAcquired = this.updateAcquired.bind(this)
    this.updateHowAcquired = this.updateHowAcquired.bind(this)
    this.updateCost = this.updateCost.bind(this)
    this.updateCostEstimated = this.updateCostEstimated.bind(this)
    this.updateSold = this.updateSold.bind(this)
    this.updateSoldNotApplicable = this.updateSoldNotApplicable.bind(this)
    this.updateCoOwners = this.updateCoOwners.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      InterestTypes: this.props.InterestTypes,
      RealEstateType: this.props.RealEstateType,
      Address: this.props.Address,
      Acquired: this.props.Acquired,
      HowAcquired: this.props.HowAcquired,
      Cost: this.props.Cost,
      CostEstimated: this.props.CostEstimated,
      Sold: this.props.Sold,
      SoldNotApplicable: this.props.SoldNotApplicable,
      CoOwners: this.props.CoOwners,
      ...queue
    })
  }

  updateInterestTypes (values) {
    let interestType = values.value
    let selected = [...((this.props.InterestTypes || {}).values || [])]
    if (selected.includes(interestType)) {
      selected.splice(selected.indexOf(interestType), 1)
    } else {
      selected.push(interestType)
    }

    this.update({
      InterestTypes: { values: selected }
    })
  }

  updateRealEstateType (values) {
    this.update({
      RealEstateType: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateAcquired (values) {
    this.update({
      Acquired: values
    })
  }

  updateHowAcquired (values) {
    this.update({
      HowAcquired: values
    })
  }

  updateCost (values) {
    this.update({
      Cost: values
    })
  }

  updateCostEstimated (values) {
    this.update({
      CostEstimated: values
    })
  }

  updateSold (values) {
    this.update({
      Sold: values
    })
  }

  updateSoldNotApplicable (values) {
    this.update({
      SoldNotApplicable: values
    })
  }

  updateCoOwners (values) {
    this.update({
      CoOwners: values
    })
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="interest">
        <Field title={i18n.t('foreign.activities.realestate.interest.heading.interestTypes')}
               adjustFor="p"
               scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.activities.realestate.interest.para.checkAll')}

          <CheckboxGroup className="interest-types option-list"
                         onError={this.props.onError}
                         required={this.props.required}
                         selectedValues={(this.props.InterestTypes || {}).values}>
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.realestate.interest.label.interestTypes.yourself')}
                      value="Yourself"
                      className="yourself"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.realestate.interest.label.interestTypes.spouse')}
                      value="Spouse"
                      className="spouse"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.realestate.interest.label.interestTypes.cohabitant')}
                      value="Cohabitant"
                      className="cohabitant"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
            <Checkbox name="interest-type"
                      label={i18n.m('foreign.activities.realestate.interest.label.interestTypes.dependentChildren')}
                      value="DependentChildren"
                      className="dependent-children"
                      onError={this.props.onError}
                      onUpdate={this.updateInterestTypes}
                      />
          </CheckboxGroup>
        </Field>

        <Field title={i18n.t('foreign.activities.realestate.interest.heading.realEstateType')}
               adjustFor="p"
               scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.activities.realestate.interest.para.realEstateType')}
          <Text name="RealEstateType"
                className="realestate-type"
                {...this.props.RealEstateType}
                onUpdate={this.updateRealEstateType}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('foreign.activities.realestate.interest.heading.address')}
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.props.Address}
                    layout={Location.STREET_CITY_COUNTRY}
                    fields={['street', 'city', 'country']}
                    label={i18n.t('foreign.activities.realestate.interest.label.address')}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.activities.realestate.interest.heading.acquired')}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Acquired"
                       className="acquired"
                       {...this.props.Acquired}
                       applicantBirthdate={this.props.applicantBirthdate}
                       label={i18n.t('foreign.activities.realestate.interest.label.acquired')}
                       noMaxDate={true}
                       onUpdate={this.updateAcquired}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('foreign.activities.realestate.interest.heading.howAcquired')}
               adjustFor="p"
               scrollIntoView={this.props.scrollIntoView}>
          <p>{i18n.t('foreign.activities.realestate.interest.para.howAcquired')}</p>
          <Textarea name="HowAcquired"
                    className="how-acquired"
                    {...this.props.HowAcquired}
                    onUpdate={this.updateHowAcquired}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.activities.realestate.interest.heading.sold')}
               help={'foreign.activities.realestate.interest.help.sold'}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="SoldNotApplicable"
                         {...this.props.SoldNotApplicable}
                         label={i18n.t('foreign.activities.realestate.interest.label.soldNotApplicable')}
                         or={i18n.m('foreign.activities.realestate.interest.label.or')}
                         onError={this.props.onError}
                         required={this.props.required}
                         onUpdate={this.updateSoldNotApplicable}>
            <DateControl name="Sold"
                         className="sold"
                         {...this.props.Sold}
                         applicantBirthdate={this.props.applicantBirthdate}
                         label={i18n.t('foreign.activities.realestate.interest.label.sold')}
                         onUpdate={this.updateSold}
                         onError={this.props.onError}
                         required={this.props.required}
                         />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('foreign.activities.realestate.interest.heading.cost')}
               help={'foreign.activities.realestate.interest.help.cost'}
               scrollIntoView={this.props.scrollIntoView}>
          <Currency name="Cost"
                    className="cost"
                    {...this.props.Cost}
                    min="0"
                    onUpdate={this.updateCost}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
          <div className="flags">
            <Checkbox name="CostEstimated"
                      label={i18n.t('foreign.activities.realestate.interest.label.costEstimated')}
                      toggle="false"
                      {...this.props.CostEstimated}
                      onUpdate={this.updateCostEstimated}
                      onError={this.props.onError}
                      />
          </div>
        </Field>

        <CoOwners prefix={prefix}
                  {...this.props.CoOwners}
                  onUpdate={this.updateCoOwners}
                  onError={this.props.onError}
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                  />

      </div>
    )
  }
}

RealEstateInterest.defaultProps = {
  SoldNotApplicable: { applicable: true },
  applicantBirthdate: {},
  prefix: 'activities.realestate.interest',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
