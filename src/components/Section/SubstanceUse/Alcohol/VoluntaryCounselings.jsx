import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { VoluntaryCounselingValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import VoluntaryCounseling from './VoluntaryCounseling'
import { Summary, DateSummary } from '../../../Summary'

export default class VoluntaryCounselings extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSoughtTreatment = this.updateSoughtTreatment.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        SoughtTreatment: this.props.SoughtTreatment,
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

  updateSoughtTreatment (values) {
    this.update({
      SoughtTreatment: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const counselor = o.TreatmentProviderName ? o.TreatmentProviderName.value : ''
    const counselingDates = DateSummary(o.CounselingDates)

    return Summary({
      type: i18n.t('substance.alcohol.voluntaryCounseling.collection.itemType'),
      index: index,
      left: counselor,
      right: counselingDates,
      placeholder: i18n.m('substance.alcohol.voluntaryCounseling.collection.summary')
    })
  }

  render () {
    return (
      <div className="voluntary-counselings">
        <Branch name="SoughtTreatment"
                label={i18n.t('substance.alcohol.heading.voluntaryCounseling')}
                labelSize="h2"
                className="sought-treatment"
                {...this.props.SoughtTreatment}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateSoughtTreatment}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.SoughtTreatment.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={VoluntaryCounselingValidator}
                     description={i18n.t('substance.alcohol.voluntaryCounseling.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.voluntaryCounseling.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.voluntaryCounseling.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
        <VoluntaryCounseling name="Item"
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

VoluntaryCounselings.defaultProps = {
  SoughtTreatment: {},
  List: Accordion.defaultList,
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/voluntary',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('substance.alcohol.voluntary', data))
  },
  scrollToBottom: ''
}
