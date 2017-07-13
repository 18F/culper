import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary, NameSummary } from '../../../Summary'
import { ForeignBusinessVenturesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Name, Country, DateRange, Location } from '../../../Form'

export default class Ventures extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignVentures = this.updateHasForeignVentures.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasForeignVentures: this.props.HasForeignVentures,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateHasForeignVentures (value) {
    this.update({
      HasForeignVentures: value,
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
    const date = DateSummary(item.Dates)
    const name = NameSummary(obj.Name, date === '' ? i18n.m('foreign.business.ventures.collection.summary.unknown') : '')

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.ventures.collection.summary.item')} {index + 1}:</span>
        <span><strong>{name}</strong></span>
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
                value={this.props.HasForeignVentures}
                warning={true}
                onUpdate={this.updateHasForeignVentures}
                onError={this.handleError}>
          {i18n.m('foreign.business.ventures.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignVentures === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
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
              <Location name="Address"
                        className="ventures-address"
                        layout={Location.ADDRESS}
                        geocode={true}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/ventures',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessVenturesValidator(props, props).isValid()
  },
  defaultState: true
}
