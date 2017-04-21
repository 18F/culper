import React from 'react'
import { i18n } from '../../../../config'
import { Field, DateControl, Name, BirthPlace, ForeignBornDocuments, SSN, MaidenName, DateRange, NotApplicable, ValidationElement, Suggestions } from '../../../Form'
import { CohabitantValidator } from '../../../../validators/cohabitant'

export default class Cohabitant extends ValidationElement {
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
      CohabitationBegan: props.CohabitationBegan,
      SameSpouse: props.SameSpouse
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
    this.renderSpouseSuggestion = this.renderSpouseSuggestion.bind(this)
    this.dismissSpouseSuggestion = this.dismissSpouseSuggestion.bind(this)
    this.onSpouseSuggestion = this.onSpouseSuggestion.bind(this)
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
          CohabitationBegan: this.state.CohabitationBegan,
          SameSpouseConfirmed: this.state.SameSpouseConfirmed
        })
      }
    })
  }

  updateName (values) {
    if (this.props.SameSpouseConfirmed) {
      return
    }
    const similarSpouse = new CohabitantValidator({Name: values}).similarSpouse(this.props.spouse)
    if (similarSpouse) {
      this.update('SameSpouse', true)
    }
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

  renderSpouseSuggestion () {
    const spouse = this.props.spouse
    const name = spouse
      ? `${spouse.first || ''} ${spouse.middle || ''} ${spouse.last || ''}`.trim()
      : ''
    return (
      <div>
        {name}
      </div>
    )
  }

  dismissSpouseSuggestion () {
    this.update('SameSpouse', false)
    this.update('Name', {})
  }

  onSpouseSuggestion () {
    this.update('SameSpouseConfirmed', true)
    this.update('SameSpouse', false)
  }

  render () {
    return (
      <div className="cohabitant">
        <Suggestions
          suggestionTitle={i18n.t('relationships.status.cohabitant.suggestion.title')}
          suggestionParagraph={i18n.m('relationships.status.cohabitant.suggestion.paragraph')}
          suggestionLabel={i18n.t('relationships.status.cohabitant.suggestion.label')}
          suggestionDismissLabel={i18n.t('relationships.status.cohabitant.suggestion.dismissLabel')}
          suggestionLabel={i18n.t('relationships.status.cohabitant.suggestion.label')}
          suggestionUseLabel={i18n.t('relationships.status.cohabitant.suggestion.useLabel')}
          suggestions={[this.props.spouse]}
          renderSuggestion={this.renderSpouseSuggestion}
          withSuggestions={false}
          show={this.state.SameSpouse}
          onDismiss={this.dismissSpouseSuggestion}
          onSuggestion={this.onSpouseSuggestion}>
          <Field title={i18n.t('relationships.status.cohabitant.heading.name')}
            adjustFor="labels">
            <Name name="Name"
              className="cohabitant-name"
              {...this.state.Name}
              onUpdate={this.updateName}
              onValidate={this.props.onValidate}
            />
          </Field>
        </Suggestions>

        <Field help="relationships.status.cohabitant.help.birthdate"
          title={i18n.t('relationships.status.cohabitant.heading.birthdate')}
          shrink={true}
          adjustFor="labels">
          <DateControl name="birthdate"
            className="birthdate"
            {...this.state.Birthdate}
            onUpdate={this.updateBirthdate}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.status.cohabitant.heading.birthplace')}>
          <BirthPlace name="birthplace"
            label={i18n.t('relationships.status.cohabitant.label.birthplace')}
            {...this.state.BirthPlace}
            onUpdate={this.updateBirthPlace}
            onValidate={this.props.onValidate}
          />
        </Field>
        <Field help="relationships.status.cohabitant.help.foreignBornDocument"
          title={i18n.t('relationships.status.cohabitant.heading.foreignBornDocument')}>
          <ForeignBornDocuments name="foreignBornDocument"
            {...this.state.ForeignBornDocument}
            onUpdate={this.updateForeignBornDocument}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field help="relationships.status.cohabitant.help.ssn"
          title={i18n.t('relationships.status.cohabitant.heading.ssn')}>
          <SSN name="ssn"
            {...this.state.SSN}
            onUpdate={this.updateSSN}
            onValidate={this.props.onValidate}
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
              onValidate={this.props.onValidate}
            />
            <Field title={i18n.t('relationships.status.cohabitant.othernames.heading.maiden')}
              help="alias.maiden.help"
              adjustFor="buttons"
              shrink={true}>
              <MaidenName name="OtherNameMaiden"
                className="othername"
                {...this.state.OtherNameMaiden}
                onUpdate={this.updateOtherNameMaiden}
                onValidate={this.props.onValidate}
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
                onValidate={this.props.onValidate}
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
            onValidate={this.props.onValidate}
          />
        </Field>
      </div>
    )
  }
}

Cohabitant.defaultProps = {
  SameSpouse: false
}
