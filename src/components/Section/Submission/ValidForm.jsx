import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Show } from '../../Form'
import { validDateField } from '../../../validators/helpers'
import BasicAccordion from './BasicAccordion'
import AdditionalComments from '../Releases/AdditionalComments'
import General from '../Releases/General'
import Medical from '../Releases/Medical'
import Credit from '../Releases/Credit'
import Verify from '../Releases/Verify'

export default class ValidForm extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateGeneral = this.updateGeneral.bind(this)
    this.updateCredit = this.updateCredit.bind(this)
    this.accordionItems = this.accordionItems.bind(this)
    this.submit = this.submit.bind(this)

    this.state = {
      accordionItems: this.accordionItems()
    }
  }

  componentWillUnmount () {
    let nav = document.getElementsByClassName('form-navigation')[0]
    nav.removeEventListener('click', this.captureClick)
  }

  componentDidMount () {
    let nav = document.getElementsByClassName('form-navigation')[0]
    if (nav && nav.addEventListener) {
      nav.addEventListener('click', this.captureClick)
    }
  }

  captureClick (e) {
    if (!window.confirm('Are you sure you want to leave?')) {
      e.stopPropagation()
    }
  }

  update (queue) {
    this.props.onUpdate({
      AdditionalComments: this.props.AdditionalComments,
      General: this.props.General,
      Medical: this.props.Medical,
      Credit: this.props.Credit,
      ...queue
    })
  }

  updateComments (values) {
    this.update({
      AdditionalComments: values
    })
  }

  updateGeneral (values) {
    this.update({
      General: values
    })
  }

  updateMedical (values) {
    this.update({
      Medical: values
    })
  }

  updateCredit (values) {
    this.update({
      Credit: values
    })
  }

  submit () {
    // TODO Implement
    if (window.confirm('Are you sure you want to submit this application?')) {
      this.props.onSubmit(true)
    }
  }

  togglePanel (nextIndex, open = true) {
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

  accordionItems () {
    let accordionItems = [
      {
        title: i18n.t('submission.validForm.certificationItem'),
        component: () => {
          return (
            <div>
              <AdditionalComments
                onUpdate={this.updateComments}
                {...this.props.AdditionalComments}
                LegalName={this.props.LegalName}
              />
              <button onClick={this.togglePanel(1)}>Next release</button>
            </div>
          )
        },
        valid: () => { return validSignature(this.props.AdditionalComments) },
        open: true
      },
      {
        title: i18n.t('submission.validForm.generalItem'),
        component: () => {
          return (
            <div>
              <Verify
                Identification={this.props.Identification}
                History={this.props.History}
              />
              <hr />
              <General
                {...this.props.General}
                LegalName={this.props.LegalName}
                onUpdate={this.updateGeneral}
              />
              <Show when={!this.props.hideHippa}>
                <div>
                  <hr />
                  <Medical
                    {...this.props.Medical}
                    LegalName={this.props.LegalName}
                    onUpdate={this.updateMedical}
                  />
                </div>
              </Show>
              <button onClick={this.togglePanel(2)}>Next release</button>
            </div>
          )
        },
        valid: () => { return validSignature(this.props.General) },
        open: false
      },
      {
        title: i18n.t('submission.validForm.creditItem'),
        component: () => {
          return (
            <div>
              <Credit
                onUpdate={this.updateCredit}
                {...this.props.Credit}
                LegalName={this.props.LegalName}
              />
            </div>
          )
        },
        valid: () => { return validSignature(this.props.Credit) },
        open: false
      }
    ]

    return accordionItems
  }

  render () {
    const accordionItems = this.state.accordionItems
    return (
      <div className="valid-form">
        <BasicAccordion items={accordionItems} />
        <div className="text-right">
          <button onClick={this.submit} className="submit usa-button" disabled={!enableSubmit(this.props)}>
            Submit your SF-86
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
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
  }
}

export const validSignature = (el) => {
  if (!el) {
    return false
  }

  const signature = el.Signature
  if (!signature) {
    return false
  }
  if (!signature.Name || !signature.Name.value) {
    return false
  }
  if (!validDateField(signature.Date)) {
    return false
  }
  return true
}

export const enableSubmit = (props) => {
  if (props.hideHippa) {
    return (
      validSignature(props.AdditionalComments) &&
      validSignature(props.General) &&
      validSignature(props.Credit)
    )
  }
  return (
    validSignature(props.Comments) &&
    validSignature(props.General) &&
    validSignature(props.Credit) &&
    validSignature(props.Medical)
  )
}
