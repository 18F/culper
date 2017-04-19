import React from 'react'
import { i18n } from '../../../../config'
import { Field, DateControl, Name, BirthPlace, ForeignBornDocuments, SSN, MaidenName, DateRange, NotApplicable } from '../../../Form'

export default class Cohabitant extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Name: props.Name,
      Birthdate: props.Birthdate,
      BirthPlace: props.BirthPlace,
      ForeignBornDocument: props.ForeignBornDocument,
      SSN: props.SSN,
      OtherName: props.OtherName,
      OtherNameNotApplicable: props.OtherNameNotApplicable,
      OtherNameMaiden: props.OtherNameMaiden,
      OtherNameUsed: props.OtherNameUsed,
      CohabitationBegan: props.CohabitationBegan
    }

    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateForeignBornDocument = this.updateForeignBornDocument.bind(this)
    this.updateSSN = this.updateSSN.bind(this)
    this.updateOtherName = this.updateOtherName.bind(this)
    this.updateOtherNameNotApplicable = this.updateOtherNameNotApplicable.bind(this)
    this.updateOtherNameMaiden = this.updateOtherNameMaiden.bind(this)
    this.updateOtherNameUsed = this.updateOtherNameUsed.bind(this)
    this.updateCohabitationBegan = this.updateCohabitationBegan.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          Birthdate: this.state.Birthdate,
          BirthPlace: this.state.BirthPlace,
          ForeignBornDocument: this.state.ForeignBornDocument,
          SSN: this.state.SSN,
          OtherName: this.state.OtherName,
          OtherNameNotApplicable: this.state.OtherNameNotApplicable,
          OtherNameMaiden: this.state.OtherNameMaiden,
          OtherNameUsed: this.state.OtherNameUsed,
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
    this.update('BirthPlace', values)
  }

  updateForeignBornDocument (values) {
    this.update('ForeignBornDocument', values)
  }

  updateSSN (values) {
    this.update('SSN', values.value)
  }

  updateOtherName (values) {
    this.update('OtherName', values)
  }

  updateOtherNameMaiden (values) {
    this.update('OtherNameMaiden', values)
  }

  updateOtherNameUsed (values) {
    this.update('OtherNameUsed', values)
  }

  updateOtherNameNotApplicable (values) {
    this.update('OtherNameNotApplicable', values)
  }

  updateCohabitationBegan (values) {
    this.update('CohabitationBegan', values)
  }

  render () {
    return (
      <div className="cohabitant">
        <Field title={i18n.t('relationships.status.cohabitant.heading.name')}
          adjustFor="labels">
          <Name name="Name"
            className="cohabitant-name"
            {...this.state.Name}
            onUpdate={this.updateName}
            onValidate={this.handleValidation}
          />
        </Field>

        <Field help="relationships.status.cohabitant.help.birthdate"
          title={i18n.t('relationships.status.cohabitant.heading.birthdate')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="birthdate"
            className="birthdate"
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
          <NotApplicable name="OtherNameNotApplicable"
            className="othername"
            applicable={this.state.OtherNameNotApplicable}
            label={i18n.t('reference.label.idk')}
            or={i18n.m('reference.para.or')}
            onUpdate={this.updateOtherNameNotApplicable}>
            <Name name="othername"
              className="othername"
              {...this.state.OtherName}
              onUpdate={this.updateOtherName}
              onValidate={this.handleValidation}
            />
            <Field title={i18n.t('relationships.status.cohabitant.othernames.heading.maiden')}
              help="alias.maiden.help"
              adjustFor="buttons"
              shrink={true}>
              <MaidenName name="OtherNameMaiden"
                className="othername"
                {...this.state.OtherNameMaiden}
                onUpdate={this.updateOtherNameMaiden}
                onValidate={this.handleValidation}
              />
            </Field>

            <Field title={i18n.t('relationships.status.cohabitant.othernames.heading.used')}
              help="alias.used.help"
              adjustFor="daterange"
              shrink={true}>
              <DateRange name="OtherNameUsed"
                className="othername"
                {...this.state.OtherNameUsed}
                onUpdate={this.updateOtherNameUsed}
                onValidate={this.handleValidation}
              />
            </Field>
          </NotApplicable>
        </Field>

        <Field help="relationships.status.cohabitant.help.cohabitationBegan"
          title={i18n.t('relationships.status.cohabitant.heading.cohabitationBegan')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="cohabitationBegan"
            className="cohabitation-began"
            {...this.state.CohabitationBegan}
            onUpdate={this.updateCohabitationBegan}
            onValidate={this.handleValidation}
          />
        </Field>
      </div>
    )
  }
}
