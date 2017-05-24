import React from 'react'
import { i18n } from '../../../../config'
import { DateSummary } from '../../../Summary'
import { ForeignBusinessConferencesValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateRange } from '../../../Form'
import ConferenceContacts from './ConferenceContacts'

export default class Conferences extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignConferences: props.HasForeignConferences,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateHasForeignConferences = this.updateHasForeignConferences.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignConferences: this.state.HasForeignConferences,
          List: this.state.List
        })
      }
    })
  }

  updateHasForeignConferences (value) {
    this.onUpdate('HasForeignConferences', value)
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  // /**
  //  * Handle the validation event.
  //  */
  // handleValidation (event, status, error) {
  //   if (!event) {
  //     return
  //   }

  //   const codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
  //   let complexStatus = null
  //   if (codes.length > 0) {
  //     complexStatus = false
  //   } else if (this.isValid()) {
  //     complexStatus = true
  //   }

  //   this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
  //     const errorObject = { [this.props.name]: codes }
  //     const statusObject = { [this.props.name]: { status: complexStatus } }
  //     super.handleValidation(event, statusObject, errorObject)
  //   })
  // }

  // isValid () {
  //   return new ForeignBusinessConferencesValidator(this.state, null).isValid()
  // }

  summary (item, index) {
    const obj = item || {}
    const city = (obj.City || {}).value || i18n.t('foreign.business.conferences.collection.summary.unknown')
    const date = DateSummary(item.Dates)

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.conferences.collection.summary.item')} {index + 1}:</span>
        <span><strong>{city}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-conferences">
        <Branch name="has_foreign_conferences"
                label={i18n.t('foreign.business.conferences.heading.title')}
                labelSize="h3"
                adjustFor="p"
                help="foreign.business.conferences.help.branch"
                value={this.state.HasForeignConferences}
                onUpdate={this.updateHasForeignConferences}
                onError={this.props.onError}>
          {i18n.m('foreign.business.conferences.para.branch')}
        </Branch>

        <Show when={this.state.HasForeignConferences === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.props.onError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.conferences.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.conferences.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.conferences.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.conferences.collection.append')}>
            <Field title={i18n.t('foreign.business.conferences.heading.description')}
                   help="foreign.business.conferences.help.description">
              <Textarea name="Description"
                        className="conferences-description"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.sponsor')}
                   help="foreign.business.conferences.help.sponsor">
              <Text name="Sponsor"
                    className="conferences-sponsor"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.city')}
                   help="foreign.business.conferences.help.city">
              <Text name="City"
                    className="conferences-city"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.country')}
                   help="foreign.business.conferences.help.country">
              <Country name="Country"
                       className="conferences-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.dates')}
                   help="foreign.business.conferences.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="conferences-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.purpose')}
                   help="foreign.business.conferences.help.purpose">
              <Textarea name="Purpose"
                        className="conferences-purpose"
                        bind={true}
                        />
            </Field>

            <ConferenceContacts name="Contacts"
                                bind={true}
                                />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Conferences.defaultProps = {
  name: 'Conferences',
  HasForeignConferences: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr }
}
