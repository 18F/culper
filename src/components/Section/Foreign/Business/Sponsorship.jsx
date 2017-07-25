import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessSponsorshipValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateControl, Name,
         Location, DateRange, NotApplicable } from '../../../Form'

export default class Sponsorship extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignSponsorship = this.updateHasForeignSponsorship.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignSponsorship: this.props.HasForeignSponsorship,
      ...queue
    })
  }

  updateHasForeignSponsorship (values) {
    this.update({
      HasForeignSponsorship: values,
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
    const dates = DateSummary(obj.Dates)
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.business.sponsorship.collection.summary.item'),
      index: index,
      left: name,
      right: dates,
      placeholder: i18n.m('foreign.business.sponsorship.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-sponsorship">
        <Branch name="has_foreign_sponsorship"
                label={i18n.t('foreign.business.sponsorship.heading.title')}
                labelSize="h3"
                help="foreign.business.sponsorship.help.branch"
                value={this.props.HasForeignSponsorship}
                warning={true}
                onUpdate={this.updateHasForeignSponsorship}
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.HasForeignSponsorship === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.sponsorship.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.sponsorship.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.sponsorship.collection.append')}>
            <h3>{i18n.t('foreign.business.sponsorship.heading.name')}</h3>
            <Name name="Name"
                  className="foreign-business-sponsorship-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.business.sponsorship.heading.birthdate')}
                   help="foreign.business.sponsorship.help.birthdate"
                   adjustFor="datecontrol">
              <NotApplicable name="BirthdateNotApplicable"
                             label={i18n.t('foreign.business.sponsorship.label.idk')}
                             or={i18n.m('foreign.business.sponsorship.para.or')}
                             bind={true}>
                <DateControl name="Birthdate"
                             className="foreign-business-sponsorship-birthdate"
                             bind={true}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.birthplace')}
                   adjustFor="birthplace"
                   validate={false}>
              <Location name="Birthplace"
                        layout={Location.CITY_COUNTRY}
                        fields={['city', 'country']}
                        help=""
                        label={i18n.t('foreign.business.sponsorship.label.birthplace')}
                        cityPlaceholder={i18n.t('foreign.business.sponsorship.placeholder.city')}
                        countryPlaceholder={i18n.t('foreign.business.sponsorship.placeholder.country')}
                        hideCounty={true}
                        className="foreign-business-sponsorship-birthplace"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.address')}
                   help="foreign.business.sponsorship.help.address"
                   adjustFor="address">
              <Location name="Address"
                        className="foreign-business-sponsorship-address"
                        layout={Location.ADDRESS}
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.citizenship')}
                   help="foreign.business.sponsorship.help.citizenship"
                   adjustFor="country">
              <Country name="Citizenship"
                       className="foreign-business-sponsorship-citizenship"
                       multiple={true}
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.organization')}
                   adjustFor="text">
              <NotApplicable name="OrganizationNotApplicable"
                             or={i18n.m('foreign.business.sponsorship.para.or')}
                             bind={true}>
                <Text name="Organization"
                      className="foreign-business-sponsorship-organization"
                      bind={true}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.organizationaddress')}
                   help="foreign.business.sponsorship.help.organizationaddress"
                   adjustFor="address">
              <NotApplicable name="OrganizationAddressNotApplicable"
                             or={i18n.m('foreign.business.sponsorship.para.or')}
                             bind={true}>
                <Location name="OrganizationAddress"
                          className="foreign-business-sponsorship-organizationaddress"
                          layout={Location.ADDRESS}
                          geocode={true}
                          bind={true}
                          />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.dates')}
                   help="foreign.business.sponsorship.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="foreign-business-sponsorship-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.residence')}
                   adjustFor="address no-buttons">
              <Location name="Residence"
                        className="foreign-business-sponsorship-residence"
                        disableToggle={true}
                        layout={Location.ADDRESS}
                        geocode={true}
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.stay')}
                   adjustFor="textarea">
              <Textarea name="Stay"
                        className="foreign-business-sponsorship-stay"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.sponsorship')}
                   adjustFor="textarea">
              <Textarea name="Sponsorship"
                        className="foreign-business-sponsorship-sponsorship"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Sponsorship.defaultProps = {
  name: 'Sponsorship',
  HasForeignSponsorship: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/sponsorship',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessSponsorshipValidator(state, props).isValid()
  },
  defaultState: true
}
