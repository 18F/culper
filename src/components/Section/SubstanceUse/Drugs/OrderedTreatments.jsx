import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import OrderedTreatment from './OrderedTreatment'
import { DrugOrderedTreatmentsValidator } from '../../../../validators'

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
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateTreatmentOrdered (values) {
    this.update({
      TreatmentOrdered: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).OrderedTreatment || {}
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
        <h2>{i18n.m('substance.drugs.heading.orderedTreatments')}</h2>
        <Branch name="TreatmentOrdered"
                className="treatment-ordered"
                value={this.props.TreatmentOrdered}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateTreatmentOrdered}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.TreatmentOrdered === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.drugs.ordered.collection.description')}
                     appendTitle={i18n.t('substance.drugs.ordered.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.ordered.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <OrderedTreatment name="OrderedTreatment" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OrderedTreatments.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/ordered',
  dispatch: () => {},
  validator: (state, props) => {
    return new DrugOrderedTreatmentsValidator(props).isValid()
  }
}
