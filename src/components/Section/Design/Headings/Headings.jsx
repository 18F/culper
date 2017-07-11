import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Field, Telephone, Accordion, Country,
         Address, RadioGroup, Radio, DateRange, DateControl, Text, Name } from '../../../Form'

export default class Headings extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List || []
    }

    this.summary = this.summary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  updateList (values) {
    this.setState({ List: values.items })
  }

  summary (item, index) {
    return (
      <span>
        <span className="index">{i18n.t('identification.contacts.collection.summary.phoneNumber')} {index + 1}:</span>
        <span><strong>{i18n.t('identification.contacts.collection.summary.unknownPhone')}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="headings">
        <h2>(h2) Section title</h2>

        <Field title="(h3) Name component">
          <Name name="TestName" />
        </Field>

        <Field title="(h3) Date component with no day" adjustFor="labels">
          <DateControl name="TestDateWithNoDay" hideDay={true} />
        </Field>

        <Field title="(h4) Text component" titleSize="h4">
          <Text name="TestH4" />
        </Field>

        <Field title="(h5) Text component" titleSize="h5">
          <Text name="TestH5" />
        </Field>

        <Field title="(h6) Text component" titleSize="h6">
          <Text name="TestH6" />
        </Field>

        <Field title="(h3) Date range component" titleSize="h4" adjustFor="daterange">
          <DateRange name="TestDateRange" />
        </Field>

        <Field title="(h3) RadioGroup component" adjustFor="buttons">
          <RadioGroup>
            <Radio name="citizenship-status-citizen"
                   label={i18n.t('citizenship.status.label.citizenshipstatus.citizen')}
                   value="Citizen"
                   className="citizenship-status-citizen"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-foreignborn"
                   label={i18n.t('citizenship.status.label.citizenshipstatus.foreignborn')}
                   value="ForeignBorn"
                   className="citizenship-status-foreignborn"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-naturalized"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.naturalized')}
                   value="Naturalized"
                   className="citizenship-status-naturalized"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-derived"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.derived')}
                   value="Derived"
                   className="citizenship-status-derived"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-notcitizen"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.notcitizen')}
                   value="NotCitizen"
                   className="citizenship-status-notcitizen"
                   onChange={this.updateCitizenshipStatus}
                   />
          </RadioGroup>
        </Field>

        <Field title="(h3) Address component" adjustFor="big-buttons">
          <Address name="TestAddress" />
        </Field>

        <Branch label="(h3) Branch component" labelSize="h3" />

        <Field title="(h3) Country component with single value">
          <Country name="TestCountrySingle" />
        </Field>

        <Field title="(h3) Country component with multiple value">
          <Country name="TestCountrySingle" multiple={true} />
        </Field>

        <h3>(h3) {i18n.t('identification.contacts.heading.phoneNumber')}</h3>
        <p>(p) {i18n.t('identification.contacts.para.phoneNumber')}</p>

        <Accordion items={this.state.List}
                   summary={this.summary}
                   description={i18n.t('identification.contacts.collection.phoneNumbers.summary.title')}
                   appendLabel={i18n.t('identification.contacts.collection.phoneNumbers.append')}
                   onUpdate={this.updateList}>
          <Field help="identification.contacts.help.phoneNumber"
                 adjustFor="telephone">
            <Telephone name="Telephone" bind={true} />
          </Field>
        </Accordion>
      </div>
    )
  }
}

Headings.defaultProps = {
  List: []
}
