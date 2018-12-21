import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { DrugInvolvementValidator } from '../../../../validators'
import { Summary } from '../../../Summary'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import DrugInvolvement from './DrugInvolvement'

export default class DrugInvolvements extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInvolved = this.updateInvolved.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Involved: this.props.Involved,
        List: this.props.List,
        ...updateValues
      })
    }
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  updateInvolved(values) {
    this.update({
      Involved: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item || {}).Item || {}
    let drug = (o.DrugType || {}).DrugType
    if (drug === 'Other') {
      drug = ((o.DrugType || {}).DrugTypeOther || {}).value
    }

    return Summary({
      type: i18n.t('substance.drugs.involvement.collection.itemType'),
      index: index,
      left: drug,
      right: null,
      placeholder: i18n.t('substance.drugs.involvement.collection.summary')
    })
  }

  render() {
    return (
      <div
        className="section-content drug-involvements"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">Purchase</h1>
        <Branch
          name="Involved"
          label={i18n.t('substance.drugs.heading.drugInvolvement')}
          labelSize="h4"
          className="involved"
          {...this.props.Involved}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateInvolved}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.Involved.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={DrugInvolvementValidator}
            description={i18n.t(
              'substance.drugs.involvement.collection.description'
            )}
            appendTitle={i18n.t(
              'substance.drugs.involvement.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'substance.drugs.involvement.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <DrugInvolvement
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugInvolvements.defaultProps = {
  Involved: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => {
    return arr
  },
  section: 'substance',
  subsection: 'drugs/purchase',
  dispatch: () => {},
  validator: data => {
    return validate(schema('substance.drugs.purchase', data))
  },
  scrollToBottom: ''
}
