import React from 'react'
import PropTypes from 'prop-types';
import { i18n } from '../../../../../config'
import {
  ValidationElement,
  Field,
  Textarea,
} from '../../../../Form'
import ContinuingBenefit from './ContinuingBenefit';

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

    this.update = this.update.bind(this)
    this.updateOtherFrequencyTypeExplanation = this.updateOtherFrequencyTypeExplanation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      ...this.props.otherBenefit,
      ...queue
    })
  }

  updateOtherFrequencyTypeExplanation(value) {
    this.update({
      OtherFrequencyTypeExplanation: value
    })
  }

  render() {
    return (
      <div>
        {i18n.m('foreign.activities.benefit.label.otherBenefit')}
        <Textarea
          name="OtherFrequencyTypeExplanation"
          {...this.props.otherBenefit}
          onUpdate={this.updateOtherFrequencyTypeExplanation}
          onError={this.props.onError}
          required={this.props.required}
          value={this.props.otherBenefit.OtherFrequencyTypeExplanation}
        />
        {/* Hacky spacer between components */}
        <div style={{ height: '30px'}} />
        {/* The 'Other' frequency type has the same fields as the ConinuingBenefit */}
        <ContinuingBenefit
          name="OtherBenefit"
          {...this.props.otherBenefit}
          onUpdate={this.props.onUpdate}
          onError={this.props.onError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
      </div>
    )
  }
}

OtherBenefit.propTypes = propTypes

OtherBenefit.defualtProps = {
  otherBenefit: {},
  required: false,
  scrollIntoView: () => {}
}
