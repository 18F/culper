import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessSponsorshipValidator, SponsorshipValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import SponsorshipItem from './SponsorshipItem'

export default class Sponsorship extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignSponsorship = this.updateHasForeignSponsorship.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignSponsorship: this.props.HasForeignSponsorship,
      ...queue
    })
  }

  updateHasForeignSponsorship (values) {
    this.update({
      HasForeignSponsorship: values,
      List: values.value === 'Yes' ? this.props.List : [],
      ListBranch: values.value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = ((item && item.Item) || {})
    const dates = DateSummary(obj.Dates)
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.sponsorship.collection.summary.item'),
      index: index,
      left: name,
      right: dates,
      placeholder: i18n.m('foreign.business.sponsorship.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-sponsorship">
        <Branch name="has_foreign_sponsorship"
                label={i18n.t('foreign.business.sponsorship.heading.title')}
                labelSize="h2"
                help="foreign.business.sponsorship.help.branch"
                {...this.props.HasForeignSponsorship}
                warning={true}
                onUpdate={this.updateHasForeignSponsorship}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasForeignSponsorship.value === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={SponsorshipValidator}
                     summary={this.summary}
                     description={i18n.t('foreign.business.sponsorship.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.sponsorship.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.sponsorship.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
                     <SponsorshipItem name="Item"
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

Sponsorship.defaultProps = {
  name: 'Sponsorship',
  HasForeignSponsorship: {},
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/sponsorship',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return validate(schema('foreign.business.sponsorship', props))
  },
  defaultState: true,
  scrollToBottom: ''
}
