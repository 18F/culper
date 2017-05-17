import React from 'react'
import { i18n } from '../../../../config'
import { NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessSponsorshipValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateControl, Address, Name,
         BirthPlace, DateRange, NotApplicable } from '../../../Form'

export default class Sponsorship extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      error: props.error,
      valid: props.valid,
      errorCodes: []
    }

    this.updateHasForeignSponsorship = this.updateHasForeignSponsorship.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasForeignSponsorship: this.props.HasForeignSponsorship
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateHasForeignSponsorship (values) {
    this.update([
      { name: 'HasForeignSponsorship', value: values }
    ])
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  isValid () {
    return new ForeignBusinessSponsorshipValidator(this.state, this.props).isValid()
  }

  summary (item, index) {
    const obj = item || {}
    const name = NameSummary(obj.Name, i18n.t('foreign.business.sponsorship.collection.summary.unknown'))
    const dates = DateSummary(obj.Dates)

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.sponsorship.collection.summary.item')} {index + 1}:</span>
        <span><strong>{name}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-sponsorship">
        <Branch name="has_foreign_sponsorship"
                label={i18n.t('foreign.business.sponsorship.heading.title')}
                labelSize="h3"
                help="foreign.business.sponsorship.help.branch"
                value={this.props.HasForeignSponsorship}
                onUpdate={this.updateHasForeignSponsorship}
                onValidate={this.handleValidation}>
        </Branch>

        <Show when={this.props.HasForeignSponsorship === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.business.sponsorship.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.sponsorship.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.sponsorship.collection.appendMessage')}
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
                   help="foreign.business.sponsorship.help.birthplace"
                   adjustFor="birthplace"
                   validate={false}>
              <BirthPlace name="Birthplace"
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
              <Address name="Address"
                       className="foreign-business-sponsorship-address"
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
                   help="foreign.business.sponsorship.help.organization"
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
                <Address name="OrganizationAddress"
                         className="foreign-business-sponsorship-organizationaddress"
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
                   help="foreign.business.sponsorship.help.residence"
                   adjustFor="address">
              <Address name="Residence"
                       className="foreign-business-sponsorship-residence"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.stay')}
                   help="foreign.business.sponsorship.help.stay"
                   adjustFor="textarea">
              <Textarea name="Stay"
                        className="foreign-business-sponsorship-stay"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.sponsorship.heading.sponsorship')}
                   help="foreign.business.sponsorship.help.sponsorship"
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
  error: false,
  valid: false
}
