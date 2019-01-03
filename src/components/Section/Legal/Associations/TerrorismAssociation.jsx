import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate from '../../../../validators'
import { Branch, Show, Field, Textarea } from '../../../Form'

export default class TerrorismAssociation extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Explanation: this.props.Explanation,
      HasTerrorism: this.props.HasTerrorism,
      ...queue
    })
  }

  updateExplanation(values) {
    this.update({
      Explanation: values
    })
  }

  updateBranch(values) {
    this.update({
      HasTerrorism: values,
      Explanation: values.value === 'Yes' ? this.props.Explanation : {}
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-terrorism"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.associations.terrorism')}</h1>
        <Branch
          name="has_terrorsim"
          label={i18n.t('legal.associations.terrorism.heading.title')}
          labelSize="h4"
          className="legal-associations-terrorism-has-terrorism"
          {...this.props.HasTerrorism}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasTerrorism.value === 'Yes'}>
          <Field
            title={i18n.t('legal.associations.terrorism.heading.explanation')}
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="Explanation"
              {...this.props.Explanation}
              className="legal-associations-terrorism-explanation"
              onError={this.handleError}
              required={this.props.required}
              onUpdate={this.updateExplanation}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

TerrorismAssociation.defaultProps = {
  name: 'terrorism',
  HasTerrorism: {},
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'associations/terrorism-association',
  dispatch: () => {},
  validator: data => {
    return validate(schema('legal.associations.terrorism-association', data))
  }
}
