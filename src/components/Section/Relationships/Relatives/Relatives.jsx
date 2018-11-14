import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, NameSummary } from '../../../Summary'
import { RelativesValidator, RelativeValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Accordion } from '../../../Form'
import Relative from './Relative'
import alternateAddressProvider from '../../../Form/Location/alternateAddressProvider'

const RelativeWithAlternateAddress = alternateAddressProvider(Relative)

export default class Relatives extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      ...queue
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary(item, index) {
    const o = (item || {}).Item || {}
    const relation =
      (o.Relations || []).length > 0
        ? o.Relations[0]
        : i18n.t('relationships.relatives.collection.summary.item')
    const name = NameSummary(o.Name)

    return Summary({
      type: relation,
      index: index,
      left: name,
      right: null,
      placeholder: i18n.t('relationships.relatives.collection.summary.unknown')
    })
  }

  validMaritalRelations() {
    return new RelativesValidator(this.props).validMaritalRelations()
  }

  validRelations() {
    return new RelativesValidator(this.props).validMinimumRelations()
  }

  render() {
    return (
      <div
        className="section-content relatives"
        {...super.dataAttributes(this.props)}>
        <Field
          title={i18n.t('relationships.relatives.heading.title')}
          titleSize="h2"
          optional={true}
          className="no-margin-bottom">
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
              valid: this.validMaritalRelations()
            }
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
          appendLabel={i18n.t('relationships.relatives.collection.append')}>
          <RelativeWithAlternateAddress
            name="Item"
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            bind={true}
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
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'relationships',
  subsection: 'relatives',
  addressBooks: {},
  dispatch: () => {},
  validator: data => {
    return validate(schema('relationships.relatives', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
