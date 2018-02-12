import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { DrugUseValidator } from '../../../../validators'
import { Summary } from '../../../Summary'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import DrugUse from './DrugUse'

export default class DrugUses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateUsedDrugs = this.updateUsedDrugs.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        UsedDrugs: this.props.UsedDrugs,
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

  updateUsedDrugs (values) {
    this.update({
      UsedDrugs: values,
      List: values.value === 'Yes' ? this.props.List : {}
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const drug = (o.DrugType || {}).value

    return Summary({
      type: i18n.t('substance.drugs.use.collection.itemType'),
      index: index,
      left: drug,
      right: null,
      placeholder: i18n.m('substance.drugs.use.collection.summary')
    })
  }

  render () {
    return (
      <div className="drug-uses">
        {i18n.m('substance.drugs.para.drugUses')}
        <Branch name="UsedDrugs"
                label={i18n.t('substance.drugs.heading.drugUses')}
                labelSize="h2"
                className="used-drugs"
                {...this.props.UsedDrugs}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateUsedDrugs}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('substance.drugs.use.para.drugUses')}
        </Branch>

        <Show when={this.props.UsedDrugs.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={DrugUseValidator}
                     description={i18n.t('substance.drugs.use.collection.description')}
                     appendTitle={i18n.t('substance.drugs.use.collection.appendTitle')}
                     appendLabel={i18n.t('substance.drugs.use.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <DrugUse name="Item"
                     bind={true}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugUses.defaultProps = {
  UsedDrugs: {},
  List: {},
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'drugs/usage',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('substance.drug.usage', data))
  },
  scrollToBottom: ''
}
