import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { OrderedCounselingValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import OrderedCounseling from './OrderedCounseling'
import { Summary, DateSummary } from '../../../Summary'

export default class OrderedCounselings extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasBeenOrdered = this.updateHasBeenOrdered.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasBeenOrdered: this.props.HasBeenOrdered,
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

  updateHasBeenOrdered (values) {
    this.update({
      HasBeenOrdered: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const counselingDates = DateSummary(o.CounselingDates)

    let seekers = []
    for (const s of (o.Seekers || [])) {
      switch (s) {
        case 'Employer':
          seekers.push('Employer')
          break
        case 'MedicalProfessional':
          seekers.push('Medical professional')
          break
        case 'MentalHealthProfessional':
          seekers.push('Mental health professional')
          break
        case 'CourtOfficial':
          seekers.push('Court official')
          break
        case 'NotOrdered':
          seekers.push('Not ordered')
          break
        case 'Other':
          seekers.push((o.OtherSeeker || {}).value || 'Other')
          break
      }
    }

    return Summary({
      type: i18n.t('substance.alcohol.orderedCounseling.collection.itemType'),
      index: index,
      left: seekers.join(', '),
      right: counselingDates,
      placeholder: i18n.m('substance.alcohol.receivedCounseling.collection.summary')
    })
  }

  render () {
    return (
      <div className="ordered-counselings">
        <Branch name="HasBeenOrdered"
                label={i18n.t('substance.alcohol.heading.orderedCounseling')}
                labelSize="h2"
                className="has-been-ordered"
                {...this.props.HasBeenOrdered}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasBeenOrdered}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasBeenOrdered.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={OrderedCounselingValidator}
                     description={i18n.t('substance.alcohol.orderedCounseling.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.orderedCounseling.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.orderedCounseling.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
        <OrderedCounseling name="Item"
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

OrderedCounselings.defaultProps = {
  HasBeenOrdered: {},
  List: Accordion.defaultList,
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/ordered',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('substance.alcohol.ordered', data))
  },
  scrollToBottom: ''
}
