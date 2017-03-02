import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryHistoryValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, RadioGroup, Radio, Svg, DateRange, DateControl, Text, Textarea, Help, HelpIcon } from '../../../Form'

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
      DischargeReason: props.DischargeReason,
      DischargeDate: props.DischargeDate,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateService = this.updateService.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateOfficer = this.updateOfficer.bind(this)
    this.updateServiceNumber = this.updateServiceNumber.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateDischarged = this.updateDischarged.bind(this)
    this.updateDischargeType = this.updateDischargeType.bind(this)
    this.updateDischargeReason = this.updateDischargeReason.bind(this)
    this.updateDischargeDate = this.updateDischargeDate.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateService (value) {
    this.onUpdate('Service', value)
  }

  updateStatus (value) {
    this.onUpdate('Status', value)
  }

  updateOfficer (value) {
    this.onUpdate('Officer', value)
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

    // Force validation checks
    this.handleValidation(event, null, null)
  }

  updateDischargeType (value) {
    this.onUpdate('DischargeType', value)
  }

  updateDischargeReason (value) {
    this.onUpdate('DischargeReason', value)
  }

  updateDischargeDate (value) {
    this.onUpdate('DischargeDate', value)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new MilitaryHistoryValidator(this.state, null).isValid()
  }

  render () {
    return (
      <div className="military-service">
        <h3>{i18n.t('military.history.heading.service')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.history.help.service">
            <RadioGroup className="service option-list eapp-extend-labels"
                        selectedValue={this.state.Service}>
              <Radio name="service-airforce"
                     label={i18n.t('military.history.label.airforce')}
                     value="AirForce"
                     onChange={this.updateService}
                     >
                <div className="airforce-icon">
                  <Svg src="img/airforce.png" />
                </div>
              </Radio>
              <Radio name="service-airnationalguard"
                     label={i18n.t('military.history.label.airnationalguard')}
                     value="AirNationalGuard"
                     onChange={this.updateService}
                     >
                <div className="airnationalguard-icon">
                  <Svg src="img/airnationalguard.gif" />
                </div>
              </Radio>
              <Radio name="service-army"
                     label={i18n.t('military.history.label.army')}
                     value="Army"
                     onChange={this.updateService}
                     >
                <div className="army-icon">
                  <Svg src="img/army.png" />
                </div>
              </Radio>
              <Radio name="service-armynationalguard"
                     label={i18n.t('military.history.label.armynationalguard')}
                     value="ArmyNationalGuard"
                     onChange={this.updateService}
                     >
                <div className="armynationalguard-icon">
                  <Svg src="img/armynationalguard.png" />
                </div>
              </Radio>
              <Radio name="service-coastguard"
                     label={i18n.t('military.history.label.coastguard')}
                     value="CoastGuard"
                     onChange={this.updateService}
                     >
                <div className="coastguard-icon">
                  <Svg src="img/coastguard.png" />
                </div>
              </Radio>
              <Radio name="service-marinecorps"
                     label={i18n.t('military.history.label.marinecorps')}
                     value="MarineCorps"
                     onChange={this.updateService}
                     >
                <div className="marinecorps-icon">
                  <Svg src="img/marinecorps.png" />
                </div>
              </Radio>
              <Radio name="service-navy"
                     label={i18n.t('military.history.label.navy')}
                     value="Navy"
                     onChange={this.updateService}
                     >
                <div className="navy-icon">
                  <Svg src="img/navy.png" />
                </div>
              </Radio>
            </RadioGroup>
            <HelpIcon className="service-icon" />
          </Help>
        </div>

        <h3>{i18n.t('military.history.heading.status')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.history.help.status">
            <RadioGroup className="status option-list"
                        selectedValue={this.state.Status}>
              <Radio name="status-activeduty"
                     label={i18n.t('military.history.label.activeduty')}
                     value="ActiveDuty"
                     onChange={this.updateStatus}
                     />
              <Radio name="status-activereserve"
                     label={i18n.t('military.history.label.activereserve')}
                     value="ActiveReserve"
                     onChange={this.updateStatus}
                     />
              <Radio name="status-inactivereserve"
                     label={i18n.t('military.history.label.inactivereserve')}
                     value="InactiveReserve"
                     onChange={this.updateStatus}
                     />
            </RadioGroup>
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.history.heading.officer')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.history.help.officer">
            <RadioGroup className="officer option-list"
                        selectedValue={this.state.Officer}>
              <Radio name="officer-officer"
                     label={i18n.t('military.history.label.officer')}
                     value="Officer"
                     onChange={this.updateStatus}
                     />
              <Radio name="officer-enlisted"
                     label={i18n.t('military.history.label.enlisted')}
                     value="Enlisted"
                     onChange={this.updateStatus}
                     />
              <Radio name="officer-na"
                     label={i18n.t('military.history.label.na')}
                     value="NotApplicable"
                     onChange={this.updateStatus}
                     />
            </RadioGroup>
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.history.heading.number')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.history.help.number">
            <Text name="ServiceNumber"
                  {...this.state.ServiceNumber}
                  className="service-number"
                  onUpdate={this.updateServiceNumber}
                  onValidate={this.props.onValidate}
                  />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.history.heading.dates')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.history.help.dates">
            <DateRange name="Dates"
                       {...this.state.Dates}
                       label={i18n.t('military.history.label.dates')}
                       onUpdate={this.updateDates}
                       onValidate={this.props.onValidate}
                       />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.history.heading.discharged')}</h3>
        <Branch name="has_beendischarged"
                className="eapp-field-wrap discharged"
                value={this.state.HasBeenDischarged}
                help="military.history.help.discharged"
                onUpdate={this.updateDischarged}>
        </Branch>

        <Show when={this.state.HasBeenDischarged === 'Yes'}>
          <div>
            <h2>{i18n.t('military.history.heading.details')}</h2>

            <h3>{i18n.t('military.history.heading.discharge.type')}</h3>
            <div className="eapp-field-wrap">
              <Help id="military.history.help.discharge.type">
                <RadioGroup className="discharge-type option-list"
                            selectedValue={this.state.DischargeType}>
                  <Radio name="discharge-type-honorable"
                         label={i18n.t('military.history.label.discharge.type.honorable')}
                         value="Honorable"
                         onChange={this.updateDischargeType}
                         />
                  <Radio name="discharge-type-dishonorable"
                         label={i18n.t('military.history.label.discharge.type.dishonorable')}
                         value="Dishonorable"
                         onChange={this.updateDischargeType}
                         />
                  <Radio name="discharge-type-lessthan"
                         label={i18n.t('military.history.label.discharge.type.lessthan')}
                         value="LessThan"
                         className="long-text"
                         onChange={this.updateDischargeType}
                         />
                  <Radio name="discharge-type-general"
                         label={i18n.t('military.history.label.discharge.type.general')}
                         value="General"
                         onChange={this.updateDischargeType}
                         />
                  <Radio name="discharge-type-badconduct"
                         label={i18n.t('military.history.label.discharge.type.badconduct')}
                         value="BadConduct"
                         onChange={this.updateDischargeType}
                         />
                  <Radio name="discharge-type-other"
                         label={i18n.t('military.history.label.discharge.type.other')}
                         value="Other"
                         onChange={this.updateDischargeType}
                         />
                </RadioGroup>
                <HelpIcon className="discharge-type-icon" />
              </Help>
            </div>

            <div className="eapp-field-wrap">
              <Help id="military.history.help.discharge.reason">
                <Textarea name="DischargeReason"
                          {...this.state.DischargeReason}
                          className="discharge-reason"
                          label={i18n.t('military.history.label.discharge.reason')}
                          onUpdate={this.updateDischargeReason}
                          />
                <HelpIcon />
              </Help>
            </div>

            <h3>{i18n.t('military.history.heading.discharge.date')}</h3>
            <div className="eapp-field-wrap">
              <Help id="military.history.help.discharge.date">
                <DateControl name="DischargeDate"
                             {...this.state.DischargeDate}
                             className="discharge-date"
                             hideDay={true}
                             onUpdate={this.updateDischargeDate}
                             />
                <HelpIcon />
              </Help>
            </div>
          </div>
        </Show>
      </div>
    )
  }
}
