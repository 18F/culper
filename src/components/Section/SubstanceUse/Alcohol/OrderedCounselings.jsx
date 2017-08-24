import React from 'react'
import { i18n } from '../../../../config'
import { AlcoholOrderedCounselingsValidator } from '../../../../validators'
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

  updateHasBeenOrdered (values) {
    this.update({
      HasBeenOrdered: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).OrderedCounseling || {}
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
        <h2>{i18n.t('substance.alcohol.heading.orderedCounseling')}</h2>
        <Branch name="HasBeenOrdered"
                className="has-been-ordered"
                value={this.props.HasBeenOrdered}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasBeenOrdered}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasBeenOrdered === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.alcohol.orderedCounseling.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.orderedCounseling.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.orderedCounseling.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
        <OrderedCounseling name="OrderedCounseling"
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
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/ordered',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new AlcoholOrderedCounselingsValidator(props).isValid()
  },
  scrollToBottom: ''
}
