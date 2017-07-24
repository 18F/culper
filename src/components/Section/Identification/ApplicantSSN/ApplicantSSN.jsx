import React from 'react'
import { i18n } from '../../../../config'
import { validSSN } from '../../../../validators/helpers'
import SubsectionElement from '../../SubsectionElement'
import { Field, SSN, Show } from '../../../Form'

export default class ApplicantSSN extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      verification: {}
    }

    this.updateSSN = this.updateSSN.bind(this)
    this.updateVerification = this.updateVerification.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      ssn: this.props.ssn,
      verified: this.props.verified,
      ...queue
    })
  }

  updateSSN (values) {
    this.update({
      ssn: values,
      verified: false
    })
  }
  updateVerification (values) {
    const verified = this.props.ssn.first === values.first &&
          this.props.ssn.middle === values.middle &&
          this.props.ssn.last === values.last &&
          validSSN(values)

    this.setState({ verification: values }, () => {
      this.update({
        verified: verified
      })
    })
  }

  render () {
    const klass = `applicant-ssn ${this.props.className || ''}`.trim()
    const verify = validSSN(this.props.ssn) && !this.props.verified && !this.props.ssn.notApplicable

    return (
      <div className={klass}>
        <Field help="identification.ssn.help">
          <SSN name="ssn"
               {...this.props.ssn}
               onUpdate={this.updateSSN}
               onError={this.handleError}
               />
        </Field>

        <Show when={verify}>
          <Field title={i18n.t('identification.ssn.heading.verify')}
                 titleSize="h4">
            <SSN name="verification"
                 {...this.state.verification}
                 onUpdate={this.updateVerification}
                 onError={this.handleError}
                 />
          </Field>
        </Show>
      </div>
    )
  }
}

ApplicantSSN.defaultProps = {
  ssn: {},
  verified: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'ssn',
  dispatch: () => {},
  validator: (state, props) => {
    return validSSN(props.ssn) && props.verified
  }
}

ApplicantSSN.errors = []
