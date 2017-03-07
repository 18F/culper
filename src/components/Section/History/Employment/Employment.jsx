import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Collection, DateRange, Address, Text, Help, HelpIcon, Reference, Telephone, Svg, Show } from '../../../Form'
import EmploymentActivity from './EmploymentActivity'
import EmploymentStatus from './EmploymentStatus'
import PhysicalAddress from './PhysicalAddress'
import AdditionalActivity from './AdditionalActivity'
import Supervisor from './Supervisor'
import ReasonLeft from './ReasonLeft'
import Reprimand from './Reprimand'
import { today, daysAgo, utc } from '../dateranges'

export class EmploymentItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      EmploymentActivity: props.EmploymentActivity,
      Employment: props.Employment,
      Dates: props.Dates,
      Title: props.Title,
      Status: props.Status,
      Address: props.Address,
      Telephone: props.Telephone,
      Supervisor: props.Supervisor,
      Reference: props.Reference,
      PhysicalAddress: props.PhysicalAddress,
      Additional: props.Additional,
      ReasonLeft: props.ReasonLeft,
      Reprimand: props.Reprimand
    }
  }

  onUpdate (field, values) {
    this.setState({
      [field]: values
    }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          EmploymentActivity: this.state.EmploymentActivity,
          Employment: this.state.Employment,
          Dates: this.state.Dates,
          Title: this.state.Title,
          Status: this.state.Status,
          Address: this.state.Address,
          Telephone: this.state.Telephone,
          Supervisor: this.state.Supervisor,
          Reference: this.state.Reference,
          PhysicalAddress: this.state.PhysicalAddress,
          Additional: this.state.Additional,
          ReasonLeft: this.state.ReasonLeft,
          Reprimand: this.state.Reprimand
        })
      }
    })
  }

  showEmployer () {
    const activity = (this.state.EmploymentActivity || {}).value
    return activity && !['Unemployment', 'ActiveMilitary', 'NationalGuard', 'USPHS'].includes(activity)
  }

  showPhysicalAddress () {
    const activity = (this.state.EmploymentActivity || {}).value
    return activity && ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other', 'SelfEmployment'].includes(activity)
  }

  showSupervisor () {
    const activity = (this.state.EmploymentActivity || {}).value
    return activity && ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment', 'Other'].includes(activity)
  }

  showLeaving () {
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    const from = (this.state.Dates || {}).from
    const to = (this.state.Dates || {}).to
    return (from && from >= sevenYearsAgo) || (to && to >= sevenYearsAgo)
  }

  localizeByActivity () {
    const activity = (this.state.EmploymentActivity || {}).value || 'default'
    return activity.toLowerCase()
  }

  render () {
    const prefix = `history.employment.${this.localizeByActivity()}`.trim()
    return (
      <div>
        <h3>{i18n.t(`history.employment.default.heading.activity`)}</h3>

        <EmploymentActivity
          {...this.props.EmploymentActivity}
          onUpdate={this.onUpdate.bind(this, 'EmploymentActivity')}
          name="EmploymentActivity"
          className="eapp-field-wrap no-label"
          />

        <h3>{i18n.t(`history.employment.default.heading.datesEmployed`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={`history.employment.default.datesEmployed.help`}>
            <DateRange name="Dates"
                       {...this.props.Dates}
                       receiveProps={this.props.receiveProps}
                       onUpdate={this.onUpdate.bind(this, 'Dates')}
                       onValidate={this.handleValidation}
                       />
            <HelpIcon className="used-help-icon" />
          </Help>
        </div>

        <Show when={this.showLeaving()}>
          <div>
            <h3>{i18n.t('history.employment.default.left.title')}</h3>
            <ReasonLeft name="ReasonLeft"
                        {...this.props.ReasonLeft}
                        onUpdate={this.onUpdate.bind(this, 'ReasonLeft')}
                        className="eapp-field-wrap"
                        />
          </div>
        </Show>
        <Show when={this.showLeaving()}>
          <div>
            <Reprimand name="Reprimand"
                        {...this.props.Reprimand}
                        onUpdate={this.onUpdate.bind(this, 'Reprimand')}
                        className="eapp-field-wrap"
                        />
          </div>
        </Show>

        <Show when={this.showEmployer()}>
          <div>
            <h3>{i18n.t(`${prefix}.heading.employer`)}</h3>
            <div className="eapp-field-wrap">
              <Help id={`${prefix}.employer.help`}>
                <Text name="Employment"
                      {...this.props.Employment}
                      onUpdate={this.onUpdate.bind(this, 'Employment')}
                      className="text"
                      label={i18n.t(`${prefix}.employer.label`)}
                      />
                <HelpIcon className="employer" />
              </Help>
            </div>

            <h3>{i18n.t(`${prefix}.heading.title`)}</h3>
            <div className="eapp-field-wrap">
              <Help id={`${prefix}.title.help`}>
                <Text name="Title"
                      {...this.props.Title}
                      onUpdate={this.onUpdate.bind(this, 'Title')}
                      className="text"
                      label={i18n.t(`${prefix}.title.label`)}
                      onValidate={this.handleValidation}
                      />
                <HelpIcon className="title" />
              </Help>
            </div>

            <h3>{i18n.t(`${prefix}.heading.status`)}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id={`${prefix}.status.help`}>
                <EmploymentStatus name="Status"
                                  {...this.props.Status}
                                  onUpdate={this.onUpdate.bind(this, 'Status')}
                                  />
                <HelpIcon className="status" />
              </Help>
            </div>

            <h3>{i18n.t(`${prefix}.heading.address`)}</h3>
            <div className="eapp-field-wrap">
              <Help id={`${prefix}.address.help`}>
                <Address name="Address"
                         {...this.props.Address}
                         onUpdate={this.onUpdate.bind(this, 'Address')}
                         label={i18n.t(`${prefix}.address.label`)}
                         />
                <HelpIcon className="address"/>
              </Help>
            </div>

            <h3>{i18n.t(`${prefix}.heading.telephone`)}</h3>
            <div className="eapp-field-wrap no-label">
              <Help id={`${prefix}.telephone.help`}>
                <Telephone name="Telephone"
                           {...this.props.Telephone}
                           onUpdate={this.onUpdate.bind(this, 'Telephone')}
                           />
                <HelpIcon className="telephone-icon"/>
              </Help>
            </div>
          </div>
        </Show>

        <Show when={this.showSupervisor()}>
          <Supervisor name="Supervisor"
                      {...this.props.Supervisor}
                      onUpdate={this.onUpdate.bind(this, 'Supervisor')}
                      />
        </Show>

        <h2>{i18n.t(`${prefix}.heading.reference`)}</h2>
        <Reference name="Reference"
                   {...this.props.Reference}
                   onUpdate={this.onUpdate.bind(this, 'Reference')}
                   />

        <Show when={this.showPhysicalAddress()}>
          <div>
            <h3>{i18n.t(`${prefix}.heading.physicalAddress`)}</h3>
            <PhysicalAddress name="PhysicalAddress"
                             {...this.props.PhysicalAddress}
                             onUpdate={this.onUpdate.bind(this, 'PhysicalAddress')}
                             className="eapp-field-wrap"
                             />
          </div>
        </Show>

        <Show when={this.showEmployer()}>
          <div>
            <h2>{i18n.t(`${prefix}.heading.additionalActivity`)}</h2>
            <p>{i18n.t(`${prefix}.para.additionalActivity`)}</p>
            <AdditionalActivity name="Additional"
                                {...this.props.Additional}
                                onUpdate={this.onUpdate.bind(this, 'Additional')}
                                className="additional-activity eapp-field-wrap" />
          </div>
        </Show>

      </div>
    )
  }
}
