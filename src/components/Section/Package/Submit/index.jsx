import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import axios from 'axios'

import i18n from 'util/i18n'
import * as formConfig from 'config/forms'

import { api } from 'services'

import schema from 'schema'
import { SignatureValidator } from 'validators'
import { formIsSigned, hideHippa } from 'validators/releases'

import { Show } from 'components/Form'
import { SpinnerAction } from 'components/Form/Spinner'
import wait from 'util/wait'

import FormStatus from '../FormStatus'
import BasicAccordion from '../BasicAccordion'
import AdditionalComments from '../AdditionalComments'
import Verify from '../Verify'
import General from '../General'
import Medical from '../Medical'
import Credit from '../Credit'
import SubmitConfirmationModal from '../SubmitConfirmationModal'

import connectPackageSection from '../PackageConnector'

const signatureValid = data => new SignatureValidator(data).isValid()


export class PackageSubmit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirmingSubmission: false,
      isSubmitting: false,
      submissionError: false,
      showAdditionalComments: true,
      showGeneralItem: false,
      showCreditItem: false,
      signatures: {},
      spinnerAction: SpinnerAction.Spin,
    }
  }

  handleConfirmSubmission = () => {
    this.setState({
      isConfirmingSubmission: true,
    })
  }

  handleCancel = () => {
    this.setState({
      isConfirmingSubmission: false,
    })
  }

  handleSubmit = () => {
    const { updateApplication, history } = this.props
    const { signatures } = this.state

    const data = { ...signatures }
    const payload = schema('package.submit', data, false)

    this.setState({
      isSubmitting: true,
    })

    // Make API call
    axios
      .all([api.save(payload)])
      .then(() => api.submit())
      .then(() => api.status())
      .then((response = {}) => {
        const statusData = (response).data || {
          Locked: false,
          Hash: false,
        }

        updateApplication('Settings', 'locked', statusData.Locked)
        updateApplication('Settings', 'hash', statusData.Hash)

        this.setState({
          spinnerAction: SpinnerAction.Shrink,
        })
      })
      .then(wait(1000))
      .then(() => {
        this.setState({
          spinnerAction: SpinnerAction.Grow,
        })
      })
      .then(wait(1000))
      .then(() => {
        history.push('/form/package/print')
      })
      .catch(() => {
        console.warn('Failed to form package')

        this.setState({
          isSubmitting: false,
          submissionError: true,
        })
      })
  }

  update = (values) => {
    const { signatures } = this.state

    this.setState({
      signatures: {
        ...signatures,
        ...values,
      },
    })
  }

  updateComments = (values) => {
    this.update({ AdditionalComments: values })
  }

  updateGeneral = (values) => {
    this.update({ General: values })
  }

  updateMedical = (values) => {
    this.update({ Medical: values })
  }

  updateCredit = (values) => {
    this.update({ Credit: values })
  }

  togglePanel = (panel, scrollIntoView = true) => {
    const {
      showAdditionalComments,
      showGeneralItem,
      showCreditItem,
    } = this.state

    const newState = {
      showAdditionalComments: false,
      showGeneralItem: false,
      showCreditItem: false,
      scrollIntoView: null,
    }

    switch (panel) {
      case 'additionalComments':
        newState.showAdditionalComments = !showAdditionalComments
        newState.scrollIntoView = scrollIntoView && 'additionalComments'
        break

      case 'generalItem':
        newState.showGeneralItem = !showGeneralItem
        newState.scrollIntoView = scrollIntoView && 'generalItem'
        break

      case 'creditItem':
        newState.showCreditItem = !showCreditItem
        newState.scrollIntoView = scrollIntoView && 'creditItem'
        break

      default:
    }

    this.setState(newState)
  }

  renderAccordion = () => {
    const {
      Application = {}, Identification = {}, History = {},
    } = this.props
    const { signatures } = this.state

    const { ApplicantName = {} } = Identification

    const {
      showAdditionalComments, showGeneralItem, showCreditItem, scrollIntoView,
    } = this.state

    const hideHippaSection = hideHippa(Application)

    const additionalCommentsSignatureValid = signatureValid(signatures.AdditionalComments)
    const generalItemSignatureValid = signatureValid(signatures.General)
    const medicalSignatureValid = hideHippaSection
      || (!hideHippaSection && signatureValid(signatures.Medical))
    const creditSignatureValid = signatureValid(signatures.Credit)

    const accordionItems = [
      {
        title: i18n.t('application.validForm.certificationItem'),
        valid: () => additionalCommentsSignatureValid,
        onClick: () => { this.togglePanel('additionalComments', false) },
        open: showAdditionalComments,
        scrollIntoView: scrollIntoView === 'additionalComments',
        component: () => (
          <div>
            <AdditionalComments
              {...signatures.AdditionalComments}
              onUpdate={this.updateComments}
              LegalName={ApplicantName}
            />
            <Show when={additionalCommentsSignatureValid}>
              <button
                type="button"
                className="next-release"
                onClick={() => { this.togglePanel('generalItem') }}
              >
                {i18n.t('application.validForm.next')}
              </button>
            </Show>
          </div>
        ),
      },
      {
        title: i18n.t('application.validForm.generalItem'),
        valid: () => generalItemSignatureValid,
        onClick: () => { this.togglePanel('generalItem', false) },
        open: showGeneralItem,
        scrollIntoView: scrollIntoView === 'generalItem',
        component: () => (
          <div>
            <Verify
              Identification={Identification}
              History={History}
            />
            <hr />
            <General
              {...signatures.General}
              onUpdate={this.updateGeneral}
              LegalName={ApplicantName}
            />
            <Show when={!hideHippaSection}>
              <div>
                <hr />
                <Medical
                  {...signatures.Medical}
                  onUpdate={this.updateMedical}
                  LegalName={ApplicantName}
                />
              </div>
            </Show>
            <Show when={generalItemSignatureValid && medicalSignatureValid}>
              <button
                type="button"
                className="next-release"
                onClick={() => { this.togglePanel('creditItem') }}
              >
                {i18n.t('application.validForm.next')}
              </button>
            </Show>
          </div>
        ),
      },
      {
        title: i18n.t('application.validForm.creditItem'),
        valid: () => creditSignatureValid,
        onClick: () => { this.togglePanel('creditItem', false) },
        open: showCreditItem,
        scrollIntoView: scrollIntoView === 'creditItem',
        component: () => (
          <div>
            <Credit
              {...signatures.Credit}
              onUpdate={this.updateCredit}
              LegalName={ApplicantName}
            />
          </div>
        ),
      },
    ]

    return (
      <BasicAccordion items={accordionItems} />
    )
  }

  render() {
    const { Application = {}, Settings = {} } = this.props
    const {
      signatures, isSubmitting, isConfirmingSubmission, submissionError, spinnerAction,
    } = this.state
    const { formType } = Settings
    const formName = formType
      && formConfig[formType]
      && formConfig[formType].FORM_LABEL

    const classes = classnames(
      'eapp-submit',
      'submission-status',
      'valid'
    )

    const hideHippaSection = hideHippa(Application)
    const isSigned = formIsSigned(signatures, hideHippaSection)

    const buttonText = isSubmitting
      ? i18n.t('application.validForm.submitting')
      : i18n.t('application.validForm.submit', { formName })

    return (
      <div className={classes}>
        {i18n.m('application.submissionStatus.valid')}
        <FormStatus
          isValid
          isTransitioning={false}
        />

        <div className="valid-form">
          {i18n.m('application.submissionStatus.valid2')}
          {i18n.m('releases.additionalComments.contents')}

          {this.renderAccordion()}

          <div className="text-right">
            <button
              type="button"
              onClick={this.handleConfirmSubmission}
              className="submit usa-button"
              disabled={isSubmitting || !isSigned}
            >
              {buttonText}
              <i className="fa fa-arrow-circle-right" aria-hidden="true" />
            </button>
          </div>
        </div>

        {submissionError && (
          <div className="field">
            <div className="table">
              <div className="messages">
                <div className="usa-alert usa-alert-error" role="alert">
                  <div className="usa-alert-body">
                    {i18n.m('error.submission.message')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isConfirmingSubmission && (
          <SubmitConfirmationModal
            formName={formName}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmit}
          />
        )}

        {isSubmitting && (
          <div className="spinner eapp-submit__spinner-bg">
            <div className="eapp-submit__spinner-container">
              <div
                className={
                  classnames(
                    'spinner-icon',
                    spinnerAction === SpinnerAction.Grow ? 'hidden' : spinnerAction,
                  )
                }
              />
              <i
                className={
                  classnames(
                    'fa',
                    'fa-check-circle',
                    spinnerAction === SpinnerAction.Grow ? 'grow' : 'hidden',
                  )
                }
                aria-hidden="false"
              />
              <span className="spinner-label">{i18n.t('application.submissionConfirmation.spinnerText', { formName })}</span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

PackageSubmit.propTypes = {
  Application: PropTypes.object,
  Identification: PropTypes.object,
  History: PropTypes.object,
  Submission: PropTypes.object,
}

PackageSubmit.defaultProps = {
  Application: {},
  Identification: {},
  History: {},
  Submission: {},
}

export default connectPackageSection(PackageSubmit)
