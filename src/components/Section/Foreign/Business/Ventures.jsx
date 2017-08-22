import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary, NameSummary } from '../../../Summary'
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
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.ventures.collection.summary.item'),
      index: index,
      left: name,
      right: date,
      placeholder: i18n.m('foreign.business.ventures.collection.summary.unknown')
    })
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
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
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
                     appendLabel={i18n.t('foreign.business.ventures.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
           <Field title={i18n.t('foreign.business.ventures.heading.name')}
             scrollIntoView={this.props.scrollIntoView}>
              <Name name="Name"
                    className="ventures-name"
                    bind={true}
                    required={this.props.required}
                    scrollIntoView={this.props.scrollIntoView}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.address')}
                   help="foreign.business.ventures.help.address"
                   adjustFor="address"
                   scrollIntoView={this.props.scrollIntoView}>
              <Location name="Address"
                        className="ventures-address"
                        layout={Location.ADDRESS}
                        addressBooks={this.props.addressBooks}
                        addressBook="ForeignNational"
                        dispatch={this.props.dispatch}
                        geocode={true}
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.citizenship')}
              help="foreign.business.ventures.help.citizenship"
              scrollIntoView={this.props.scrollIntoView}>
              <Country name="Citizenship"
                       className="ventures-citizenship"
                       multiple={true}
                       bind={true}
                       required={this.props.required}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.description')}
              help="foreign.business.ventures.help.description"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Description"
                        className="ventures-description"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.relationship')}
              help="foreign.business.ventures.help.relationship"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Relationship"
                        className="ventures-relationship"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.dates')}
                   help="foreign.business.ventures.help.dates"
                   adjustFor="daterange"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateRange name="Dates"
                         className="ventures-dates"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.association')}
              help="foreign.business.ventures.help.association"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Association"
                        className="ventures-association"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.position')}
              help="foreign.business.ventures.help.position"
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="Position"
                    className="ventures-position"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.service')}
              help="foreign.business.ventures.help.service"
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="Service"
                    className="ventures-service"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.support')}
              help="foreign.business.ventures.help.support"
              scrollIntoView={this.props.scrollIntoView}>
              <Text name="Support"
                    className="ventures-support"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.ventures.heading.compensation')}
              help="foreign.business.ventures.help.compensation"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Compensation"
                        className="ventures-compensation"
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

Ventures.defaultProps = {
  name: 'Ventures',
  HasForeignVentures: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/ventures',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new ForeignBusinessVenturesValidator(props, props).isValid()
  },
  defaultState: true
}
