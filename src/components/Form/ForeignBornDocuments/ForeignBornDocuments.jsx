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

    this.state = {
      DocumentType: props.DocumentType,
      OtherExplanation: props.OtherExplanation,
      DocumentNumber: props.DocumentNumber,
      DocumentExpiration: props.DocumentExpiration,
      DocumentExpirationNotApplicable: props.DocumentExpirationNotApplicable
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.updateDocumentType = this.updateDocumentType.bind(this)
    this.updateOtherExplanation = this.updateOtherExplanation.bind(this)
    this.updateDocumentNumber = this.updateDocumentNumber.bind(this)
    this.updateDocumentExpiration = this.updateDocumentExpiration.bind(this)
    this.updateDocumentExpirationNotApplicable = this.updateDocumentExpirationNotApplicable.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          DocumentType: this.state.DocumentType,
          OtherExplanation: this.state.OtherExplanation,
          DocumentNumber: this.state.DocumentNumber,
          DocumentExpiration: this.state.DocumentExpiration,
          DocumentExpirationNotApplicable: this.state.DocumentExpirationNotApplicable
        })
      }
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, errorCodes) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status, errorCodes)
    })
  }

  updateDocumentType (values) {
    this.update('DocumentType', values.value)
  }

  updateOtherExplanation (values) {
    this.update('OtherExplanation', values)
  }

  updateDocumentNumber (values) {
    this.update('DocumentNumber', values)
  }

  updateDocumentExpiration (values) {
    this.update('DocumentExpiration', values)
  }

  updateDocumentExpirationNotApplicable (values) {
    this.update('DocumentExpirationNotApplicable', !values.applicable)
  }

  render () {
    return (
      <div className="foreign-born-documents">

        <Field>
          <p>{i18n.t('foreignBornDocuments.para.bornToUSParents')}</p>
          <RadioGroup name="born" selectedValue={this.state.DocumentType}>
            <Radio
              className="born"
              label={i18n.t('foreignBornDocuments.bornToUSParents.label.fs240')}
              value="FS240"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="born"
              label={i18n.t('foreignBornDocuments.bornToUSParents.label.ds1350')}
              value="DS1350"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </RadioGroup>

          <p>{i18n.t('foreignBornDocuments.para.naturalized')}</p>
          <RadioGroup name="naturalized" selectedValue={this.state.DocumentType}>
            <Radio
              className="naturalized"
              label={i18n.t('foreignBornDocuments.naturalized.label.alien')}
              value="AlienRegistration"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="naturalized"
              label={i18n.t('foreignBornDocuments.naturalized.label.permanentResident')}
              value="PermanentResident"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="naturalized"
              label={i18n.t('foreignBornDocuments.naturalized.label.certificateOfNaturalization')}
              value="CertificateOfNaturalization"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </RadioGroup>

          <p>{i18n.t('foreignBornDocuments.para.derived')}</p>
          <RadioGroup name="derived" selectedValue={this.state.DocumentType}>
            <Radio
              className="derived"
              label={i18n.t('foreignBornDocuments.derived.label.alien')}
              value="DerivedAlienRegistration"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="derived"
              label={i18n.t('foreignBornDocuments.derived.label.permanentResident')}
              value="DerivedPermanentResident"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="derived"
              label={i18n.t('foreignBornDocuments.derived.label.certificateOfNaturalization')}
              value="DerivedCertificateOfNaturalization"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </RadioGroup>

          <p>{i18n.t('foreignBornDocuments.para.notCitizen')}</p>
          <RadioGroup name="notCitizen" selectedValue={this.state.DocumentType}>
            <Radio
              className="notcitizen"
              label={i18n.t('foreignBornDocuments.notCitizen.label.permanentResident')}
              value="I-551"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="notcitizen"
              label={i18n.t('foreignBornDocuments.notCitizen.label.employmentAuthorization')}
              value="I-766"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="notcitizen"
              label={i18n.t('foreignBornDocuments.notCitizen.label.arrivalDepartureRecord')}
              value="I-94"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="notcitizen"
              label={i18n.t('foreignBornDocuments.notCitizen.label.visa')}
              value="Visa"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="notcitizen"
              label={i18n.t('foreignBornDocuments.notCitizen.label.nonImmigrantStudent')}
              value="NonImmigrantStudent"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            <Radio
              className="notcitizen"
              label={i18n.t('foreignBornDocuments.notCitizen.label.exchangeVisitor')}
              value="ExchangeVisitor"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </RadioGroup>

          <p>{i18n.t('foreignBornDocuments.para.other')}</p>
          <RadioGroup name="other" selectedValue={this.state.DocumentType}>
            <Radio
              className="other"
              label={i18n.t('foreignBornDocuments.other.label.other')}
              value="Other"
              onUpdate={this.updateDocumentType}
              onValidate={this.props.onValidate}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </RadioGroup>

          <Show when={this.state.DocumentType === 'Other'}>
            <Textarea name="otherExplanation"
              label="Provide explanation"
              {...this.state.OtherExplanation}
              onUpdate={this.updateOtherExplanation}
              onValidate={this.props.onValidate}
            />
          </Show>
        </Field>

        <Field title={i18n.t('foreignBornDocuments.heading.documentNumber')}
          help="foreignBornDocuments.help.documentNumber"
          adjustFor="labels">
          <Text name="documentNumber"
            label="Document Number"
            {...this.state.DocumentNumber}
            onUpdate={this.updateDocumentNumber}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('foreignBornDocuments.heading.documentExpiration')}
          help="foreignBornDocuments.help.documentExpiration"
          shrink={true}
          adjustFor="labels">
          <NotApplicable name="OtherNameNotApplicable"
            applicable={this.state.DocumentExpirationNotApplicable}
            label={i18n.t('reference.label.idk')}
            or={i18n.m('reference.para.or')}
            onUpdate={this.updateDocumentExpirationNotApplicable}>
            <DateControl name="documentExpiration"
              {...this.state.DocumentExpiration}
              onUpdate={this.updateDocumentExpiration}
              onValidate={this.props.onValidate}
            />
          </NotApplicable>
        </Field>
      </div>
    )
  }
}
