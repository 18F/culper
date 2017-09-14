import React from 'react'
import { i18n } from '../../../../config'
import { AlcoholVoluntaryCounselingsValidator, VoluntaryCounselingValidator } from '../../../../validators'
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

  updateSoughtTreatment (values) {
    this.update({
      SoughtTreatment: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
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
        <h2>{i18n.t('substance.alcohol.heading.voluntaryCounseling')}</h2>
        <Branch name="SoughtTreatment"
                className="sought-treatment"
                value={this.props.SoughtTreatment}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateSoughtTreatment}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.SoughtTreatment === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
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
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/voluntary',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new AlcoholVoluntaryCounselingsValidator(props).isValid()
  },
  scrollToBottom: ''
}
