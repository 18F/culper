import React from 'react'
import { i18n } from '../../../../config'
import { AlcoholOrderedCounselingsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import OrderedCounseling from './OrderedCounseling'
import { DateSummary } from '../../../Summary'

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
    this.update({HasBeenOrdered: values})
  }

  summary (item, index) {
    const o = (item || {}).OrderedCounseling || {}
    const counselingDates = DateSummary(o.CounselingDates)
    const type = i18n.t('substance.alcohol.orderedCounseling.collection.itemType')

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

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <Show when={!seekers && !counselingDates}>
            <strong>{i18n.t('substance.alcohol.receivedCounseling.collection.summary')}</strong>
          </Show>
          <Show when={seekers || counselingDates}>
            <strong>{seekers.join(', ')}</strong>
          </Show>
        </span>
        <span className="dates"><strong>{counselingDates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="ordered-counselings">
        <h2>{i18n.t('substance.alcohol.heading.orderedCounseling')}</h2>
        <Branch name="HasBeenOrdered"
                className="has-been-ordered"
                value={this.props.HasBeenOrdered}
                onError={this.handleError}
                onUpdate={this.updateHasBeenOrdered}>
        </Branch>

        <Show when={this.props.HasBeenOrdered === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.alcohol.orderedCounseling.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.orderedCounseling.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.orderedCounseling.collection.appendLabel')}>
            <OrderedCounseling name="OrderedCounseling" bind={true} />
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
  dispatch: () => {},
  validator: (state, props) => {
    return new AlcoholOrderedCounselingsValidator(props).isValid()
  }
}
