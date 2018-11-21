import React from 'react'
import PropTypes from 'prop-types'
import { i18n } from '../../../../../config'
import { ValidationElement, Field, Textarea } from '../../../../Form'
import ContinuingBenefit from './ContinuingBenefit'

const propTypes = {
  otherBenefit: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  required: PropTypes.bool,
  scrollIntoView: PropTypes.func
}

export default class OtherBenefit extends ValidationElement {
  constructor(props) {
    super(props)

    this.updateOtherFrequencyTypeExplanation = this.updateOtherFrequencyTypeExplanation.bind(
      this
    )
    this.updateOtherBenefit = this.updateOtherBenefit.bind(this)
  }

  updateOtherFrequencyTypeExplanation(value) {
    this.props.onUpdate({
      ...this.props.otherBenefit,
      OtherFrequencyTypeExplanation: value
    })
  }

  updateOtherBenefit(values) {
    this.props.onUpdate({
      OtherFrequencyTypeExplanation: this.props.OtherFrequencyTypeExplanation,
      ...this.props.otherBenefit,
      ...values
    })
  }

  render() {
    return (
      <div>
        {i18n.m('foreign.activities.benefit.label.otherBenefit')}
        <Textarea
          name="OtherFrequencyTypeExplanation"
          {...this.props.otherBenefit.OtherFrequencyTypeExplanation}
          onUpdate={this.updateOtherFrequencyTypeExplanation}
          onError={this.props.onError}
          required={this.props.required}
        />
        {/* Hacky spacer between components */}
        <div style={{ height: '30px' }} />
        {/* The 'Other' frequency type has the same fields as the ConinuingBenefit */}
        <ContinuingBenefit
          name="OtherBenefit"
          {...this.props.otherBenefit}
          onUpdate={this.updateOtherBenefit}
          onError={this.props.onError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
      </div>
    )
  }
}

OtherBenefit.propTypes = propTypes

OtherBenefit.defaultProps = {
  otherBenefit: {},
  required: false,
  scrollIntoView: () => {}
}
