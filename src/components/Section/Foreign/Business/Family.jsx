import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary } from '../../../Summary'
import { ForeignBusinessFamilyValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Name, Country, DateControl } from '../../../Form'

export default class Family extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignFamily = this.updateHasForeignFamily.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignFamily: this.props.HasForeignFamily,
      ...queue
    })
  }

  updateHasForeignFamily (value) {
    this.update({
      HasForeignFamily: value,
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
      type: i18n.t('foreign.business.family.collection.summary.item'),
      index: index,
      left: name,
      right: null,
      placeholder: i18n.m('foreign.business.family.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-family">
        <Branch name="has_foreign_family"
                label={i18n.t('foreign.business.family.heading.title')}
                labelSize="h3"
                adjustFor="p"
                value={this.props.HasForeignFamily}
                warning={true}
                onUpdate={this.updateHasForeignFamily}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.business.family.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignFamily === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.family.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.family.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.family.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.family.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
           <Field title={i18n.t('foreign.business.family.heading.name')}
             scrollIntoView={this.props.scrollIntoView}>
              <Name name="Name"
                    className="family-name"
                    bind={true}
                    required={this.props.required}
                    scrollIntoView={this.props.scrollIntoView}
                    />
          </Field>

          <Field title={i18n.t('foreign.business.family.heading.agency')}
            scrollIntoView={this.props.scrollIntoView}>
              <Text name="Agency"
                    className="family-agency"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.country')}
              scrollIntoView={this.props.scrollIntoView}>
              <Country name="Country"
                       className="family-country"
                       bind={true}
                       required={this.props.required}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.date')}
                   help="foreign.business.family.help.date"
                   adjustFor="datecontrol"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateControl name="Date"
                           className="family-date"
                           bind={true}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.circumstances')}
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Circumstances"
                        className="family-circumstances"
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

Family.defaultProps = {
  name: 'Family',
  HasForeignFamily: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/family',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessFamilyValidator(props, props).isValid()
  },
  defaultState: true,
  scrollToBottom: ''
}
