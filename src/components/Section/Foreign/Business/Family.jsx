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
                onError={this.handleError}>
          {i18n.m('foreign.business.family.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignFamily === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.family.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.family.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.family.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.family.collection.append')}>
            <h3>{i18n.t('foreign.business.family.heading.name')}</h3>
            <Name name="Name"
                  className="family-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.business.family.heading.agency')}>
              <Text name="Agency"
                    className="family-agency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.country')}>
              <Country name="Country"
                       className="family-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.date')}
                   help="foreign.business.family.help.date"
                   adjustFor="datecontrol">
              <DateControl name="Date"
                           className="family-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.circumstances')}>
              <Textarea name="Circumstances"
                        className="family-circumstances"
                        bind={true}
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
  defaultState: true
}
