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

  componentDidMount() {
    this.checkRelativesSubsectionErrors(this.props.List.branch.value)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.List.branch.value !== this.props.List.branch.value) {
      this.checkRelativesSubsectionErrors(this.props.List.branch.value)
    }
  }

  checkRelativesSubsectionErrors = (value) => {
    const requiredErrors = (
      this.constructor.errors.map(err => (
        {
          code: `relatives.${err.code}`,
          valid: err.func(this.props),
        }
      ))
    )

    this.props.onError(value, requiredErrors)
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
    const { List } = this.props
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
          optional
          className="no-margin-bottom"
        >
          {i18n.m('relationships.relatives.para.opportunity')}
        </Field>

        {List.branch && List.branch.value === 'No' && (
          <Field
            errors={[{ code: 'validRelation', valid: this.validRelations() }]}
            className={this.validRelations() && 'hidden'}
          />
        )}

        {List.branch && List.branch.value === 'No' && (
          <Field
            errors={[
              {
                code: 'validMaritalRelation',
                valid: this.validMaritalRelations(),
              },
            ]}
            className={this.validMaritalRelations() && 'hidden'}
          />
        )}

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
            bind
            scrollIntoView={this.props.scrollIntoView}
            required={this.props.required}
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

Relatives.errors = [
  {
    code: 'validMaritalRelation',
    func: (props) => {
      if (
        props.List
        && props.List.branch
        && props.List.branch.value === 'No'
      ) {
        return new RelativesValidator(props).validMaritalRelations()
      }
      return null
    },
  },
]

export default connectRelationshipsSection(Relatives, sectionConfig)
