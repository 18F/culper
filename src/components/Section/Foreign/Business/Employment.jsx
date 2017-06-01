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

    this.state = {
      HasForeignEmployment: props.HasForeignEmployment,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateHasForeignEmployment = this.updateHasForeignEmployment.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignEmployment: this.state.HasForeignEmployment,
          List: this.state.List,
          ListBranch: this.state.ListBranch
        })
      }
    })
  }

  updateHasForeignEmployment (value) {
    this.onUpdate('HasForeignEmployment', value)
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
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
                help="foreign.business.employment.help.branch"
                value={this.state.HasForeignEmployment}
                onUpdate={this.updateHasForeignEmployment}
                onError={this.handleError}
                />

        <Show when={this.state.HasForeignEmployment === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
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
    return new ForeignBusinessEmploymentValidator(state, props).isValid()
  },
  defaultState: true
}
