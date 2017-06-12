import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsAdvocatingValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Textarea } from '../../../Form'

export default class Advocating extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasAdvocated: this.props.HasAdvocated
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  updateBranch (values) {
    this.update([
      { name: 'HasAdvocated', value: values }
    ])
  }

  summary (item, index) {
    const type = i18n.t('legal.associations.advocating.collection.item')
    const unknown = i18n.t('legal.associations.advocating.collection.unknown')
    const o = item || {}
    const details = (o.Reasons || {}).value
          ? o.Reasons.value
          : unknown
    const dates = DateSummary(o.Dates)

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span><strong>{details}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="legal-associations-advocating">
        <Branch name="has_advocated"
                label={i18n.t('legal.associations.advocating.heading.title')}
                labelSize="h3"
                className="legal-associations-advocating-has-advocated"
                value={this.props.HasAdvocated}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasAdvocated === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.associations.advocating.collection.description')}
                     appendTitle={i18n.t('legal.associations.advocating.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.advocating.collection.appendLabel')}>
            <Field title={i18n.t('legal.associations.advocating.heading.reasons')}
                   help="legal.associations.advocating.help.reasons"
                   adjustFor="textarea">
              <Textarea name="Reasons"
                        className="legal-associations-advocating-reasons"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('legal.associations.advocating.heading.dates')}
                   help="legal.associations.advocating.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="legal-associations-advocating-dates"
                         bind={true}
                         />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Advocating.defaultProps = {
  name: 'advocating',
  HasAdvocated: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/advocating',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsAdvocatingValidator(state, props).isValid()
  }
}
