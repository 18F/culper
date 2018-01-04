import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, RadioGroup, Radio, Svg, DateRange, DateControl, Text, Textarea, Field } from '../../../Form'

export default class MilitaryService extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateService = this.updateService.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateOfficer = this.updateOfficer.bind(this)
    this.updateServiceNumber = this.updateServiceNumber.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateDischarged = this.updateDischarged.bind(this)
    this.updateDischargeType = this.updateDischargeType.bind(this)
    this.updateDischargeTypeOther = this.updateDischargeTypeOther.bind(this)
    this.updateDischargeReason = this.updateDischargeReason.bind(this)
    this.updateDischargeDate = this.updateDischargeDate.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Service: this.props.Service,
      Status: this.props.Status,
      Officer: this.props.Officer,
      ServiceNumber: this.props.ServiceNumber,
      Dates: this.props.Dates,
      HasBeenDischarged: this.props.HasBeenDischarged,
      DischargeType: this.props.DischargeType,
      DischargeTypeOther: this.props.DischargeTypeOther,
      DischargeReason: this.props.DischargeReason,
      DischargeDate: this.props.DischargeDate,
      ...queue
    })
  }

  updateService (event) {
    this.update({
      Service: event.target.value
    })
  }

  updateStatus (event) {
    this.update({
      Status: event.target.value
    })
  }

  updateOfficer (event) {
    this.update({
      Officer: event.target.value
    })
  }

  updateServiceNumber (value) {
    this.update({
      ServiceNumber: value
    })
  }

  updateDates (value) {
    this.update({
      Dates: value
    })
  }

  updateDischarged (values) {
    // If there is no history clear out any previously entered data
    this.update({
      HasBeenDischarged: values,
      DischargeType: values.value !== 'Yes' ? null : this.props.DischargeType,
      DischargeReason: values.value !== 'Yes' ? null : this.props.DischargeReason,
      DischargeDate: values.value !== 'Yes' ? null : this.props.DischargeDate
    })
  }

  updateDischargeType (event) {
    this.update({
      DischargeType: event.target.value
    })
  }

  updateDischargeTypeOther (value) {
    this.update({
      DischargeTypeOther: value
    })
  }

  updateDischargeReason (value) {
    this.update({
      DischargeReason: value
    })
  }

  updateDischargeDate (value) {
    this.update({
      DischargeDate: value
    })
  }

  render () {
    return (
      <div className="military-service">
        <Field title={i18n.t('military.history.heading.service')}
               adjustFor="big-buttons"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup className="service option-list eapp-extend-labels"
                      required={this.props.required}
                      onError={this.props.onError}
                      selectedValue={this.props.Service}>
            <Radio name="service-airforce"
                   className="service-airforce"
                   label={i18n.t('military.history.label.airforce')}
                   value="AirForce"
                   onChange={this.updateService}
                   onError={this.props.onError}
                   >
              <div className="military-service-icon airforce-icon">
                <Svg src="/img/airforce.png" />
              </div>
            </Radio>
            <Radio name="service-airnationalguard"
                   className="service-airnationalguard"
                   label={i18n.t('military.history.label.airnationalguard')}
                   value="AirNationalGuard"
                   onChange={this.updateService}
                   onError={this.props.onError}
                   >
              <div className="military-service-icon airnationalguard-icon">
                <Svg src="/img/airnationalguard.gif" />
              </div>
            </Radio>
            <Radio name="service-army"
                   className="service-army"
                   label={i18n.t('military.history.label.army')}
                   value="Army"
                   onChange={this.updateService}
                   onError={this.props.onError}
                   >
              <div className="military-service-icon army-icon">
                <Svg src="/img/army.png" />
              </div>
            </Radio>
            <Radio name="service-armynationalguard"
                   className="service-armynationalguard"
                   label={i18n.t('military.history.label.armynationalguard')}
                   value="ArmyNationalGuard"
                   onChange={this.updateService}
                   onError={this.props.onError}
                   >
              <div className="military-service-icon armynationalguard-icon">
                <Svg src="/img/armynationalguard.png" />
              </div>
            </Radio>
            <Radio name="service-coastguard"
                   className="service-coastguard"
                   label={i18n.t('military.history.label.coastguard')}
                   value="CoastGuard"
                   onChange={this.updateService}
                   onError={this.props.onError}
                   >
              <div className="military-service-icon coastguard-icon">
                <Svg src="/img/coastguard.png" />
              </div>
            </Radio>
            <Radio name="service-marinecorps"
                   className="service-marinecorps"
                   label={i18n.t('military.history.label.marinecorps')}
                   value="MarineCorps"
                   onChange={this.updateService}
                   onError={this.props.onError}
                   >
              <div className="military-service-icon marinecorps-icon">
                <Svg src="/img/marinecorps.png" />
              </div>
            </Radio>
            <Radio name="service-navy"
                   className="service-navy"
                   label={i18n.t('military.history.label.navy')}
                   value="Navy"
                   onChange={this.updateService}
                   onError={this.props.onError}
                   >
              <div className="military-service-icon navy-icon">
                <Svg src="/img/navy.png" />
              </div>
            </Radio>
          </RadioGroup>
        </Field>

        <Show when={this.props.Service === 'AirNationalGuard' || this.props.Service === 'ArmyNationalGuard'}>
          <Field title={i18n.t('military.history.heading.status')}
                 adjustFor="buttons"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <RadioGroup className="status option-list"
                        required={this.props.required}
                        onError={this.props.onError}
                        selectedValue={this.props.Status}>
              <Radio name="status-activeduty"
                     className="status-activeduty"
                     label={i18n.t('military.history.label.activeduty')}
                     value="ActiveDuty"
                     onChange={this.updateStatus}
                     onError={this.props.onError}
                     />
              <Radio name="status-activereserve"
                     className="status-activereserve"
                     label={i18n.t('military.history.label.activereserve')}
                     value="ActiveReserve"
                     onChange={this.updateStatus}
                     onError={this.props.onError}
                     />
              <Radio name="status-inactivereserve"
                     className="status-inactivereserve"
                     label={i18n.t('military.history.label.inactivereserve')}
                     value="InactiveReserve"
                     onChange={this.updateStatus}
                     onError={this.props.onError}
                     />
            </RadioGroup>
          </Field>
        </Show>

        <Field title={i18n.t('military.history.heading.officer')}
               adjustFor="buttons"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup className="officer option-list"
                      required={this.props.required}
                      onError={this.props.onError}
                      selectedValue={this.props.Officer}>
            <Radio name="officer-officer"
                   className="officer-officer"
                   label={i18n.t('military.history.label.officer')}
                   value="Officer"
                   onChange={this.updateOfficer}
                   onError={this.props.onError}
                   />
            <Radio name="officer-enlisted"
                   className="officer-enlisted"
                   label={i18n.t('military.history.label.enlisted')}
                   value="Enlisted"
                   onChange={this.updateOfficer}
                   onError={this.props.onError}
                   />
            <Radio name="officer-na"
                   className="officer-na"
                   label={i18n.t('military.history.label.na')}
                   value="NotApplicable"
                   onChange={this.updateOfficer}
                   onError={this.props.onError}
                   />
          </RadioGroup>
        </Field>

        <Field title={i18n.t('military.history.heading.number')}
               help="military.history.help.number"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="ServiceNumber"
                {...this.props.ServiceNumber}
                className="service-number"
                onUpdate={this.updateServiceNumber}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('military.history.heading.dates')}
               help="military.history.help.dates"
               adjustFor="daterange"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     className="dates"
                     {...this.props.Dates}
                     applicantBirthdate={this.props.applicantBirthdate}
                     label={i18n.t('military.history.label.dates')}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Branch name="has_beendischarged"
                label={i18n.t('military.history.heading.discharged')}
                labelSize="h3"
                className="discharged"
                {...this.props.HasBeenDischarged}
                onUpdate={this.updateDischarged}
                required={this.props.required}
                onError={this.props.onError}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasBeenDischarged.value === 'Yes'}>
          <div>
            <Field title={i18n.t('military.history.heading.details')}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom"
                   />

            <Field title={i18n.t('military.history.heading.discharge.type')}
                   adjustFor="big-buttons"
                   shrink={true}
                   scrollIntoView={this.props.scrollIntoView}>
              <RadioGroup className="discharge-type option-list"
                          required={this.props.required}
                          onError={this.props.onError}
                          selectedValue={this.props.DischargeType}>
                <Radio name="discharge-type-honorable"
                       className="discharge-type-honorable"
                       label={i18n.m('military.history.label.discharge.type.honorable')}
                       value="Honorable"
                       onChange={this.updateDischargeType}
                       onError={this.props.onError}
                       />
                <Radio name="discharge-type-dishonorable"
                       className="discharge-type-dishonorable"
                       label={i18n.m('military.history.label.discharge.type.dishonorable')}
                       value="Dishonorable"
                       onChange={this.updateDischargeType}
                       onError={this.props.onError}
                       />
                <Radio name="discharge-type-lessthan"
                       className="discharge-type-lessthan long-text"
                       label={i18n.m('military.history.label.discharge.type.lessthan')}
                       value="LessThan"
                       onChange={this.updateDischargeType}
                       onError={this.props.onError}
                       />
                <Radio name="discharge-type-general"
                       className="discharge-type-general"
                       label={i18n.m('military.history.label.discharge.type.general')}
                       value="General"
                       onChange={this.updateDischargeType}
                       onError={this.props.onError}
                       />
                <Radio name="discharge-type-badconduct"
                       className="discharge-type-badconduct"
                       label={i18n.m('military.history.label.discharge.type.badconduct')}
                       value="BadConduct"
                       onChange={this.updateDischargeType}
                       onError={this.props.onError}
                       />
                <Radio name="discharge-type-other"
                       className="discharge-type-other long-text"
                       label={i18n.m('military.history.label.discharge.type.other')}
                       value="Other"
                       onChange={this.updateDischargeType}
                       onError={this.props.onError}
                       />
              </RadioGroup>
              <Show when={this.props.DischargeType === 'Other'}>
                <Field title={i18n.t('military.history.label.discharge.type.otherex')}
                       titleSize="label"
                       adjustFor="text"
                       scrollIntoView={this.props.scrollIntoView}>
                  <Text name="DischargeTypeOther"
                        {...this.props.DischargeTypeOther}
                        className="discharge-type-otherex"
                        maxlength="100"
                        onUpdate={this.updateDischargeTypeOther}
                        onError={this.props.onError}
                        required={this.props.required}
                        />
                </Field>
              </Show>
            </Field>

            <Show when={this.props.DischargeType && this.props.DischargeType !== 'Honorable'}>
              <Field title={i18n.t('military.history.label.discharge.reason')}
                     adjustFor="textarea"
                     scrollIntoView={this.props.scrollIntoView}>
                <Textarea name="DischargeReason"
                          {...this.props.DischargeReason}
                          className="discharge-reason"
                          onUpdate={this.updateDischargeReason}
                          onError={this.props.onError}
                          required={this.props.required}
                          />
              </Field>
            </Show>

            <Field title={i18n.t('military.history.heading.discharge.date')}
                   help="military.history.help.discharge.date"
                   adjustFor="labels"
                   shrink={true}
                   scrollIntoView={this.props.scrollIntoView}>
              <DateControl name="DischargeDate"
                           {...this.props.DischargeDate}
                           applicantBirthdate={this.props.applicantBirthdate}
                           className="discharge-date"
                           hideDay={true}
                           onUpdate={this.updateDischargeDate}
                           onError={this.props.onError}
                           required={this.props.required}
                           />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

MilitaryService.defaultProps = {
  HasBeenDischarged: {},
  applicantBirthdate: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
