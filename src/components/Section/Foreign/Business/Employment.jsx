import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary, NameSummary } from '../../../Summary'
import {
  ForeignBusinessEmploymentValidator,
  ForeignBusinessEmploymentItemValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import JobOffer from './JobOffer'

export default class Employment extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasForeignEmployment = this.updateHasForeignEmployment.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasForeignEmployment: this.props.HasForeignEmployment,
      ...queue
    })
  }

  updateHasForeignEmployment(values) {
    this.update({
      HasForeignEmployment: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  summary(item, index) {
    const o = (item || {}).Item || {}
    const date = DateSummary(o.Dates)
    const name = NameSummary(o.Name)
    const type = i18n.t('foreign.business.employment.collection.summary.item')

    return Summary({
      type: i18n.t('foreign.business.employment.collection.summary.item'),
      index: index,
      left: name,
      right: date,
      placeholder: i18n.t(
        'foreign.business.employment.collection.summary.unknown'
      )
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-business-employment"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="has_foreign_employment"
          label={i18n.t('foreign.business.employment.heading.title')}
          labelSize="h2"
          {...this.props.HasForeignEmployment}
          warning={true}
          onUpdate={this.updateHasForeignEmployment}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.HasForeignEmployment || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            validator={ForeignBusinessEmploymentItemValidator}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t(
              'foreign.business.employment.collection.summary.title'
            )}
            appendTitle={i18n.t(
              'foreign.business.employment.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'foreign.business.employment.collection.append'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <JobOffer
              name="Item"
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

Employment.defaultProps = {
  name: 'Employment',
  HasForeignEmployment: {},
  List: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'foreign',
  subsection: 'business/employment',
  dispatch: () => {},
  validator: data => {
    return validate(schema('foreign.business.employment', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
