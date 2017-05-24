import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignBusinessEmploymentValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion } from '../../../Form'
import JobOffer from './JobOffer'

export default class Employment extends ValidationElement {
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

  // /**
  //  * Handle the validation event.
  //  */
  // handleValidation (event, status, error) {
  //   if (!event) {
  //     return
  //   }

  //   const codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
  //   let complexStatus = null
  //   if (codes.length > 0) {
  //     complexStatus = false
  //   } else if (this.isValid()) {
  //     complexStatus = true
  //   }

  //   this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
  //     const errorObject = { [this.props.name]: codes }
  //     const statusObject = { [this.props.name]: { status: complexStatus } }
  //     super.handleValidation(event, statusObject, errorObject)
  //   })
  // }

  // isValid () {
  //   return new ForeignBusinessEmploymentValidator(this.state, null).isValid()
  // }

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
                onError={this.props.onError}
                />

        <Show when={this.state.HasForeignEmployment === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.props.onError}
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
  onError: (value, arr) => { return arr }
}
