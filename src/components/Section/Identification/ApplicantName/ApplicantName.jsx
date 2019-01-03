import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Name, Field } from '../../../Form'

export default class ApplicantName extends SubsectionElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })
  }

  render() {
    const klass = `section-content applicant-name ${this.props.className ||
      ''}`.trim()

    return (
      <div className={klass} {...super.dataAttributes(this.props)}>
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
            dispatch={this.props.dispatch}
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
  section: 'identification',
  subsection: 'name',
  dispatch: () => {},
  required: false,
  validator: data => {
    return validate(schema('identification.name', data))
  }
}

ApplicantName.errors = []
