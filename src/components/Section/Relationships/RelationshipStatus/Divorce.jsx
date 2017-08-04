import React from 'react'
import { i18n } from '../../../../config'
import { Location, Field, DateControl, Show, RadioGroup, Radio,
         Telephone, Name, BirthPlace, NotApplicable } from '../../../Form'

export default class Divorce extends React.Component {
  constructor (props) {
    super(props)

    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
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
      Status: values.value
    })
  }

  updateDeceased (values) {
    this.update({
      Deceased: values.value
    })
  }

  updateDeceasedAddress (values) {
    this.update({
      DeceasedAddress: values
    })
  }

  updateDeceasedAddressNotApplicable (values) {
    this.update({
      DeceasedAddressNotApplicable: !values.applicable
    })
  }

  render () {
    return (
      <div className="divorce">
        <Field title={i18n.t('relationships.civilUnion.heading.name')}
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
               adjustFor="datecontrol">
          <DateControl name="birthdate"
                       className="birthdate"
                       {...this.props.Birthdate}
                       onUpdate={this.updateBirthdate}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.birthplace')}>
          <Location name="birthplace"
                    layout={Location.BIRTHPLACE}
                    label={i18n.t('relationships.civilUnion.divorce.label.birthplace')}
                    className="birthplace"
                    {...this.props.BirthPlace}
                    onUpdate={this.updateBirthPlace}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.telephone')}
               help="relationships.civilUnion.divorce.help.telephone"
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
               adjustFor="datecontrol">
          <DateControl name="Recognized"
                       className="recognized"
                       {...this.props.Recognized}
                       onUpdate={this.updateRecognized}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.address"
               title={i18n.t('relationships.civilUnion.divorce.heading.address')}
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
               adjustFor="datecontrol">
          <DateControl name="DateDivorced"
                       className="date-divorced"
                       {...this.props.DateDivorced}
                       onUpdate={this.updateDateDivorced}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.status')}
               className="status">
          <RadioGroup name="status" selectedValue={this.props.Status} required={this.props.required} onError={this.props.onError}>
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

        <Show when={['Divorced', 'Annulled'].includes(this.props.Status)}>
          <div>
            <Field title={i18n.t('relationships.civilUnion.divorce.heading.deceased')} className="deceased">
              <RadioGroup name="deceased" selectedValue={this.props.Deceased} required={this.props.required} onError={this.props.onError}>
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

            <Show when={this.props.Deceased === 'Yes'}>
              <Field title={i18n.t('relationships.civilUnion.divorce.heading.deceasedAddress')}>
                <NotApplicable name="DeceasedAddressNotApplicable"
                               className="deceased-notapplicable"
                               applicable={this.props.DeceasedAddressNotApplicable}
                               label={i18n.t('relationships.civilUnion.notApplicable.label')}
                               or={i18n.m('relationships.civilUnion.notApplicable.or')}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
