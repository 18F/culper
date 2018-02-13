import React from 'react'
import ValidationElement from '../ValidationElement'
import { i18n } from '../../../config'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import Textarea from '../Textarea'
import Text from '../Text'
import Show from '../Show'
import Field from '../Field'
import DateControl from '../DateControl'
import NotApplicable from '../NotApplicable'

export default class ForeignBornDocuments extends ValidationElement {
  constructor (props) {
    super(props)

    this.updateDocumentType = this.updateDocumentType.bind(this)
    this.updateOtherExplanation = this.updateOtherExplanation.bind(this)
    this.updateDocumentNumber = this.updateDocumentNumber.bind(this)
    this.updateDocumentExpiration = this.updateDocumentExpiration.bind(this)
    this.updateDocumentExpirationNotApplicable = this.updateDocumentExpirationNotApplicable.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      DocumentType: this.props.DocumentType,
      OtherExplanation: this.props.OtherExplanation,
      DocumentNumber: this.props.DocumentNumber,
      DocumentExpiration: this.props.DocumentExpiration,
      DocumentExpirationNotApplicable: this.props.DocumentExpirationNotApplicable,
      ...queue
    })
  }

  updateDocumentType (values) {
    this.update({
      DocumentType: values
    })
  }

  updateOtherExplanation (values) {
    this.update({
      OtherExplanation: values
    })
  }

  updateDocumentNumber (values) {
    this.update({
      DocumentNumber: values
    })
  }

  updateDocumentExpiration (values) {
    this.update({
      DocumentExpiration: values
    })
  }

  updateDocumentExpirationNotApplicable (values) {
    this.update({
      DocumentExpirationNotApplicable: values
    })
  }

  render () {
    return (
      <div className="foreign-born-documents">
        <Field help="relationships.civilUnion.help.foreignBornDocument"
               title={i18n.t('relationships.civilUnion.heading.foreignBornDocument')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="p">
          {i18n.t('foreignBornDocuments.para.bornToUSParents')}
          <RadioGroup name="born" selectedValue={(this.props.DocumentType || {}).value} required={this.props.required} onError={this.props.onError}>
            <Radio className="born"
                   label={i18n.m('foreignBornDocuments.bornToUSParents.label.fs240')}
                   value="FS240"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="born"
                   label={i18n.m('foreignBornDocuments.bornToUSParents.label.ds1350')}
                   value="DS1350"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
          </RadioGroup>

          {i18n.t('foreignBornDocuments.para.naturalized')}
          <RadioGroup name="naturalized" selectedValue={(this.props.DocumentType || {}).value} required={this.props.required} onError={this.props.onError}>
            <Radio className="naturalized alien"
                   label={i18n.m('foreignBornDocuments.naturalized.label.alien')}
                   value="AlienRegistration"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="naturalized permanent"
                   label={i18n.m('foreignBornDocuments.naturalized.label.permanentResident')}
                   value="PermanentResident"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="naturalized certificate"
                   label={i18n.m('foreignBornDocuments.naturalized.label.certificateOfNaturalization')}
                   value="CertificateOfNaturalization"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
          </RadioGroup>

          {i18n.t('foreignBornDocuments.para.derived')}
          <RadioGroup name="derived" selectedValue={(this.props.DocumentType || {}).value} required={this.props.required} onError={this.props.onError}>
            <Radio className="derived alien"
                   label={i18n.m('foreignBornDocuments.derived.label.alien')}
                   value="DerivedAlienRegistration"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="derived permanent"
                   label={i18n.m('foreignBornDocuments.derived.label.permanentResident')}
                   value="DerivedPermanentResident"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="derived certificate"
                   label={i18n.m('foreignBornDocuments.derived.label.certificateOfNaturalization')}
                   value="DerivedCertificateOfNaturalization"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
          </RadioGroup>

          {i18n.t('foreignBornDocuments.para.notCitizen')}
          <RadioGroup name="notCitizen" selectedValue={(this.props.DocumentType || {}).value} required={this.props.required} onError={this.props.onError}>
            <Radio className="notcitizen permanent"
                   label={i18n.m('foreignBornDocuments.notCitizen.label.permanentResident')}
                   value="I-551"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="notcitizen employment"
                   label={i18n.m('foreignBornDocuments.notCitizen.label.employmentAuthorization')}
                   value="I-766"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="notcitizen arrival"
                   label={i18n.m('foreignBornDocuments.notCitizen.label.arrivalDepartureRecord')}
                   value="I-94"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="notcitizen visa"
                   label={i18n.m('foreignBornDocuments.notCitizen.label.visa')}
                   value="Visa"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="notcitizen student"
                   label={i18n.m('foreignBornDocuments.notCitizen.label.nonImmigrantStudent')}
                   value="NonImmigrantStudent"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
            <Radio className="notcitizen exchange"
                   label={i18n.m('foreignBornDocuments.notCitizen.label.exchangeVisitor')}
                   value="ExchangeVisitor"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
          </RadioGroup>

          {i18n.t('foreignBornDocuments.para.other')}
          <RadioGroup name="other" selectedValue={(this.props.DocumentType || {}).value} required={this.props.required} onError={this.props.onError}>
            <Radio className="other"
                   label={i18n.m('foreignBornDocuments.other.label.other')}
                   value="Other"
                   onUpdate={this.updateDocumentType}
                   onError={this.props.onError}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   />
          </RadioGroup>

          <Show when={(this.props.DocumentType || {}).value === 'Other'}>
            <Textarea name="otherExplanation"
                      className="other-explanation"
                      label="Provide explanation"
                      {...this.props.OtherExplanation}
                      onUpdate={this.updateOtherExplanation}
                      onError={this.props.onError}
                      required={this.props.required}
                      />
          </Show>
        </Field>

        <Field title={i18n.t('foreignBornDocuments.heading.documentNumber')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="labels">
          <Text name="documentNumber"
                label="Document Number"
                {...this.props.DocumentNumber}
                className="foreign-born-document-number"
                onUpdate={this.updateDocumentNumber}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('foreignBornDocuments.heading.documentExpiration')}
               scrollIntoView={this.props.scrollIntoView}
               adjustFor="labels">
          <NotApplicable name="DocumentExpirationNotApplicable"
                         {...this.props.DocumentExpirationNotApplicable}
                         label={i18n.t('reference.label.idk')}
                         or={i18n.m('reference.para.or')}
                         onUpdate={this.updateDocumentExpirationNotApplicable}>
            <DateControl name="documentExpiration"
                         {...this.props.DocumentExpiration}
                         onUpdate={this.updateDocumentExpiration}
                         onError={this.props.onError}
                         required={this.props.required}
                         />
          </NotApplicable>
        </Field>
      </div>
    )
  }
}

ForeignBornDocuments.defaultProps = {
  DocumentType: {},
  OtherExplanation: {},
  DocumentNumber: {},
  DocumentExpiration: {},
  DocumentExpirationNotApplicable: { applicable: true },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
