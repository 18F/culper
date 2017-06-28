import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
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
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasForeignEmployment: this.props.HasForeignEmployment
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateHasForeignEmployment (value) {
    this.update([
      { name: 'HasForeignEmployment', value: value },
      { name: 'List', value: value === 'Yes' ? this.props.List : [] },
      { name: 'ListBranch', value: value === 'Yes' ? this.props.ListBranch : '' }
    ])
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  summary (item, index) {
    const obj = item || {}
    const job = `${(obj.Description || {}).value || ''}`.trim() || i18n.t('foreign.business.employment.collection.summary.unknown')
    const date = DateSummary(item.Date)

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.employment.collection.summary.item')} {index + 1}:</span>
        <span><strong>{job}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
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
          <Accordion minimum="1"
                     items={this.props.List}
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
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/employment',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessEmploymentValidator(props, props).isValid()
  },
  defaultState: true
}
