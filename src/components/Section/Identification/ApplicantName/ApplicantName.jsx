import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Name, Field } from '../../../Form'

import { reportCompletion } from '../../../../actions/ApplicationActions'

import connectIdentificationSection from '../IdentificationConnector'

const sectionConfig = {
  section: 'identification',
  subsection: 'name',
  store: 'Identification',
  storeKey: 'ApplicantName',
}

export class ApplicantName extends React.Component {
  constructor(props) {
    super(props)

    const { section, subsection, store, storeKey } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.handleError = this.handleError.bind(this)
    this.handleCompletion = this.handleCompletion.bind(this)
    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  handleCompletion() {
    const data = {
      ...this.props,
      ...this.state
    }

    this.props.dispatch(
      reportCompletion(
        this.section,
        this.subsection,
        this.props.validator(data)
      )
    )
  }

  handleError(value, arr) {
    this.handleCompletion()
    arr = arr.map(err => {
      return {
        ...err,
        section: this.section,
        subsection: this.subsection
      }
    })
    
    return this.props.onError(value, arr)
  }

  update(queue) {
    this.props.onUpdate(this.storeKey, {
      Name: this.props.Name,
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })
  }

  dataAttributes() {
    return {
      'data-section': this.section,
      'data-subsection': this.subsection
    }
  }

  render() {
    const klass = `section-content applicant-name ${this.props.className ||
      ''}`.trim()

    return (
      <div className={klass} {...this.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('identification.destination.name')}</h1>
        <Field
          title={i18n.t('identification.name.title')}
          titleSize="h4"
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}>
          <Name
            name="name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.handleError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>
      </div>
    )
  }
}

ApplicantName.defaultProps = {
  Name: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  dispatch: () => {},
  required: false,
  validator: data => {
    return validate(schema('identification.name', data))
  }
}

ApplicantName.errors = []

export default connectIdentificationSection(ApplicantName, sectionConfig)
