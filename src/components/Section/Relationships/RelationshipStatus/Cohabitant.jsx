import React from 'react'
import { i18n } from '../../../../config'
import { Address, Field, DateControl, ValidationElement, Show, RadioGroup, Radio, Email, Telephone, Name, BirthPlace, ForeignBornDocuments, SSN, MaidenName, DateRange } from '../../../Form'

export default class Cohabitant extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Name: props.Name,
      Birthdate: props.Birthdate,
      Birthplace: props.Birthplace,
      ForeignBornDocument: props.ForeignBornDocument,
      SSN: props.SSN,
      OtherName: props.OtherName,
      MaidenName: props.MaidenName,
      MaidenNameUsed: props.MaidenNameUsed,
      CohabitationBegan: props.CohabitationBegan
    }

    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateForeignBornDocument = this.updateForeignBornDocument.bind(this)
    this.updateSSN = this.updateSSN.bind(this)
    this.updateOtherName = this.updateOtherName.bind(this)
    this.updateMaidenName = this.updateMaidenName.bind(this)
    this.updateMaidenNameUsed = this.updateMaidenNameUsed.bind(this)
    this.updateCohabitationBegan = this.updateCohabitationBegan.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          Birthdate: this.state.Birthdate,
          Birthplace: this.state.BirthPlace,
          ForeignBornDocument: this.state.ForeignBornDocument,
          SSN: this.state.SSN,
          OtherName: this.state.OtherName,
          MaidenName: this.state.MaidenName,
          MaidenNameUsed: this.state.MaidenNameUsed,
          CohabitationBegan: this.state.CohabitationBegan
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
    this.update('Birthplace', values)
  }

  updateForeignBornDocument (values) {
    this.update('ForeignBornDocument', values)
  }

  updateSSN (values) {
    this.update('SSN', values)
  }

  updateOtherName (values) {
    this.update('OtherName', values)
  }

  updateMaidenName (values) {
    this.update('MaidenName', values)
  }

  updateMaidenNameUsed (values) {
    this.update('MaidenNameUsed', values)
  }

  updateCohabitationBegan (values) {
    this.update('CohabitationBegan', values)
  }

  render () {
    return (
      <div>
        <Field title={i18n.t('relationships.status.cohabitant.heading.name')}
          adjustFor="labels">
          <Name name="Name"
            {...this.state.Name}
          />
        </Field>

        <Field help="relationships.status.cohabitant.help.birthdate"
          title={i18n.t('relationships.status.cohabitant.heading.birthdate')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="birthdate"
            {...this.state.Birthdate}
            onUpdate={this.updateBirthdate}
            onValidate={this.handleValidation}
          />
        </Field>

        <Field help="relationships.status.cohabitanthelp.birthplace"
          title={i18n.t('relationships.status.cohabitant.heading.birthplace')}>
          <BirthPlace name="birthplace"
            {...this.state.BirthPlace}
            onUpdate={this.updateBirthPlace}
            onValidate={this.handleValidation}
          />
        </Field>
        <Field help="relationships.status.cohabitant.help.foreignBornDocument"
          title={i18n.t('relationships.status.cohabitant.heading.foreignBornDocument')}>
          <ForeignBornDocuments name="foreignBornDocument"
            {...this.state.ForeignBornDocument}
            onUpdate={this.updateForeignBornDocument}
            onValidate={this.handleValidation}
          />
        </Field>

        <Field help="relationships.status.cohabitant.help.ssn"
          title={i18n.t('relationships.status.cohabitant.heading.ssn')}>
          <SSN name="ssn"
            {...this.state.SSN}
            onUpdate={this.updateSSN}
            onValidate={this.handleValidation}
          />
        </Field>
        <Field title={i18n.t('relationships.status.cohabitant.heading.othernames')}>
          <Name name="othername"
            {...this.state.Othername}
            onUpdate={this.updateOtherName}
            onValidate={this.handleValidation}
          />
        </Field>

        <Field title={i18n.t('relationships.status.cohabitant.othernames.heading.maiden')}
          help="alias.maiden.help"
          adjustFor="buttons"
          shrink={true}>
          <MaidenName name="MaidenName"
            {...this.state.MaidenName}
          />
        </Field>

        <Field title={i18n.t('relationships.status.cohabitant.othernames.heading.used')}
          help="alias.used.help"
          adjustFor="daterange"
          shrink={true}>
          <DateRange name="DatesUsed"
            {...this.state.MaidenNameUsed}
          />
        </Field>

        <Field help="relationships.status.cohabitant.help.cohabitationBegan"
          title={i18n.t('relationships.status.cohabitant.heading.cohabitationBegan')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="cohabitationBegan"
            {...this.state.CohabitationBegan}
            onUpdate={this.updateCohabitationBegan}
            onValidate={this.handleValidation}
          />
        </Field>
      </div>
    )
  }
}
