import React from 'react'
import { i18n } from '../../../../config'
import { NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessContactValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Textarea, Country, DateControl, Name, BirthPlace } from '../../../Form'
import SubsequentContacts from './SubsequentContacts'

export default class Contact extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignContact = this.updateHasForeignContact.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        HasForeignContact: this.props.HasForeignContact
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateHasForeignContact (values) {
    this.update([
      { name: 'HasForeignContact', value: values }
    ])
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values.items },
      { name: 'ListBranch', value: values.branch }
    ])
  }

  summary (item, index) {
    const obj = item || {}
    const name = NameSummary(obj.Name, i18n.t('foreign.business.contact.collection.summary.unknown'))
    const date = DateSummary(obj.Date)
    const govt = ((obj.Governments || {}).value || []).map(x => x.name).join(', ')
    const govtParen = govt ? ` (${govt})` : ''

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.contact.collection.summary.item')} {index + 1}:</span>
        <span><strong>{name}{govtParen}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
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
                onUpdate={this.updateHasForeignContact}
                onError={this.handleError}>
          {i18n.m('foreign.business.contact.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignContact === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.contact.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.contact.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.contact.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.contact.collection.append')}>
            <h3>{i18n.t('foreign.business.contact.heading.name')}</h3>
            <Name name="Name"
                  className="foreign-business-contact-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.business.contact.heading.location')}
                   help="foreign.business.contact.help.location"
                   adjustFor="address">
              <BirthPlace name="Location"
                          help=""
                          label={i18n.t('foreign.business.contact.label.location')}
                          cityPlaceholder={i18n.t('foreign.business.contact.placeholder.city')}
                          countryPlaceholder={i18n.t('foreign.business.contact.placeholder.country')}
                          hideCounty={true}
                          className="foreign-business-contact-location"
                          bind={true}
                          />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.date')}
                   help="foreign.business.contact.help.date"
                   adjustFor="datecontrol">
              <DateControl name="Date"
                           className="foreign-business-contact-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.governments')}
                   help="foreign.business.contact.help.governments"
                   adjustFor="country">
              <Country name="Governments"
                       className="foreign-business-contact-governments"
                       multiple={true}
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.establishment')}
                   help="foreign.business.contact.help.establishment"
                   adjustFor="textarea">
              <Textarea name="Establishment"
                        className="foreign-business-contact-establishment"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.representatives')}
                   help="foreign.business.contact.help.representatives"
                   adjustFor="textarea">
              <Textarea name="Representatives"
                        className="foreign-business-contact-representatives"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.contact.heading.purpose')}
                   help="foreign.business.contact.help.purpose"
                   adjustFor="textarea">
              <Textarea name="Purpose"
                        className="foreign-business-contact-purpose"
                        bind={true}
                        />
            </Field>

            <SubsequentContacts name="SubsequentContacts" bind={true} />
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
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/contact',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessContactValidator(state, props).isValid()
  },
  defaultState: true
}
