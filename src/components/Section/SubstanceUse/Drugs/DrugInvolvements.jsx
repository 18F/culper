import React from 'react'
import { i18n } from '../../../../config'
import schematize from '../../../../schema'
import validate from '../../../../validators'
import { Summary } from '../../../Summary'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import DrugInvolvement from './DrugInvolvement'
import { DrugInvolvementsValidator, DrugInvolvementValidator } from '../../../../validators'

export default class DrugInvolvements extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateInvolved = this.updateInvolved.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Involved: this.props.Involved,
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

  updateInvolved (values) {
    this.update({
      Involved: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
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
      placeholder: i18n.m('substance.drugs.involvement.collection.summary')
    })
  }

  render () {
    return (
      <div className="drug-involvements">
        <Branch name="Involved"
                label={i18n.m('substance.drugs.heading.drugInvolvement')}
                labelSize="h2"
                className="involved"
                value={this.props.Involved}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateInvolved}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.Involved === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={DrugInvolvementValidator}
                     description={i18n.t('substance.drugs.involvement.collection.description')}
                     appendTitle={i18n.t('substance.drugs.involvement.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.involvement.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <DrugInvolvement name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugInvolvements.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/purchase',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schematize('substance.drug.purchase', props))
  },
  scrollToBottom: ''
}
