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
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasForeignSponsorship === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.sponsorship.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.sponsorship.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.sponsorship.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
         <Field title={i18n.t('foreign.business.sponsorship.heading.name')}
           scrollIntoView={this.props.scrollIntoView}>
              <Name name="Name"
                    className="foreign-business-sponsorship-name"
                    bind={true}
                    required={this.props.required}
                    scrollIntoView={this.props.scrollIntoView}
                    />
          </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.birthdate')}
                   help="foreign.business.sponsorship.help.birthdate"
                   adjustFor="datecontrol"
                   scrollIntoView={this.props.scrollIntoView}>
              <NotApplicable name="BirthdateNotApplicable"
                             label={i18n.t('foreign.business.sponsorship.label.idk')}
                             or={i18n.m('foreign.business.sponsorship.para.or')}
                             required={this.props.required}
                             bind={true}>
                <DateControl name="Birthdate"
                             className="foreign-business-sponsorship-birthdate"
                             bind={true}
                             required={this.props.required}
                             />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.birthplace')}
                   adjustFor="birthplace"
                   validate={false}
                   scrollIntoView={this.props.scrollIntoView}>
              <Location name="Birthplace"
                        layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
                        label={i18n.t('foreign.business.sponsorship.label.birthplace')}
                        cityPlaceholder={i18n.t('foreign.business.sponsorship.placeholder.city')}
                        countryPlaceholder={i18n.t('foreign.business.sponsorship.placeholder.country')}
                        className="foreign-business-sponsorship-birthplace"
                        addressBooks={this.props.addressBooks}
                        addressBook="ForeignNational"
                        dispatch={this.props.dispatch}
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.address')}
                   help="foreign.business.sponsorship.help.address"
                   adjustFor="address"
                   scrollIntoView={this.props.scrollIntoView}>
              <Location name="Address"
                        className="foreign-business-sponsorship-address"
                        layout={Location.ADDRESS}
                        addressBooks={this.props.addressBooks}
                        addressBook="ForeignNational"
                        dispatch={this.props.dispatch}
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.citizenship')}
                   help="foreign.business.sponsorship.help.citizenship"
                   adjustFor="country"
                   scrollIntoView={this.props.scrollIntoView}>
              <Country name="Citizenship"
                       className="foreign-business-sponsorship-citizenship"
                       multiple={true}
                       bind={true}
                       required={this.props.required}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.organization')}
              adjustFor="text"
              scrollIntoView={this.props.scrollIntoView}>
              <NotApplicable name="OrganizationNotApplicable"
                             or={i18n.m('foreign.business.sponsorship.para.or')}
                             required={this.props.required}
                             bind={true}>
                <Text name="Organization"
                      className="foreign-business-sponsorship-organization"
                      bind={true}
                      required={this.props.required}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.organizationaddress')}
                   help="foreign.business.sponsorship.help.organizationaddress"
                   adjustFor="address"
                   scrollIntoView={this.props.scrollIntoView}>
              <NotApplicable name="OrganizationAddressNotApplicable"
                             or={i18n.m('foreign.business.sponsorship.para.or')}
                             required={this.props.required}
                             bind={true}>
                <Location name="OrganizationAddress"
                          className="foreign-business-sponsorship-organizationaddress"
                          layout={Location.ADDRESS}
                          geocode={true}
                          addressBooks={this.props.addressBooks}
                          addressBook="Organization"
                          dispatch={this.props.dispatch}
                          bind={true}
                          required={this.props.required}
                          />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.dates')}
                   help="foreign.business.sponsorship.help.dates"
                   adjustFor="daterange"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateRange name="Dates"
                         className="foreign-business-sponsorship-dates"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.residence')}
              adjustFor="address no-buttons"
              scrollIntoView={this.props.scrollIntoView}>
              <Location name="Residence"
                        className="foreign-business-sponsorship-residence"
                        disableToggle={true}
                        layout={Location.ADDRESS}
                        geocode={true}
                        addressBooks={this.props.addressBooks}
                        addressBook="ForeignNational"
                        dispatch={this.props.dispatch}
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.stay')}
              adjustFor="textarea"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Stay"
                        className="foreign-business-sponsorship-stay"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.sponsorship')}
              adjustFor="textarea"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Sponsorship"
                        className="foreign-business-sponsorship-sponsorship"
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

Sponsorship.defaultProps = {
  name: 'Sponsorship',
  HasForeignSponsorship: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/sponsorship',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new ForeignBusinessSponsorshipValidator(state, props).isValid()
  },
  defaultState: true,
  scrollToBottom: ''
}
