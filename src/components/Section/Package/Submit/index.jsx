import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import axios from 'axios'

import i18n from 'util/i18n'

import { api } from 'services'

import schema from 'schema'
import { SignatureValidator } from 'validators'
import { formIsSigned, hideHippa } from 'validators/releases'

import { Show } from 'components/Form'

import FormStatus from '../FormStatus'
import BasicAccordion from '../BasicAccordion'
import AdditionalComments from '../AdditionalComments'
import Verify from '../Verify'
import General from '../General'
import Medical from '../Medical'
import Credit from '../Credit'

import connectPackageSection from '../PackageConnector'

const signatureValid = data => new SignatureValidator(data).isValid()

class PackageSubmit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitting: false,
      submissionError: false,
      showAdditionalComments: true,
      showGeneralItem: false,
      showCreditItem: false,
    }
  }

  handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit this application?')) {
      const { Submission = {}, updateApplication, history } = this.props
      const data = { ...Submission.Releases }
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

          history.push('/form/package/print')

          updateApplication('Submission', 'Releases', Submission.Releases)
        })
        .catch(() => {
          console.warn('Failed to form package')

          this.setState({
            isSubmitting: false,
            submissionError: true,
          })

          updateApplication('Submission', 'Releases', data)
        })
    }
  }

  update = (values) => {
    const {
      Submission, updateApplication,
    } = this.props

    const { Releases = {} } = Submission

    updateApplication('Submission', 'Releases', {
      AdditionalComments: Releases.AdditionalComments,
      General: Releases.General,
      Medical: Releases.Medical,
      Credit: Releases.Credit,
      ...values,
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

    const newState = { ...this.state, scrollIntoView: null }

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
      Application = {}, Identification = {}, Submission = {}, History = {},
    } = this.props
    const { Releases = {} } = Submission
    const { ApplicantName = {} } = Identification

    const {
      showAdditionalComments, showGeneralItem, showCreditItem, scrollIntoView,
    } = this.state

    const hideHippaSection = hideHippa(Application)

    const additionalCommentsSignatureValid = signatureValid(Releases.AdditionalComments)
    const generalItemSignatureValid = signatureValid(Releases.General)
    const medicalSignatureValid = hideHippaSection
      || (!hideHippaSection && signatureValid(Releases.Medical))
    const creditSignatureValid = signatureValid(Releases.Credit)

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
              {...Releases.AdditionalComments}
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
              {...Releases.General}
              onUpdate={this.updateGeneral}
              LegalName={ApplicantName}
            />
            <Show when={!hideHippaSection}>
              <div>
                <hr />
                <Medical
                  {...Releases.Medical}
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
              {...Releases.Credit}
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
    const { Application = {}, Submission = {} } = this.props
    const { isSubmitting, submissionError } = this.state

    const classes = classnames(
      'submission-status',
      'valid'
    )

    const hideHippaSection = hideHippa(Application)
    const isSigned = formIsSigned({ Submission }, hideHippaSection)

    const buttonText = isSubmitting
      ? i18n.t('application.validForm.submitting')
      : i18n.t('application.validForm.submit')

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
              onClick={this.handleSubmit}
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
  Submission: {
    Releases: {
      AdditionalComments: { Signature: {} },
      General: { Signature: {} },
      Medical: { Signature: {} },
      Credit: { Signature: {} },
    },
  },
}

export default connectPackageSection(PackageSubmit)
