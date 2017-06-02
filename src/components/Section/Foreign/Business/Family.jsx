import React from 'react'
import { i18n } from '../../../../config'
import { ForeignBusinessFamilyValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Name, Country, DateControl } from '../../../Form'

export default class Family extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignFamily: props.HasForeignFamily,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateHasForeignFamily = this.updateHasForeignFamily.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignFamily: this.state.HasForeignFamily,
          List: this.state.List,
          ListBranch: this.state.ListBranch
        })
      }
    })
  }

  updateHasForeignFamily (value) {
    this.onUpdate('HasForeignFamily', value)
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  summary (item, index) {
    const obj = item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.business.family.collection.summary.unknown')

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.family.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-family">
        <Branch name="has_foreign_family"
                label={i18n.t('foreign.business.family.heading.title')}
                labelSize="h3"
                adjustFor="p"
                help="foreign.business.family.help.branch"
                value={this.state.HasForeignFamily}
                onUpdate={this.updateHasForeignFamily}
                onError={this.handleError}>
          {i18n.m('foreign.business.family.para.branch')}
        </Branch>

        <Show when={this.state.HasForeignFamily === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
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

            <Field title={i18n.t('foreign.business.family.heading.agency')}
                   help="foreign.business.family.help.agency">
              <Text name="Agency"
                    className="family-agency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.country')}
                   help="foreign.business.family.help.country">
              <Country name="Country"
                       className="family-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.date')}
                   help="foreign.business.family.help.date"
                   adjustFor="label">
              <DateControl name="Date"
                           className="family-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.circumstances')}
                   help="foreign.business.family.help.circumstances">
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
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/family',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessFamilyValidator(state, props).isValid()
  },
  defaultState: true
}
