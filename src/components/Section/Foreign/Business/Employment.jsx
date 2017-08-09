import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { ForeignBusinessEmploymentValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import JobOffer from './JobOffer'

export default class Employment extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasForeignEmployment = this.updateHasForeignEmployment.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignEmployment: this.props.HasForeignEmployment,
      ...queue
    })
  }

  updateHasForeignEmployment (value) {
    this.update({
      HasForeignEmployment: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = item || {}
    const date = DateSummary(item.Date)
    const job = `${(obj.Description || {}).value || ''}`.trim() || ''

    return Summary({
      type: i18n.t('foreign.business.employment.collection.summary.item'),
      index: index,
      left: job,
      right: date,
      placeholder: i18n.m('foreign.business.employment.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-employment">
        <Branch name="has_foreign_employment"
                label={i18n.t('foreign.business.employment.heading.title')}
                labelSize="h3"
                value={this.props.HasForeignEmployment}
                warning={true}
                onUpdate={this.updateHasForeignEmployment}
                onError={this.handleError}
                />

        <Show when={this.props.HasForeignEmployment === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.employment.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.employment.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.employment.collection.append')}>
            <JobOffer name="Item" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Employment.defaultProps = {
  name: 'Employment',
  HasForeignEmployment: '',
  List: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/employment',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessEmploymentValidator(props, props).isValid()
  },
  defaultState: true
}
