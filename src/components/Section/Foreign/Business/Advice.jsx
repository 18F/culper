import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary } from '../../../Summary'
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
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.advice.collection.summary.item'),
      index: index,
      left: name,
      right: null,
      placeholder: i18n.m('foreign.business.advice.collection.summary.unknown')
    })
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
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
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
                     appendLabel={i18n.t('foreign.business.advice.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
           <Field title={i18n.t('foreign.business.advice.heading.description')}
             scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Description"
                        className="advice-description"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.name')}
              scrollIntoView={this.props.scrollIntoView}>
              <Name name="Name"
                    className="advice-name"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>
            <Field title={i18n.t('foreign.business.advice.heading.organization')}
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="Organization"
                    className="advice-organization"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.country')}
              scrollIntoView={this.props.scrollIntoView}>
              <Country name="Country"
                       className="advice-country"
                       bind={true}
                       required={this.props.required}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.dates')}
                   help="foreign.business.advice.help.dates"
                   adjustFor="daterange"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateRange name="Dates"
                         className="advice-dates"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.compensation')}
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Compensation"
                        className="advice-compensation"
                        bind={true}
                        required={this.props.required}
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
