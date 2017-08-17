import React from 'react'
import { i18n } from '../../../../config'
import { Field, DateControl, Name, BranchCollection, ForeignBornDocuments, SSN,
         MaidenName, DateRange, ValidationElement,
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
    this.updateOtherNames = this.updateOtherNames.bind(this)
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
      OtherNames: this.props.OtherNames,
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
      OtherNames: null,
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
      SSN: values
    })
  }

  updateOtherNames (values) {
    this.update({
      OtherNames: values
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
                     onSuggestion={this.onSpouseSuggestion}
                     />
       <Field title={i18n.t('relationships.cohabitant.heading.name')}
         scrollIntoView={this.props.scrollIntoView}>
          <Name name="Name"
                className="cohabitant-name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />
      </Field>

        <Field help="relationships.cohabitant.help.birthdate"
               title={i18n.t('relationships.cohabitant.heading.birthdate')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="datecontrol">
          <DateControl name="birthdate"
                       className="birthdate"
                       {...this.props.Birthdate}
                       onUpdate={this.updateBirthdate}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('relationships.cohabitant.heading.birthplace')}
          scrollIntoView={this.props.scrollIntoView}>
          <Location name="birthplace"
                      layout={Location.BIRTHPLACE}
                      className="birthplace"
                      label={i18n.t('relationships.cohabitant.label.birthplace')}
                      {...this.props.BirthPlace}
                      onUpdate={this.updateBirthPlace}
                      onError={this.props.onError}
                      required={this.props.required}
                      />
        </Field>

        <Show when={this.props.BirthPlace && this.props.BirthPlace.country !== 'United States'}>
          <Field help="relationships.cohabitant.help.foreignBornDocument"
                 title={i18n.t('relationships.cohabitant.heading.foreignBornDocument')}
                 scrollIntoView={this.props.scrollIntoView}
                 adjustFor="p">
            <ForeignBornDocuments name="foreignBornDocument"
                                  {...this.props.ForeignBornDocument}
                                  onUpdate={this.updateForeignBornDocument}
                                  onError={this.props.onError}
                                  required={this.props.required}
                                  />
          </Field>
        </Show>

        <Field title={i18n.t('relationships.cohabitant.heading.ssn')}
               help="identification.ssn.help"
               scrollIntoView={this.props.scrollIntoView}>
          <SSN name="ssn"
               {...this.props.SSN}
               onUpdate={this.updateSSN}
               onError={this.props.onError}
               required={this.props.required}
               />
        </Field>

        <BranchCollection label={i18n.t('relationships.cohabitant.heading.othernames')}
                          className="cohabitant-othernames"
                          appendLabel={i18n.m('relationships.cohabitant.heading.appendOthernames')}
                          items={this.props.OtherNames}
                          onError={this.props.onError}
                          onUpdate={this.updateOtherNames}
                          required={this.props.required}
                          scrollIntoView={this.props.scrollIntoView}>

          <Field title={i18n.t('relationships.cohabitant.othernames.heading.name')}
            scrollIntoView={this.props.scrollIntoView}>
            <Name name="Othername"
                  bind={true}
                  onError={this.props.onError}
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                  />
          </Field>

          <Field title={i18n.t('relationships.cohabitant.othernames.heading.maiden')}
                 help="alias.maiden.help"
                 adjustFor="buttons"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <MaidenName name="MaidenName"
                        bind={true}
                        onError={this.props.onError}
                        required={this.props.required}
                        />
          </Field>

          <Field title={i18n.t('relationships.cohabitant.othernames.heading.used')}
                 adjustFor="daterange"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <DateRange name="DatesUsed"
                       bind={true}
                       className="datesused"
                       onError={this.props.onError}
                       required={this.props.required}
                       />
          </Field>
        </BranchCollection>

        <Field title={i18n.t('relationships.cohabitant.heading.citizenship')}
               help="relationships.cohabitant.help.citizenship"
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="country">
          <Country name="Citizenship"
                   {...this.props.Citizenship}
                   multiple={true}
                   className="relationships-cohabitant-citizenship"
                   onUpdate={this.updateCitizenship}
                   onError={this.props.onError}
                   required={this.props.required}
                   />
        </Field>

        <Field help="relationships.cohabitant.help.cohabitationBegan"
               title={i18n.t('relationships.cohabitant.heading.cohabitationBegan')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="datecontrol">
          <DateControl name="cohabitationBegan"
                       className="cohabitation-began"
                       {...this.props.CohabitationBegan}
                       onUpdate={this.updateCohabitationBegan}
                       onError={this.props.onError}
                       required={this.props.required}
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
  OtherNames: [],
  Citizenship: {},
  CohabitationBegan: {},
  SameSpouse: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
