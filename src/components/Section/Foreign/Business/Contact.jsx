import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessContactValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Textarea, Country, DateControl, Name, Location } from '../../../Form'
import SubsequentContacts from './SubsequentContacts'

export default class Contact extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasForeignContact = this.updateHasForeignContact.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignContact: this.props.HasForeignContact,
      ...queue
    })
  }

  updateHasForeignContact (values) {
    this.update({
      HasForeignContact: values,
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
    const date = DateSummary(obj.Date)
    const name = NameSummary(obj.Name)
    const govt = ((obj.Governments || {}).value || []).map(x => x.name).join(', ')
    const govtParen = name && govt ? ` (${govt})` : ''

    return Summary({
      type: i18n.t('foreign.business.contact.collection.summary.item'),
      index: index,
      left: `${name}${govtParen}`,
      right: date,
      placeholder: i18n.m('foreign.business.contact.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-contact">
        {i18n.m('foreign.business.contact.para.intro')}

        <Branch name="has_foreign_contact"
                label={i18n.t('foreign.business.contact.heading.title')}
                labelSize="h3"
                help="foreign.business.contact.help.branch"
                value={this.props.HasForeignContact}
                warning={true}
                onUpdate={this.updateHasForeignContact}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.business.contact.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignContact === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.contact.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.contact.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.contact.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.contact.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
           <Field title={i18n.t('foreign.business.contact.heading.name')}
             scrollIntoView={this.props.scrollIntoView}>
              <Name name="Name"
                    className="foreign-business-contact-name"
                    bind={true}
                    required={this.props.required}
                    />
           </Field>
            <Field title={i18n.t('foreign.business.contact.heading.location')}
              help="foreign.business.contact.help.location"
              scrollIntoView={this.props.scrollIntoView}>
              <Location name="Location"
                          layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
                          help=""
                          label={i18n.t('foreign.business.contact.label.location')}
                          cityPlaceholder={i18n.t('foreign.business.contact.placeholder.city')}
                          countryPlaceholder={i18n.t('foreign.business.contact.placeholder.country')}
                          className="birthplace foreign-business-contact-location"
                          bind={true}
                          required={this.props.required}
                          />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.date')}
                   help="foreign.business.contact.help.date"
                   adjustFor="datecontrol"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateControl name="Date"
                           className="foreign-business-contact-date"
                           bind={true}
                           required={this.props.required}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.governments')}
                   help="foreign.business.contact.help.governments"
                   adjustFor="country"
                   scrollIntoView={this.props.scrollIntoView}>
              <Country name="Governments"
                       className="foreign-business-contact-governments"
                       multiple={true}
                       bind={true}
                       required={this.props.required}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.establishment')}
                   help="foreign.business.contact.help.establishment"
                   adjustFor="textarea"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Establishment"
                        className="foreign-business-contact-establishment"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.representatives')}
                   help="foreign.business.contact.help.representatives"
                   adjustFor="textarea"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Representatives"
                        className="foreign-business-contact-representatives"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.purpose')}
                   help="foreign.business.contact.help.purpose"
                   adjustFor="textarea"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Purpose"
                        className="foreign-business-contact-purpose"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <SubsequentContacts name="SubsequentContacts" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Contact.defaultProps = {
  name: 'Contact',
  HasForeignContact: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/contact',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessContactValidator(state, props).isValid()
  },
  defaultState: true
}
