import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignBusinessPoliticalValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateRange } from '../../../Form'

export default class Political extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignPolitical = this.updateHasForeignPolitical.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignPolitical: this.props.HasForeignPolitical,
      ...queue
    })
  }

  updateHasForeignPolitical (values) {
    this.update({
      HasForeignPolitical: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
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
    const pos = (obj.Position || {}).value || i18n.m('foreign.business.political.collection.summary.unknown')
    const country = (obj.Country || {}).value || ''
    const dates = DateSummary(obj.Dates)
    const text = country.length ? `${pos} (${country})` : pos

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.political.collection.summary.item')} {index + 1}:</span>
        <span><strong>{text}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-political">
        <Branch name="has_foreign_political"
                label={i18n.t('foreign.business.political.heading.title')}
                labelSize="h3"
                help="foreign.business.political.help.branch"
                value={this.props.HasForeignPolitical}
                warning={true}
                onUpdate={this.updateHasForeignPolitical}
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.HasForeignPolitical === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.political.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.political.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.political.collection.append')}>
            <Field title={i18n.t('foreign.business.political.heading.position')}
                   help="foreign.business.political.help.position"
                   adjustFor="text">
              <Text name="Position"
                    className="foreign-business-political-position"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.dates')}
                   help="foreign.business.political.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="foreign-business-political-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.country')}
                   help="foreign.business.political.help.country"
                   adjustFor="country">
              <Country name="Country"
                       className="foreign-business-political-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.reason')}
                   help="foreign.business.political.help.reason"
                   adjustFor="textarea">
              <Textarea name="Reason"
                        className="foreign-business-political-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.eligibility')}
                   help="foreign.business.political.help.eligibility"
                   adjustFor="text">
              <Text name="Eligibility"
                    className="foreign-business-political-eligibility"
                    bind={true}
                    />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Political.defaultProps = {
  name: 'Political',
  HasForeignPolitical: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/political',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessPoliticalValidator(state, props).isValid()
  },
  defaultState: true
}
