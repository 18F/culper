
import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate from 'validators'
import { validSSN } from 'validators/helpers'

import { Field, SSN, Show } from 'components/Form'
import { IDENTIFICATION, IDENTIFICATION_SSN } from 'config/formSections/identification'

import connectIdentificationSection from '../IdentificationConnector'
import Subsection from '../../shared/Subsection'


const sectionConfig = {
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_SSN.name,
  storeKey: IDENTIFICATION_SSN.storeKey,
}

export class ApplicantSSN extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.state = {
      uid: `${subsection.name}-${super.guid()}`,
      verification: {},
      error: false,
      verified: props.verified || false,
    }
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      ssn: this.props.ssn,
      verified: this.props.verified,
      ...queue,
    })
  }

  updateSSN = (values) => {
    this.setState({
      verified: false,
    })

    this.update({
      ssn: values,
      verified: false,
      error: false,
    })
  }

  updateVerification = (values) => {
    const verified = (
      this.props.ssn.first === values.first
      && this.props.ssn.middle === values.middle
      && this.props.ssn.last === values.last
      && validSSN(values)
    )

    this.setState(prevState => ({
      verified,
      verification: verified ? {} : values,
      error: verified ? false : prevState.error,
    }), () => {
      // Update the properties so they can be reflected
      // within this component.
      this.update({ verified })

      // If everything checks out there are no errors and
      // we are going to forcefully flush them.
      if (verified) {
        this.handleError(values, [])
        this.verificationError(values, [])
      }
    })
  }

  verificationError = (value, arr) => {
    // If the verification SSN is valid then we run our validation
    // function(s). However, if it is not then we set the `valid` property
    // to a neutral state. This allows the error notifications to be properly
    // toggled within the various subscribing components.
    const { verification } = this.state
    const local = (
      this.props.onError(
        value,
        this.constructor.errors.map(err => (
          {
            code: err.code,
            valid: validSSN(verification)
              ? err.func(verification, this.props)
              : null,
            uid: this.state.uid,
          }
        ))
      ) || []
    )

    // Set the error state value so we can apply a CSS class to
    // the entire SSN.
    this.setState({ error: local.some(x => x.valid === false) })
    return this.handleError(value, arr.concat(local))
  }

  render() {
    const klass = `section-content applicant-ssn ${this.props.className
      || ''}`.trim()
    const klassVerify = `applicant-ssn-verification ${
      this.state.error ? 'usa-input-error' : ''
    }`.trim()
    const verify = (
      validSSN(this.props.ssn)
      && !this.props.verified
      && !this.props.ssn.notApplicable
    )

    return (
      <div
        className={klass}
        data-section={IDENTIFICATION.key}
        data-subsection={IDENTIFICATION_SSN.key}
      >
        <h1 className="section-header">{i18n.t('identification.destination.ssn')}</h1>
        <Field
          title={i18n.t('identification.ssn.title')}
          titleSize="h4"
          help="identification.ssn.help"
          scrollIntoView={this.props.scrollIntoView}
        >
          <SSN
            name="ssn"
            {...this.props.ssn}
            className="applicant-ssn-initial"
            onUpdate={this.updateSSN}
            onError={this.handleError}
            required={!this.props.ssn.notApplicable && this.props.required}
          />
        </Field>

        <Show when={verify}>
          <Field
            title={i18n.t('identification.ssn.heading.verify')}
            scrollIntoView={this.props.scrollIntoView}
            titleSize="h4"
          >
            <SSN
              name="verification"
              {...this.state.verification}
              hideNotApplicable={true}
              className={klassVerify}
              onUpdate={this.updateVerification}
              onError={this.verificationError}
              required={verify && this.props.required}
            />
          </Field>
        </Show>
        <Show when={this.props.verified}>
          <Field
            title={i18n.t('identification.ssn.heading.verified')}
            optional={true}
            scrollIntoView={this.props.scrollIntoView}
            titleSize="h4"
          />
        </Show>
      </div>
    )
  }
}

ApplicantSSN.defaultProps = {
  ssn: {},
  verified: false,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  required: false,
  validator: data => validate(schema('identification.ssn', data)),
}

ApplicantSSN.errors = [
  {
    code: 'ssn.mismatch',
    func: (value, props) => {
      if (!value) {
        return null
      }
      return (
        validate(schema('ssn', value))
        && props.ssn.first === value.first
        && props.ssn.middle === value.middle
        && props.ssn.last === value.last
      )
    },
  },
]

export default connectIdentificationSection(ApplicantSSN, sectionConfig)
