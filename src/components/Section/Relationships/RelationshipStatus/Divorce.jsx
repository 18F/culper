import React from 'react'
import { i18n } from '../../../../config'
import { Location, Field, DateControl, Show, RadioGroup, Radio,
         Telephone, Name, NotApplicable, Country } from '../../../Form'

export default class Divorce extends React.Component {
  constructor (props) {
    super(props)

    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
    this.updateRecognized = this.updateRecognized.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateDateDivorced = this.updateDateDivorced.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateDeceased = this.updateDeceased.bind(this)
    this.updateDeceasedAddress = this.updateDeceasedAddress.bind(this)
    this.updateDeceasedAddressNotApplicable = this.updateDeceasedAddressNotApplicable.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Birthdate: this.props.Birthdate,
      BirthPlace: this.props.BirthPlace,
      Citizenship: this.props.Citizenship,
      Telephone: this.props.Telephone,
      Recognized: this.props.Recognized,
      Address: this.props.Address,
      DateDivorced: this.props.DateDivorced,
      Status: this.props.Status,
      Deceased: this.props.Deceased,
      DeceasedAddress: this.props.DeceasedAddress,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateBirthdate (values) {
    this.update({
      Birthdate: values
    })
  }

  updateBirthPlace (values) {
    this.update({
      BirthPlace: values
    })
  }

  updateCitizenship (values) {
    this.update({
      Citizenship: values
    })
  }

  updateTelephone (values) {
    this.update({
      Telephone: values
    })
  }

  updateRecognized (values) {
    this.update({
      Recognized: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateDateDivorced (values) {
    this.update({
      DateDivorced: values
    })
  }

  updateStatus (values) {
    this.update({
      Status: values
    })
  }

  updateDeceased (values) {
    this.update({
      Deceased: values
    })
  }

  updateDeceasedAddress (values) {
    this.update({
      DeceasedAddress: values
    })
  }

  updateDeceasedAddressNotApplicable (values) {
    this.update({
      DeceasedAddressNotApplicable: values
    })
  }

  render () {
    return (
      <div className="divorce">
        <Field title={i18n.t('relationships.civilUnion.heading.name')}
               optional={true}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="labels">
          <Name name="Name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.birthdate"
               title={i18n.t('relationships.civilUnion.divorce.heading.birthdate')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="datecontrol">
          <DateControl name="birthdate"
                       className="birthdate"
                       {...this.props.Birthdate}
                       relationship="Other"
                       onUpdate={this.updateBirthdate}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.birthplace')}
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="birthplace"
                    {...this.props.BirthPlace}
                    layout={Location.BIRTHPLACE}
                    label={i18n.t('relationships.civilUnion.divorce.label.birthplace')}
                    className="birthplace"
                    onUpdate={this.updateBirthPlace}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.citizenship')}
               scrollIntoView={this.props.scrollIntoView}>
          <Country name="Citizenship"
                   multiple={true}
                   {...this.props.Citizenship}
                   className="citizenship"
                   onError={this.props.onError}
                   onUpdate={this.updateCitizenship}
                   required={this.props.required}
                   />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.telephone')}
               className="override-required"
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="telephone">
          <Telephone name="Telephone"
                     {...this.props.Telephone}
                     onUpdate={this.updateTelephone}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.recognized"
               title={i18n.t('relationships.civilUnion.divorce.heading.recognized')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="datecontrol">
          <DateControl name="Recognized"
                       className="recognized"
                       {...this.props.Recognized}
                       onUpdate={this.updateRecognized}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.address')}
               optional={true}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="labels">
          <Location name="address"
                    className="location"
                    {...this.props.Address}
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.dateDivorced"
               title={i18n.t('relationships.civilUnion.divorce.heading.dateDivorced')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="datecontrol">
          <DateControl name="DateDivorced"
                       className="date-divorced"
                       {...this.props.DateDivorced}
                       minDate={(this.props.Recognized || {}).date}
                       onUpdate={this.updateDateDivorced}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.status')}
               scrollIntoView={this.props.scrollIntoView}
               className="status">
          <RadioGroup name="status" selectedValue={(this.props.Status || {}).value} required={this.props.required} onError={this.props.onError}>
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

        <Show when={['Divorced', 'Annulled'].includes((this.props.Status || {}).value)}>
          <div>
            <Field title={i18n.t('relationships.civilUnion.divorce.heading.deceased')} className="deceased"
                   scrollIntoView={this.props.scrollIntoView}>
              <RadioGroup name="deceased" selectedValue={(this.props.Deceased || {}).value} required={this.props.required} onError={this.props.onError}>
                <Radio
                  className="yes"
                  label={i18n.t('relationships.civilUnion.divorce.deceased.label.yes')}
                  label="Yes"
                  value="Yes"
                  onUpdate={this.updateDeceased}
                  onError={this.props.onError}
                  />
                <Radio
                  className="no"
                  label={i18n.t('relationships.civilUnion.divorce.deceased.label.no')}
                  value="No"
                  className="widowed"
                  onUpdate={this.updateDeceased}
                  onError={this.props.onError}
                  />
                <Radio
                  label={i18n.t('relationships.civilUnion.divorce.deceased.label.dontKnow')}
                  className="dk"
                  value="DK"
                  onUpdate={this.updateDeceased}
                  onError={this.props.onError}
                  />
              </RadioGroup>
            </Field>

            <Show when={(this.props.Deceased || {}).value === 'No'}>
              <Field title={i18n.t('relationships.civilUnion.divorce.heading.deceasedAddress')}
                     optional={true}
                     scrollIntoView={this.props.scrollIntoView}>
                <NotApplicable name="DeceasedAddressNotApplicable"
                               className="deceased-notapplicable"
                               {...this.props.DeceasedAddressNotApplicable}
                               label={i18n.t('relationships.civilUnion.deceasedAddressNotApplicable.label')}
                               or={i18n.m('relationships.civilUnion.deceasedAddressNotApplicable.or')}
                               onError={this.props.onError}
                               onUpdate={this.updateDeceasedAddressNotApplicable}>
                  <Location className="address-deceased"
                            {...this.props.DeceasedAddress}
                            layout={Location.ADDRESS}
                            geocode={true}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
