import React from 'react'
import { i18n } from '../../../../config'
import { Address, Field, DateControl, Show, RadioGroup, Radio, Telephone, Name, BirthPlace, NotApplicable, Location } from '../../../Form'

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
    if (this.props.onUpdate) {
      let obj = {
        Name: this.props.Name,
        Birthdate: this.props.Birthdate,
        BirthPlace: this.props.BirthPlace,
        Telephone: this.props.Telephone,
        Recognized: this.props.Recognized,
        Address: this.props.Address,
        DateDivorced: this.props.DateDivorced,
        Status: this.props.Status,
        Deceased: this.props.Deceased,
        DeceasedAddress: this.props.DeceasedAddress
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateName (values) {
    this.update([
      { name: 'Name', value: values }
    ])
  }

  updateBirthdate (values) {
    this.update([
      { name: 'Birthdate', value: values }
    ])
  }

  updateBirthPlace (values) {
    this.update([
      { name: 'BirthPlace', value: values }
    ])
  }

  updateTelephone (values) {
    this.update([
      { name: 'Telephone', value: values }
    ])
  }

  updateRecognized (values) {
    this.update([
      { name: 'Recognized', value: values }
    ])
  }

  updateAddress (values) {
    this.update([
      { name: 'Address', value: values }
    ])
  }

  updateDateDivorced (values) {
    this.update([
      { name: 'DateDivorced', value: values }
    ])
  }

  updateStatus (values) {
    this.update([
      { name: 'Status', value: values.value }
    ])
  }

  updateDeceased (values) {
    this.update([
      { name: 'Deceased', value: values.value }
    ])
  }

  updateDeceasedAddress (values) {
    this.update([
      { name: 'DeceasedAddress', value: values }
    ])
  }

  updateDeceasedAddressNotApplicable (values) {
    this.update([
      { name: 'DeceasedAddressNotApplicable', value: !values.applicable }
    ])
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
                />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.birthdate"
               title={i18n.t('relationships.civilUnion.divorce.heading.birthdate')}
               shrink={true}
               adjustFor="labels">
          <DateControl name="birthdate"
                       className="birthdate"
                       {...this.props.Birthdate}
                       onUpdate={this.updateBirthdate}
                       onError={this.props.onError}
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
                      />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.telephone')}
               help="relationships.civilUnion.divorce.help.telephone"
               adjustFor="telephone"
               shrink={true}>
          <Telephone name="Telephone"
                     {...this.props.Telephone}
                     onUpdate={this.updateTelephone}
                     onError={this.props.onError}
                     />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.recognized"
               title={i18n.t('relationships.civilUnion.divorce.heading.recognized')}
               shrink={true}
               adjustFor="labels">
          <DateControl name="Recognized"
                       className="recognized"
                       {...this.props.Recognized}
                       onUpdate={this.updateRecognized}
                       onError={this.props.onError}
                       />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.address"
               title={i18n.t('relationships.civilUnion.divorce.heading.address')}
               shrink={true}
               adjustFor="labels">
          <Address name="address"
                   className="location"
                   {...this.props.Address}
                   onUpdate={this.updateAddress}
                   onError={this.props.onError}
                   />
        </Field>

        <Field help="relationships.civilUnion.divorce.help.dateDivorced"
               title={i18n.t('relationships.civilUnion.divorce.heading.dateDivorced')}
               shrink={true}
               adjustFor="labels">
          <DateControl name="DateDivorced"
                       className="date-divorced"
                       {...this.props.DateDivorced}
                       onUpdate={this.updateDateDivorced}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('relationships.civilUnion.divorce.heading.status')}
               className="status">
          <RadioGroup name="status" selectedValue={this.props.Status}>
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
              <RadioGroup name="deceased" selectedValue={this.props.Deceased}>
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
                  <Address
                    className="address-deceased"
                    {...this.props.DeceasedAddress}
                    onUpdate={this.updateDeceasedAddress}
                    onError={this.props.onError}
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
  onError: (value, arr) => { return arr }
}
