import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, RadioGroup, Radio, Svg, DateRange, DateControl, Text, Textarea, Field } from '../../../Form'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class MilitaryService extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Service: props.Service,
      Status: props.Status,
      Officer: props.Officer,
      ServiceNumber: props.ServiceNumber,
      Dates: props.Dates,
      HasBeenDischarged: props.HasBeenDischarged,
      DischargeType: props.DischargeType,
      DischargeTypeOther: props.DischargeTypeOther,
      DischargeReason: props.DischargeReason,
      DischargeDate: props.DischargeDate
    }

    this.onUpdate = this.onUpdate.bind(this)
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

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateService (event) {
    this.onUpdate('Service', event.target.value)
  }

  updateStatus (event) {
    this.onUpdate('Status', event.target.value)
  }

  updateOfficer (event) {
    this.onUpdate('Officer', event.target.value)
  }

  updateServiceNumber (value) {
    this.onUpdate('ServiceNumber', value)
  }

  updateDates (value) {
    this.onUpdate('Dates', value)
  }

  updateDischarged (value, event) {
    this.onUpdate('HasBeenDischarged', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('DischargeType', null)
      this.onUpdate('DischargeReason', null)
      this.onUpdate('DischargeDate', null)
    }
  }

  updateDischargeType (event) {
    this.onUpdate('DischargeType', event.target.value)
  }

  updateDischargeTypeOther (value) {
    this.onUpdate('DischargeTypeOther', value)
  }

  updateDischargeReason (value) {
    this.onUpdate('DischargeReason', value)
  }

  updateDischargeDate (value) {
    this.onUpdate('DischargeDate', value)
  }

  render () {
    return (
      <div className="military-service">
        <Field title={i18n.t('military.history.heading.service')}
               adjustFor="big-buttons"
               shrink={true}>
          <RadioGroup className="service option-list eapp-extend-labels"
                      selectedValue={this.state.Service}>
            <Radio name="service-airforce"
                   className="service-airforce"
                   label={i18n.t('military.history.label.airforce')}
                   value="AirForce"
                   onChange={this.updateService}
                   >
              <div className="military-service-icon airforce-icon">
                <Svg src="img/airforce.png" />
              </div>
            </Radio>
            <Radio name="service-airnationalguard"
                   className="service-airnationalguard"
                   label={i18n.t('military.history.label.airnationalguard')}
                   value="AirNationalGuard"
                   onChange={this.updateService}
                   >
              <div className="military-service-icon airnationalguard-icon">
                <Svg src="img/airnationalguard.gif" />
              </div>
            </Radio>
            <Radio name="service-army"
                   className="service-army"
                   label={i18n.t('military.history.label.army')}
                   value="Army"
                   onChange={this.updateService}
                   >
              <div className="military-service-icon army-icon">
                <Svg src="img/army.png" />
              </div>
            </Radio>
            <Radio name="service-armynationalguard"
                   className="service-armynationalguard"
                   label={i18n.t('military.history.label.armynationalguard')}
                   value="ArmyNationalGuard"
                   onChange={this.updateService}
                   >
              <div className="military-service-icon armynationalguard-icon">
                <Svg src="img/armynationalguard.png" />
              </div>
            </Radio>
            <Radio name="service-coastguard"
                   className="service-coastguard"
                   label={i18n.t('military.history.label.coastguard')}
                   value="CoastGuard"
                   onChange={this.updateService}
                   >
              <div className="military-service-icon coastguard-icon">
                <Svg src="img/coastguard.png" />
              </div>
            </Radio>
            <Radio name="service-marinecorps"
                   className="service-marinecorps"
                   label={i18n.t('military.history.label.marinecorps')}
                   value="MarineCorps"
                   onChange={this.updateService}
                   >
              <div className="military-service-icon marinecorps-icon">
                <Svg src="img/marinecorps.png" />
              </div>
            </Radio>
            <Radio name="service-navy"
                   className="service-navy"
                   label={i18n.t('military.history.label.navy')}
                   value="Navy"
                   onChange={this.updateService}
                   >
              <div className="military-service-icon navy-icon">
                <Svg src="img/navy.png" />
              </div>
            </Radio>
          </RadioGroup>
        </Field>

        <Show when={this.state.Service === 'AirNationalGuard' || this.state.Service === 'ArmyNationalGuard'}>
          <Field title={i18n.t('military.history.heading.status')}
                 adjustFor="buttons"
                 shrink={true}>
            <RadioGroup className="status option-list"
                        selectedValue={this.state.Status}>
              <Radio name="status-activeduty"
                     className="status-activeduty"
                     label={i18n.t('military.history.label.activeduty')}
                     value="ActiveDuty"
                     onChange={this.updateStatus}
                     />
              <Radio name="status-activereserve"
                     className="status-activereserve"
                     label={i18n.t('military.history.label.activereserve')}
                     value="ActiveReserve"
                     onChange={this.updateStatus}
                     />
              <Radio name="status-inactivereserve"
                     className="status-inactivereserve"
                     label={i18n.t('military.history.label.inactivereserve')}
                     value="InactiveReserve"
                     onChange={this.updateStatus}
                     />
            </RadioGroup>
          </Field>
        </Show>

        <Field title={i18n.t('military.history.heading.officer')}
               adjustFor="buttons"
               shrink={true}>
          <RadioGroup className="officer option-list"
                      selectedValue={this.state.Officer}>
            <Radio name="officer-officer"
                   className="officer-officer"
                   label={i18n.t('military.history.label.officer')}
                   value="Officer"
                   onChange={this.updateOfficer}
                   />
            <Radio name="officer-enlisted"
                   className="officer-enlisted"
                   label={i18n.t('military.history.label.enlisted')}
                   value="Enlisted"
                   onChange={this.updateOfficer}
                   />
            <Radio name="officer-na"
                   className="officer-na"
                   label={i18n.t('military.history.label.na')}
                   value="NotApplicable"
                   onChange={this.updateOfficer}
                   />
          </RadioGroup>
        </Field>

        <Field title={i18n.t('military.history.heading.number')}
               help="military.history.help.number">
          <Text name="ServiceNumber"
                {...this.state.ServiceNumber}
                className="service-number"
                onUpdate={this.updateServiceNumber}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('military.history.heading.dates')}
               help="military.history.help.dates"
               adjustFor="daterange"
               shrink={true}>
          <DateRange name="Dates"
                     className="dates"
                     {...this.state.Dates}
                     label={i18n.t('military.history.label.dates')}
                     onUpdate={this.updateDates}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <h3>{i18n.t('military.history.heading.discharged')}</h3>
        <Branch name="has_beendischarged"
                className="discharged"
                value={this.state.HasBeenDischarged}
                onUpdate={this.updateDischarged}
                onValidate={this.props.onValidate}>
        </Branch>

        <Show when={this.state.HasBeenDischarged === 'Yes'}>
          <div>
            <h2>{i18n.t('military.history.heading.details')}</h2>

            <Field title={i18n.t('military.history.heading.discharge.type')}
                   adjustFor="big-buttons"
                   shrink={true}>
              <RadioGroup className="discharge-type option-list"
                          selectedValue={this.state.DischargeType}>
                <Radio name="discharge-type-honorable"
                       className="discharge-type-honorable"
                       label={i18n.m('military.history.label.discharge.type.honorable')}
                       value="Honorable"
                       onChange={this.updateDischargeType}
                       onValidate={this.props.onValidate}
                       />
                <Radio name="discharge-type-dishonorable"
                       className="discharge-type-dishonorable"
                       label={i18n.m('military.history.label.discharge.type.dishonorable')}
                       value="Dishonorable"
                       onChange={this.updateDischargeType}
                       onValidate={this.props.onValidate}
                       />
                <Radio name="discharge-type-lessthan"
                       className="discharge-type-lessthan long-text"
                       label={i18n.m('military.history.label.discharge.type.lessthan')}
                       value="LessThan"
                       onChange={this.updateDischargeType}
                       onValidate={this.props.onValidate}
                       />
                <Radio name="discharge-type-general"
                       className="discharge-type-general"
                       label={i18n.m('military.history.label.discharge.type.general')}
                       value="General"
                       onChange={this.updateDischargeType}
                       onValidate={this.props.onValidate}
                       />
                <Radio name="discharge-type-badconduct"
                       className="discharge-type-badconduct"
                       label={i18n.m('military.history.label.discharge.type.badconduct')}
                       value="BadConduct"
                       onChange={this.updateDischargeType}
                       onValidate={this.props.onValidate}
                       />
                <Radio name="discharge-type-other"
                       className="discharge-type-other long-text"
                       label={i18n.m('military.history.label.discharge.type.other')}
                       value="Other"
                       onChange={this.updateDischargeType}
                       onValidate={this.props.onValidate}
                       />
              </RadioGroup>
              <Show when={this.state.DischargeType === 'Other'}>
                <Text name="DischargeTypeOther"
                      {...this.state.DischargeTypeOther}
                      label={i18n.t('military.history.label.discharge.type.otherex')}
                      className="discharge-type-otherex"
                      maxlength="100"
                      onUpdate={this.updateDischargeTypeOther}
                      onValidate={this.props.onValidate}
                      />
              </Show>
            </Field>

            <Show when={this.state.DischargeType && this.state.DischargeType !== 'Honorable'}>
              <Field adjustFor="labels">
                <Textarea name="DischargeReason"
                          {...this.state.DischargeReason}
                          className="discharge-reason"
                          label={i18n.t('military.history.label.discharge.reason')}
                          onUpdate={this.updateDischargeReason}
                          onValidate={this.props.onValidate}
                          />
              </Field>
            </Show>

            <Field title={i18n.t('military.history.heading.discharge.date')}
                   help="military.history.help.discharge.date"
                   adjustFor="labels"
                   shrink={true}>
              <DateControl name="DischargeDate"
                           {...this.state.DischargeDate}
                           className="discharge-date"
                           hideDay={true}
                           onUpdate={this.updateDischargeDate}
                           onValidate={this.props.onValidate}
                           />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}
