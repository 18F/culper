import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Show } from '../../Form'
import { NameValidator, SignatureValidator } from '../../../validators'
import { formIsSigned } from '../../../validators/releases'
import BasicAccordion from './BasicAccordion'
import AdditionalComments from './AdditionalComments'
import General from './General'
import Medical from './Medical'
import Credit from './Credit'
import Verify from './Verify'

const signaturePresent = data => {
  return new SignatureValidator(data).isValid()
}

export default class ValidForm extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateGeneral = this.updateGeneral.bind(this)
    this.updateMedical = this.updateMedical.bind(this)
    this.updateCredit = this.updateCredit.bind(this)
    this.accordionItems = this.accordionItems.bind(this)
    this.submit = this.submit.bind(this)

    this.state = {
      accordionItems: this.accordionItems()
    }
  }

  update(queue) {
    this.props.onUpdate({
      AdditionalComments: this.props.AdditionalComments,
      General: this.props.General,
      Medical: this.props.Medical,
      Credit: this.props.Credit,
      Locked: this.props.Locked,
      ...queue
    })
  }

  updateComments(values) {
    this.update({
      AdditionalComments: values
    })
  }

  updateGeneral(values) {
    this.update({
      General: values
    })
  }

  updateMedical(values) {
    this.update({
      Medical: values
    })
  }

  updateCredit(values) {
    this.update({
      Credit: values
    })
  }

  submit() {
    if (window.confirm('Are you sure you want to submit this application?')) {
      this.props.onSubmit()
    }
  }

  togglePanel(nextIndex, open = true) {
    return () => {
      let items = [...this.state.accordionItems]
      items = items.map(i => {
        i.open = false
        i.scrollIntoView = false
        return i
      })

      let item = items[nextIndex]
      item.open = open
      item.scrollIntoView = open
      items[nextIndex] = item
      this.setState({
        accordionItems: items
      })
    }
  }

  accordionItems() {
    const self = this
    return [
      {
        title: i18n.t('application.validForm.certificationItem'),
        component: () => {
          return (
            <div>
              <AdditionalComments
                {...self.props.AdditionalComments}
                onUpdate={self.updateComments}
                LegalName={self.props.LegalName}
              />
              <Show when={signaturePresent(self.props.AdditionalComments)}>
                <button className="next-release" onClick={self.togglePanel(1)}>
                  {i18n.t('application.validForm.next')}
                </button>
              </Show>
            </div>
          )
        },
        valid: () => {
          return signaturePresent(self.props.AdditionalComments)
        },
        open: true
      },
      {
        title: i18n.t('application.validForm.generalItem'),
        component: () => {
          return (
            <div>
              <Verify
                Identification={self.props.Identification}
                History={self.props.History}
              />
              <hr />
              <General
                {...self.props.General}
                LegalName={self.props.LegalName}
                onUpdate={self.updateGeneral}
              />
              <Show when={!self.props.hideHippa}>
                <div>
                  <hr />
                  <Medical
                    {...self.props.Medical}
                    LegalName={self.props.LegalName}
                    onUpdate={self.updateMedical}
                  />
                </div>
              </Show>
              <Show
                when={
                  signaturePresent(self.props.General) &&
                  (self.props.hideHippa ||
                    (!self.hideHippa && signaturePresent(self.props.Medical)))
                }>
                <button className="next-release" onClick={self.togglePanel(2)}>
                  {i18n.t('application.validForm.next')}
                </button>
              </Show>
            </div>
          )
        },
        valid: () => {
          return signaturePresent(self.props.General)
        },
        open: false
      },
      {
        title: i18n.t('application.validForm.creditItem'),
        component: () => {
          return (
            <div>
              <Credit
                {...self.props.Credit}
                onUpdate={self.updateCredit}
                LegalName={self.props.LegalName}
              />
            </div>
          )
        },
        valid: () => {
          return signaturePresent(self.props.Credit)
        },
        open: false
      }
    ]
  }

  render() {
    const accordionItems = this.state.accordionItems
    const signed = formIsSigned({ Submission: { Releases: { ...this.props } } })
    const btnText = this.props.submitting
      ? i18n.t('application.validForm.submitting')
      : i18n.t('application.validForm.submit')
    return (
      <div className="valid-form">
        {i18n.m(`application.submissionStatus.valid2`)}
        {i18n.m('releases.additionalComments.contents')}
        <BasicAccordion items={accordionItems} />
        <div className="text-right">
          <button
            onClick={this.submit}
            className="submit usa-button"
            disabled={this.props.submitting || !signed}>
            {btnText}
            <i className="fa fa-arrow-circle-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  }
}

ValidForm.defaultProps = {
  hideHippa: true,
  LegalName: {},
  AdditionalComments: {
    Signature: {}
  },
  General: {
    Signature: {}
  },
  Medical: {
    Signature: {}
  },
  Credit: {
    Signature: {}
  },
  Locked: false,
  submitting: false
}
