import React from 'react'
import { i18n } from '../../../../config'
import { pickDate } from '../../../../validators/helpers'
import {
  Location,
  Field,
  DateControl,
  Show,
  RadioGroup,
  Radio,
  Telephone,
  Name,
  NotApplicable,
  Country,
} from '../../../Form'

export default class Divorce extends React.Component {
  update = (queue) => {
    this.props.onUpdate({
      Name: this.props.Name,
      Birthdate: this.props.Birthdate,
      BirthPlace: this.props.BirthPlace,
      Citizenship: this.props.Citizenship,
      Telephone: this.props.Telephone,
      Recognized: this.props.Recognized,
      Address: this.props.Address,
      DateDivorced: this.props.DateDivorced,
      DivorceLocation: this.props.DivorceLocation,
      Status: this.props.Status,
      Deceased: this.props.Deceased,
      DeceasedAddress: this.props.DeceasedAddress,
      DeceasedAddressNotApplicable: this.props.DeceasedAddressNotApplicable,
      ...queue,
    })
  }

  updateName = (values) => {
    this.update({
      Name: values,
    })
  }

  updateBirthdate = (values) => {
    this.update({
      Birthdate: values,
    })
  }

  updateBirthPlace = (values) => {
    this.update({
      BirthPlace: values,
    })
  }

  updateCitizenship = (values) => {
    this.update({
      Citizenship: values,
    })
  }

  updateTelephone = (values) => {
    this.update({
      Telephone: values,
    })
  }

  updateRecognized = (values) => {
    this.update({
      Recognized: values,
    })
  }

  updateAddress = (values) => {
    this.update({
      Address: values,
    })
  }

  updateDateDivorced = (values) => {
    this.update({
      DateDivorced: values,
    })
  }

  updateDivorceLocation = (values) => {
    this.update({
      DivorceLocation: values,
    })
  }

  updateStatus = (values) => {
    this.update({
      Status: values,
    })
  }

  updateDeceased = (values) => {
    this.update({
      Deceased: values,
    })
  }

  updateDeceasedAddress = (values) => {
    this.update({
      DeceasedAddress: values,
    })
  }

  updateDeceasedAddressNotApplicable = (values) => {
    const { DeceasedAddress } = this.props
    this.update({
      DeceasedAddress: values.applicable ? DeceasedAddress : {},
      DeceasedAddressNotApplicable: values,
    })
  }

