import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'
import validate, { RelativesValidator, RelativeValidator } from 'validators'

import { RELATIONSHIPS, RELATIONSHIPS_RELATIVES } from 'config/formSections/relationships'

import { Summary, NameSummary } from 'components/Summary'
import { Field, Accordion } from 'components/Form'

import Subsection from 'components/Section/shared/Subsection'

import connectRelationshipsSection from '../RelationshipsConnector'

import Relative from './Relative'

const sectionConfig = {
  key: RELATIONSHIPS_RELATIVES.key,
  section: RELATIONSHIPS.name,
  store: RELATIONSHIPS.store,
  subsection: RELATIONSHIPS_RELATIVES.name,
  storeKey: RELATIONSHIPS_RELATIVES.storeKey,
}

export class Relatives extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const relation = (o.Relations || []).length > 0
      ? o.Relations[0]
      : i18n.t('relationships.relatives.collection.summary.item')

    const name = NameSummary(o.Name)

    return Summary({
      type: relation,
      index,
      left: name,
      right: null,
      placeholder: i18n.t('relationships.relatives.collection.summary.unknown'),
    })
  }

  validMaritalRelations = () => new RelativesValidator(this.props).validMaritalRelations()

  validRelations = () => new RelativesValidator(this.props).validMinimumRelations()

  render() {
    const {
      requireRelationshipRelativesUSResidenceDoc,
      requireRelationshipRelativesForeignGovtAffExplanation,
    } = this.props
    return (
      <div
        className="section-content relatives"
        data-section={RELATIONSHIPS.key}
        data-subsection={RELATIONSHIPS_RELATIVES.key}
      >
        <h1 className="section-header">{i18n.t('relationships.relatives.sectionTitle.title')}</h1>

        <Field
          title={i18n.t('relationships.relatives.heading.title')}
          titleSize="h3"
          optional={true}
          className="no-margin-bottom"
        >
          {i18n.m('relationships.relatives.para.opportunity')}
        </Field>

        <Field
          errors={[{ code: 'validRelation', valid: this.validRelations() }]}
          className={this.validRelations() && 'hidden'}
        />

        <Field
          errors={[
            {
              code: 'validMaritalRelation',
              valid: this.validMaritalRelations(),
            },
          ]}
          className={this.validMaritalRelations() && 'hidden'}
        />

        <Accordion
          {...this.props.List}
          defaultState={this.props.defaultState}
          scrollToBottom={this.props.scrollToBottom}
          onUpdate={this.updateList}
          onError={this.handleError}
          summary={this.summary}
          description={i18n.t(
            'relationships.relatives.collection.summary.title'
          )}
          required={this.props.required}
          validator={RelativeValidator}
          scrollIntoView={this.props.scrollIntoView}
          appendTitle={i18n.t('relationships.relatives.collection.appendTitle')}
          appendLabel={i18n.t('relationships.relatives.collection.append')}
        >
          <Relative
            name="Item"
            applicantBirthdate={this.props.applicantBirthdate}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            bind={true}
            scrollIntoView={this.props.scrollIntoView}
            required={this.props.required}
            requireRelationshipRelativesForeignGovtAffExplanation={requireRelationshipRelativesForeignGovtAffExplanation}
            requireRelationshipRelativesUSResidenceDoc={requireRelationshipRelativesUSResidenceDoc}
          />
        </Accordion>
      </div>
    )
  }
}

Relatives.defaultProps = {
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'relationships',
  subsection: 'relatives',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('relationships.relatives', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
  scrollIntoView: false,
}

export default connectRelationshipsSection(Relatives, sectionConfig)
