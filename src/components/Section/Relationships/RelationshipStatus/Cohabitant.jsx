import React from 'react'
import { i18n } from '../../../../config'
import { Field, DateControl, Name, BirthPlace, ForeignBornDocuments, SSN,
         MaidenName, DateRange, NotApplicable, ValidationElement,
         Suggestions, Show, Country, Location } from '../../../Form'
import { CohabitantValidator } from '../../../../validators/cohabitant'

export default class Cohabitant extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateForeignBornDocument = this.updateForeignBornDocument.bind(this)
    this.updateSSN = this.updateSSN.bind(this)
    this.updateOtherName = this.updateOtherName.bind(this)
    this.updateOtherNameNotApplicable = this.updateOtherNameNotApplicable.bind(this)
    this.updateOtherNameMaiden = this.updateOtherNameMaiden.bind(this)
    this.updateOtherNameUsed = this.updateOtherNameUsed.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateCohabitationBegan = this.updateCohabitationBegan.bind(this)
    this.renderSpouseSuggestion = this.renderSpouseSuggestion.bind(this)
    this.dismissSpouseSuggestion = this.dismissSpouseSuggestion.bind(this)
    this.onSpouseSuggestion = this.onSpouseSuggestion.bind(this)
    this.clear = this.clear.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Birthdate: this.props.Birthdate,
      BirthPlace: this.props.BirthPlace,
      ForeignBornDocument: this.props.ForeignBornDocument,
      SSN: this.props.SSN,
      OtherName: this.props.OtherName,
      OtherNameNotApplicable: this.props.OtherNameNotApplicable,
      OtherNameMaiden: this.props.OtherNameMaiden,
      OtherNameUsed: this.props.OtherNameUsed,
      Citizenship: this.props.Citizenship,
      CohabitationBegan: this.props.CohabitationBegan,
      SameSpouse: this.props.SameSpouse,
      ...queue
    })
  }

  clear () {
    const state = {
      Name: {},
      Birthdate: null,
      BirthPlace: null,
      ForeignBornDocument: null,
      SSN: null,
      OtherName: null,
      OtherNameNotApplicable: null,
      OtherNameMaiden: null,
      OtherNameUsed: null,
      Citizenship: null,
      CohabitationBegan: null,
      SameSpouse: false,
      SameSpouseConfirmed: false
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(state)
    }
  }

  updateName (values) {
    if (this.props.SameSpouseConfirmed) {
      return
    }

    const similarSpouse = new CohabitantValidator({Name: values}).similarSpouse(this.props.spouse)
    this.update({
      Name: values,
      SameSpouse: similarSpouse
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

  updateForeignBornDocument (values) {
    this.update({
      ForeignBornDocument: values
    })
  }

  updateSSN (values) {
    this.update({
      SSN: values.value || ''
    })
  }

  updateOtherName (values) {
    this.update({
      OtherName: values
    })
  }

  updateOtherNameMaiden (values) {
    this.update({
      OtherNameMaiden: values
    })
  }

  updateOtherNameUsed (values) {
    this.update({
      OtherNameUsed: values
    })
  }

  updateOtherNameNotApplicable (values) {
    this.update({
      OtherNameNotApplicable: values
    })
  }

  updateCitizenship (values) {
    this.update({
      Citizenship: values
    })
  }

  updateCohabitationBegan (values) {
    this.update({
      CohabitationBegan: values
    })
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

  onSpouseSuggestion () {
    this.clear()
  }

  dismissSpouseSuggestion () {
    this.update({
      SameSpouseConfirmed: true,
      SameSpouse: false
    })
  }

  render () {
    return (
      <div className="cohabitant">
        <Suggestions className="spouse-suggestion"
                     suggestionTitle={i18n.t('relationships.cohabitant.suggestion.title')}
                     suggestionParagraph={i18n.m('relationships.cohabitant.suggestion.paragraph')}
                     suggestionLabel={i18n.t('relationships.cohabitant.suggestion.label')}
                     suggestionDismissLabel={i18n.t('relationships.cohabitant.suggestion.dismissLabel')}
                     suggestionLabel={i18n.t('relationships.cohabitant.suggestion.label')}
                     suggestionUseLabel={i18n.t('relationships.cohabitant.suggestion.useLabel')}
                     suggestions={[this.props.spouse]}
                     renderSuggestion={this.renderSpouseSuggestion}
                     withSuggestions={false}
                     show={this.props.SameSpouse}
                     onDismiss={this.dismissSpouseSuggestion}
                     onSuggestion={this.onSpouseSuggestion}>
          <div>
            <h3>{i18n.t('relationships.cohabitant.heading.name')}</h3>
            <Name name="Name"
                  className="cohabitant-name"
                  {...this.props.Name}
                  onUpdate={this.updateName}
                  onError={this.props.onError}
                  />
          </div>
        </Suggestions>

        <Field help="relationships.cohabitant.help.birthdate"
               title={i18n.t('relationships.cohabitant.heading.birthdate')}
               shrink={true}
               adjustFor="labels">
          <DateControl name="birthdate"
                       className="birthdate"
                       {...this.props.Birthdate}
                       onUpdate={this.updateBirthdate}
                       onError={this.props.onError}
                       />
        </Field>

        <h3>{i18n.t('relationships.cohabitant.heading.birthplace')}</h3>
        <Location name="birthplace"
                    layout={Location.BIRTHPLACE}
                    className="birthplace"
                    label={i18n.t('relationships.cohabitant.label.birthplace')}
                    {...this.props.BirthPlace}
                    onUpdate={this.updateBirthPlace}
                    onError={this.props.onError}
                    />

        <Show when={this.props.BirthPlace && this.props.BirthPlace.country !== 'United States'}>
          <Field help="relationships.cohabitant.help.foreignBornDocument"
                 title={i18n.t('relationships.cohabitant.heading.foreignBornDocument')}>
            <ForeignBornDocuments name="foreignBornDocument"
                                  {...this.props.ForeignBornDocument}
                                  onUpdate={this.updateForeignBornDocument}
                                  onError={this.props.onError}
                                  />
          </Field>
        </Show>

        <h3>{i18n.t('relationships.cohabitant.heading.ssn')}</h3>
        <Field help="identification.ssn.help">
          <SSN name="ssn"
               {...this.props.SSN}
               onUpdate={this.updateSSN}
               onError={this.props.onError}
               />
        </Field>

        <h3>{i18n.t('relationships.cohabitant.heading.othernames')}</h3>
        <NotApplicable name="OtherNameNotApplicable"
                       className="othername"
                       applicable={this.props.OtherNameNotApplicable}
                       label={i18n.t('reference.label.idk')}
                       or={i18n.m('reference.para.or')}
                       onUpdate={this.updateOtherNameNotApplicable}
                       onError={this.props.onError}>
          <Name name="othername"
                className="othername"
                {...this.props.OtherName}
                onUpdate={this.updateOtherName}
                onError={this.props.onError}
                />
          <Field title={i18n.t('relationships.cohabitant.othernames.heading.maiden')}
                 help="alias.maiden.help"
                 adjustFor="buttons"
                 shrink={true}>
            <MaidenName name="OtherNameMaiden"
                        className="othername"
                        {...this.props.OtherNameMaiden}
                        onUpdate={this.updateOtherNameMaiden}
                        onError={this.props.onError}
                        />
          </Field>

          <Field title={i18n.t('relationships.cohabitant.othernames.heading.used')}
                 help="alias.used.help"
                 adjustFor="daterange"
                 shrink={true}>
            <DateRange name="OtherNameUsed"
                       className="othername"
                       {...this.props.OtherNameUsed}
                       onUpdate={this.updateOtherNameUsed}
                       onError={this.props.onError}
                       />
          </Field>
        </NotApplicable>

        <Field title={i18n.t('relationships.cohabitant.heading.citizenship')}
               help="relationships.cohabitant.help.citizenship"
               adjustFor="country">
          <Country name="Citizenship"
                   {...this.props.Citizenship}
                   multiple={true}
                   className="relationships-cohabitant-citizenship"
                   onUpdate={this.updateCitizenship}
                   onError={this.props.onError}
                   />
        </Field>

        <Field help="relationships.cohabitant.help.cohabitationBegan"
               title={i18n.t('relationships.cohabitant.heading.cohabitationBegan')}
               shrink={true}
               adjustFor="labels">
          <DateControl name="cohabitationBegan"
                       className="cohabitation-began"
                       {...this.props.CohabitationBegan}
                       onUpdate={this.updateCohabitationBegan}
                       onError={this.props.onError}
                       />
        </Field>
      </div>
    )
  }
}

Cohabitant.defaultProps = {
  Name: {},
  Birthdate: {},
  BirthPlace: {},
  ForeignBornDocument: {},
  SSN: {},
  OtherName: {},
  OtherNameNotApplicable: {},
  OtherNameMaiden: {},
  OtherNameUsed: {},
  Citizenship: {},
  CohabitationBegan: {},
  SameSpouse: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
