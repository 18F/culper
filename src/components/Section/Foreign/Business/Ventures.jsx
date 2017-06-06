import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignBusinessVenturesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Name, Country, DateRange, Address } from '../../../Form'

export default class Ventures extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignVentures: props.HasForeignVentures,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateHasForeignVentures = this.updateHasForeignVentures.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignVentures: this.state.HasForeignVentures,
          List: this.state.List,
          ListBranch: this.state.ListBranch
        })
      }
    })
  }

  updateHasForeignVentures (value) {
    this.onUpdate('HasForeignVentures', value)
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  summary (item, index) {
    const obj = item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.business.ventures.collection.summary.unknown')
    const date = DateSummary(item.Dates)

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.ventures.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-ventures">
        <Branch name="has_foreign_ventures"
                label={i18n.t('foreign.business.ventures.heading.title')}
                labelSize="h3"
                adjustFor="p"
                help="foreign.business.ventures.help.branch"
                value={this.state.HasForeignVentures}
                onUpdate={this.updateHasForeignVentures}
                onError={this.handleError}>
          {i18n.m('foreign.business.ventures.para.branch')}
        </Branch>

        <Show when={this.state.HasForeignVentures === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.ventures.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.ventures.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.ventures.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.ventures.collection.append')}>
            <h3>{i18n.t('foreign.business.ventures.heading.name')}</h3>
            <Name name="Name"
                  className="ventures-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.business.ventures.heading.address')}
                   help="foreign.business.ventures.help.address"
                   adjustFor="address">
              <Address name="Address"
                       className="ventures-address"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.citizenship')}
                   help="foreign.business.ventures.help.citizenship">
              <Country name="Citizenship"
                       className="ventures-citizenship"
                       multiple={true}
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.description')}
                   help="foreign.business.ventures.help.description">
              <Textarea name="Description"
                        className="ventures-description"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.relationship')}
                   help="foreign.business.ventures.help.relationship">
              <Textarea name="Relationship"
                        className="ventures-relationship"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.dates')}
                   help="foreign.business.ventures.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="ventures-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.association')}
                   help="foreign.business.ventures.help.association">
              <Textarea name="Association"
                        className="ventures-association"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.position')}
                   help="foreign.business.ventures.help.position">
              <Text name="Position"
                    className="ventures-position"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.service')}
                   help="foreign.business.ventures.help.service">
              <Text name="Service"
                    className="ventures-service"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.support')}
                   help="foreign.business.ventures.help.support">
              <Text name="Support"
                    className="ventures-support"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.compensation')}
                   help="foreign.business.ventures.help.compensation">
              <Textarea name="Compensation"
                        className="ventures-compensation"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Ventures.defaultProps = {
  name: 'Ventures',
  HasForeignVentures: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/ventures',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessVenturesValidator(state, props).isValid()
  },
  defaultState: true
}
