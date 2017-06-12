import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsTerrorismValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Textarea } from '../../../Form'

export default class TerrorismAssociation extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        Explanation: this.props.Explanation,
        HasTerrorism: this.props.HasTerrorism
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateExplanation (values) {
    this.update([
      { name: 'Explanation', value: values }
    ])
  }

  updateBranch (values) {
    this.update([
      { name: 'HasTerrorism', value: values }
    ])
  }

  render () {
    return (
      <div className="legal-associations-terrorism">
        <Branch name="has_terrorsim"
                label={i18n.t('legal.associations.terrorism.heading.title')}
                labelSize="h3"
                className="legal-associations-terrorism-has-terrorism"
                value={this.props.HasTerrorism}
                onError={this.handleError}
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
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/terrorism-association',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsTerrorismValidator(state, props).isValid()
  }
}
