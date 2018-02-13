import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { DrugOrderedTreatmentValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import OrderedTreatment from './OrderedTreatment'

export default class OrderedTreatments extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateTreatmentOrdered = this.updateTreatmentOrdered.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        TreatmentOrdered: this.props.TreatmentOrdered,
        List: this.props.List,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateTreatmentOrdered (values) {
    this.update({
      TreatmentOrdered: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.TreatmentDates)
    const explanation = (o.Explanation || {}).value

    return Summary({
      type: i18n.t('substance.drugs.ordered.collection.itemType'),
      index: index,
      left: explanation,
      right: range,
      placeholder: i18n.m('substance.drugs.ordered.collection.summary')
    })
  }

  render () {
    return (
      <div className="ordered-treatments">
        <Branch name="TreatmentOrdered"
                label={i18n.t('substance.drugs.heading.orderedTreatments')}
                labelSize="h2"
                className="treatment-ordered"
                {...this.props.TreatmentOrdered}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateTreatmentOrdered}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.TreatmentOrdered.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={DrugOrderedTreatmentValidator}
                     description={i18n.t('substance.drugs.ordered.collection.description')}
                     appendTitle={i18n.t('substance.drugs.ordered.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.ordered.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <OrderedTreatment name="Item"
                              bind={true}
                              addressBooks={this.props.addressBooks}
                              dispatch={this.props.dispatch}
                              required={this.props.required}
                              scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OrderedTreatments.defaultProps = {
  TreatmentOrdered: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/ordered',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('substance.drugs.ordered', data))
  },
  scrollToBottom: ''
}