  render() {
    const enteredCivilUnionMinDate = pickDate([this.props.applicantBirthdate, this.props.Birthdate])
    return (
      <div className="divorce">
        <Field
          title={i18n.t('relationships.civilUnion.heading.name')}
          optional
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels"
        >
          <Name
            name="Name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          help="relationships.civilUnion.divorce.help.birthdate"
          title={i18n.t('relationships.civilUnion.divorce.heading.birthdate')}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="datecontrol"
        >
          <DateControl
            name="birthdate"
            className="birthdate"
            {...this.props.Birthdate}
            relationship="Other"
            onUpdate={this.updateBirthdate}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.civilUnion.divorce.heading.birthplace')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Location
            name="birthplace"
            {...this.props.BirthPlace}
            layout={Location.BIRTHPLACE_WITHOUT_COUNTY}
            label={i18n.t('relationships.civilUnion.divorce.label.birthplace')}
            className="birthplace"
            onUpdate={this.updateBirthPlace}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.civilUnion.divorce.heading.citizenship')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Country
            name="Citizenship"
            multiple
            {...this.props.Citizenship}
            className="citizenship"
            onError={this.props.onError}
            onUpdate={this.updateCitizenship}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.civilUnion.divorce.heading.telephone')}
          className="override-required"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="telephone"
        >
          <Telephone
            name="Telephone"
            {...this.props.Telephone}
            onUpdate={this.updateTelephone}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          help="relationships.civilUnion.divorce.help.recognized"
          title={i18n.t('relationships.civilUnion.divorce.heading.recognized')}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="datecontrol"
        >
          <DateControl
            name="Recognized"
            minDateEqualTo
            prefix="civilUnion"
            minDate={enteredCivilUnionMinDate}
            className="recognized"
            {...this.props.Recognized}
            onUpdate={this.updateRecognized}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.civilUnion.divorce.heading.address')}
          optional
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels"
        >
          <Location
            name="address"
            className="location"
            {...this.props.Address}
            layout={Location.BIRTHPLACE_WITHOUT_COUNTY}
            label={i18n.t('relationships.civilUnion.label.location')}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          help="relationships.civilUnion.divorce.help.dateDivorced"
          title={i18n.t(
            'relationships.civilUnion.divorce.heading.dateDivorced'
          )}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="datecontrol"
        >
          <DateControl
            name="DateDivorced"
            prefix="divorceDate"
            className="date-divorced"
            {...this.props.DateDivorced}
            minDate={this.props.Recognized}
            minDateEqualTo
            onUpdate={this.updateDateDivorced}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('relationships.civilUnion.divorce.heading.status')}
          scrollIntoView={this.props.scrollIntoView}
          className="status"
        >
          <RadioGroup
            name="status"
            className="option-list option-list-vertical"
            selectedValue={(this.props.Status || {}).value}
            required={this.props.required}
            onError={this.props.onError}
          >
            <Radio
              label={i18n.t('relationships.civilUnion.divorce.label.divorced')}
              value="Divorced"
              className="divorced"
              onUpdate={this.updateStatus}
              onError={this.props.onError}
            />
            <Radio
              label={i18n.t('relationships.civilUnion.divorce.label.widowed')}
              value="Widowed"
              className="widowed"
              onUpdate={this.updateStatus}
              onError={this.props.onError}
            />
            <Radio
              label={i18n.t('relationships.civilUnion.divorce.label.annulled')}
              value="Annulled"
              className="annulled"
              onUpdate={this.updateStatus}
              onError={this.props.onError}
            />
          </RadioGroup>
        </Field>

        <Show
          when={['Divorced', 'Annulled'].includes(
            (this.props.Status || {}).value
          )}
        >
          <div>
            <Field
              title={i18n.t(
                'relationships.civilUnion.divorce.heading.divorceLocation'
              )}
              optional
              scrollIntoView={this.props.scrollIntoView}
              adjustFor="labels"
            >
              <Location
                className="divorce-location"
                {...this.props.DivorceLocation}
                layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
                label={i18n.t('relationships.civilUnion.label.location')}
                onUpdate={this.updateDivorceLocation}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t(
                'relationships.civilUnion.divorce.heading.deceased'
              )}
              className="deceased"
              scrollIntoView={this.props.scrollIntoView}
            >
              <RadioGroup
                name="deceased"
                className="option-list"
                selectedValue={(this.props.Deceased || {}).value}
                required={this.props.required}
                onError={this.props.onError}
              >
                <Radio
                  className="yes"
                  label={i18n.t(
                    'relationships.civilUnion.divorce.deceased.label.yes'
                  )}
                  value="Yes"
                  onUpdate={this.updateDeceased}
                  onError={this.props.onError}
                />
                <Radio
                  className="no widowed"
                  label={i18n.t(
                    'relationships.civilUnion.divorce.deceased.label.no'
                  )}
                  value="No"
                  onUpdate={this.updateDeceased}
                  onError={this.props.onError}
                />
                <Radio
                  label={i18n.t(
                    'relationships.civilUnion.divorce.deceased.label.dontKnow'
                  )}
                  className="dk"
                  value="DK"
                  onUpdate={this.updateDeceased}
                  onError={this.props.onError}
                />
              </RadioGroup>
            </Field>

            <Show when={(this.props.Deceased || {}).value === 'No'}>
              <Field
                title={i18n.t(
                  'relationships.civilUnion.divorce.heading.deceasedAddress'
                )}
                optional
                scrollIntoView={this.props.scrollIntoView}
              >
                <NotApplicable
                  name="DeceasedAddressNotApplicable"
                  className="deceased-notapplicable"
                  {...this.props.DeceasedAddressNotApplicable}
                  label={i18n.t(
                    'relationships.civilUnion.deceasedAddressNotApplicable.label'
                  )}
                  or={i18n.m(
                    'relationships.civilUnion.deceasedAddressNotApplicable.or'
                  )}
                  onError={this.props.onError}
                  onUpdate={this.updateDeceasedAddressNotApplicable}
                >
                  <Location
                    className="address-deceased"
                    {...this.props.DeceasedAddress}
                    layout={Location.ADDRESS}
                    geocode
                    showPostOffice
                    onUpdate={this.updateDeceasedAddress}
                    onError={this.props.onError}
                    required={this.props.required}
                  />
                </NotApplicable>
              </Field>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Divorce.defaultProps = {
  DeceasedAddressNotApplicable: { applicable: true },
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
