import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsTerrorismValidator } from '../../../../validators'
import { Branch, Show, Field, Textarea } from '../../../Form'

export default class TerrorismAssociation extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Explanation: this.props.Explanation,
      HasTerrorism: this.props.HasTerrorism,
      ...queue
    })
  }

  updateExplanation (values) {
    this.update({
      Explanation: values
    })
  }

  updateBranch (values) {
    this.update({
      HasTerrorism: values,
      Explanation: values === 'Yes' ? this.props.Explanation : {}
    })
  }

  render () {
    return (
      <div className="legal-associations-terrorism">
        <Branch name="has_terrorsim"
                label={i18n.t('legal.associations.terrorism.heading.title')}
                labelSize="h3"
                className="legal-associations-terrorism-has-terrorism"
                value={this.props.HasTerrorism}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasTerrorism === 'Yes'}>
          <Field title={i18n.t('legal.associations.terrorism.heading.explanation')}
                  help="legal.associations.terrorism.help.explanation"
                  adjustFor="textarea">
            <Textarea name="Explanation"
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
  HasTerrorism: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/terrorism-association',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsTerrorismValidator(state, props).isValid()
  }
}
