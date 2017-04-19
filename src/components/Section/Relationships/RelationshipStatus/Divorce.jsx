import React from 'react'
import { i18n } from '../../../../config'
import { Address, Field, DateControl, Show, RadioGroup, Radio, Telephone, Name, BirthPlace, NotApplicable } from '../../../Form'

export default class Divorce extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Name: props.Name,
      Birthdate: props.Birthdate,
      BirthPlace: props.BirthPlace,
      Telephone: props.Telephone,
      Recognized: props.Recognized,
      Address: props.Address,
      DateDivorced: props.DateDivorced,
      Status: props.Status,
      Deceased: props.Deceased,
      DeceasedAddress: props.DeceasedAddress
    }

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

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          Birthdate: this.state.Birthdate,
          BirthPlace: this.state.BirthPlace,
          Telephone: this.state.Telephone,
          Recognized: this.state.Recognized,
          Address: this.state.Address,
          DateDivorced: this.state.DateDivorced,
          Status: this.state.Status,
          Deceased: this.state.Deceased,
          DeceasedAddress: this.state.DeceasedAddress,
          DeceasedAddressNotApplicable: this.state.DeceasedAddressNotApplicable
        })
      }
    })
  }

  updateName (values) {
    this.update('Name', values)
  }

  updateBirthdate (values) {
    this.update('Birthdate', values)
  }

  updateBirthPlace (values) {
    this.update('BirthPlace', values)
  }

  updateTelephone (values) {
    this.update('Telephone', values)
  }

  updateRecognized (values) {
    this.update('Recognized', values)
  }

  updateAddress (values) {
    this.update('Address', values)
  }

  updateDateDivorced (values) {
    this.update('DateDivorced', values)
  }

  updateStatus (values) {
    this.update('Status', values.value)
  }

  updateDeceased (values) {
    this.update('Deceased', values.value)
  }

  updateDeceasedAddress (values) {
    this.update('DeceasedAddress', values)
  }

  updateDeceasedAddressNotApplicable (values) {
    this.update('DeceasedAddressNotApplicable', !values.applicable)
  }

  render () {
    return (
      <div className="divorce">
        <Field title={i18n.t('relationships.status.heading.name')}
          adjustFor="labels">
          <Name name="Name"
            {...this.state.Name}
            onUpdate={this.updateName}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field help="relationships.status.divorce.help.birthdate"
          title={i18n.t('relationships.status.divorce.heading.birthdate')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="birthdate"
            className="birthdate"
            {...this.state.Birthdate}
            onUpdate={this.updateBirthdate}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field help="relationships.status.help.birthplace"
          title={i18n.t('relationships.status.divorce.heading.birthplace')}>
          <BirthPlace name="birthplace"
            className="birthplace"
            {...this.state.BirthPlace}
            onUpdate={this.updateBirthPlace}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.status.divorce.heading.telephone')}
          help="alias.used.help"
          adjustFor="telephone"
          shrink={true}>
          <Telephone name="Telephone"
            {...this.state.Telephone}
            onUpdate={this.updateTelephone}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field help="relationships.status.divorce.help.recognized"
          title={i18n.t('relationships.status.divorce.heading.recognized')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="Recognized"
            className="recognized"
            {...this.state.Recognized}
            onUpdate={this.updateRecognized}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field help="relationships.status.divorce.help.address"
          title={i18n.t('relationships.status.divorce.heading.address')}
          shrink={true}
          adjustFor="labels">
          <Address name="address"
            className="location"
            {...this.state.Address}
            onUpdate={this.updateAddress}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field help="relationships.status.divorce.help.dateDivorced"
          title={i18n.t('relationships.status.divorce.heading.dateDivorced')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="DateDivorced"
            className="date-divorced"
            {...this.state.DateDivorced}
            onUpdate={this.updateDateDivorced}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.status.divorce.heading.status')}
          className="status">
          <RadioGroup name="status" selectedValue={this.state.Status}>
            <Radio
              label={i18n.m('relationships.status.divorce.label.divorced')}
              value="Divorced"
              className="divorced"
              onUpdate={this.updateStatus}
              onValidate={this.props.onValidate}
            />
            <Radio
              label={i18n.m('relationships.status.divorce.label.widowed')}
              value="Widowed"
              className="widowed"
              onUpdate={this.updateStatus}
              onValidate={this.props.onValidate}
            />
            <Radio
              label={i18n.m('relationships.status.divorce.label.annulled')}
              value="Annulled"
              className="annulled"
              onUpdate={this.updateStatus}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
        </Field>

        <Show when={['Divorced', 'Annulled'].includes(this.state.Status)}>
          <div>
            <Field title={i18n.t('relationships.status.divorce.heading.deceased')} className="deceased">
              <RadioGroup name="deceased" selectedValue={this.state.Deceased}>
                <Radio
                  className="yes"
                  label={i18n.t('relationships.status.divorce.deceased.label.yes')}
                  label="Yes"
                  value="Yes"
                  onUpdate={this.updateDeceased}
                  onValidate={this.props.onValidate}
                />
                <Radio
                  className="no"
                  label={i18n.t('relationships.status.divorce.deceased.label.no')}
                  value="No"
                  className="widowed"
                  onUpdate={this.updateDeceased}
                  onValidate={this.props.onValidate}
                />
                <Radio
                  label={i18n.t('relationships.status.divorce.deceased.label.dontKnow')}
                  className="dk"
                  value="DK"
                  onUpdate={this.updateDeceased}
                  onValidate={this.props.onValidate}
                />
              </RadioGroup>
            </Field>

            <Show when={this.state.Deceased === 'Yes'}>
              <Field title={i18n.t('relationships.status.divorce.heading.deceasedAddress')}>
                <NotApplicable name="DeceasedAddressNotApplicable"
                  className="deceased-notapplicable"
                  applicable={this.state.DeceasedAddressNotApplicable}
                  label={i18n.t('reference.label.idk')}
                  or={i18n.m('reference.para.or')}
                  onValidate={this.props.onValidate}
                  onUpdate={this.updateDeceasedAddressNotApplicable}>
                  <Address
                    className="address-deceased"
                    {...this.state.DeceasedAddress}
                    onUpdate={this.updateDeceasedAddress}
                    onValidate={this.props.onValidate}
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
