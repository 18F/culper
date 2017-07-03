import React from 'react'
import { i18n } from '../../../../config'
import { ForeignBusinessAdviceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Name, Country, DateRange } from '../../../Form'

export default class Advice extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignAdvice = this.updateHasForeignAdvice.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignAdvice: this.props.HasForeignAdvice,
      ...queue
    })
  }

  updateHasForeignAdvice (value) {
    this.update({
      HasForeignAdvice: value,
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
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.business.advice.collection.summary.unknown')

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.advice.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-advice">
        <Branch name="has_foreign_advice"
                label={i18n.t('foreign.business.advice.heading.title')}
                labelSize="h3"
                adjustFor="p"
                value={this.props.HasForeignAdvice}
                warning={true}
                onUpdate={this.updateHasForeignAdvice}
                onError={this.handleError}>
          {i18n.m('foreign.business.advice.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignAdvice === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.advice.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.advice.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.advice.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.advice.collection.append')}>
            <Field title={i18n.t('foreign.business.advice.heading.description')}>
              <Textarea name="Description"
                        className="advice-description"
                        bind={true}
                        />
            </Field>

            <h3>{i18n.t('foreign.business.advice.heading.name')}</h3>
            <Name name="Name"
                  className="advice-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.business.advice.heading.organization')}>
              <Text name="Organization"
                    className="advice-organization"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.country')}>
              <Country name="Country"
                       className="advice-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.dates')}
                   help="foreign.business.advice.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="advice-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.compensation')}>
              <Textarea name="Compensation"
                        className="advice-compensation"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Advice.defaultProps = {
  name: 'Advice',
  HasForeignAdvice: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/advice',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessAdviceValidator(props, props).isValid()
  },
  defaultState: true
}
