import React from 'react'
import NameValidator from '../../../../validators/name'
import SubsectionElement from '../../SubsectionElement'
import { Name } from '../../../Form'

export default class ApplicantName extends SubsectionElement {
  render () {
    const klass = `applicant-name ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Name name="name"
              {...this.props.value}
              dispatch={this.props.dispatch}
              onUpdate={this.props.onUpdate}
              onError={this.handleError}
              />
      </div>
    )
  }
}

ApplicantName.defaultProps = {
  value: {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'name',
  dispatch: () => {},
  validator: (state, props) => {
    return new NameValidator(props.value, null).isValid()
  }
}

ApplicantName.errors = []
