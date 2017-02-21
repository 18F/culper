import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Collection, DateRange, Address, Text, Help, HelpIcon, Reference, Telephone, Svg, Show } from '../../../Form'
import EmploymentActivity from './EmploymentActivity'
import EmploymentStatus from './EmploymentStatus'
import PhysicalAddress from './PhysicalAddress'
import AdditionalActivity from './AdditionalActivity'
import Supervisor from './Supervisor'

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
      Additional: props.Additional
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
          Additional: this.state.Additional
        })
      }
    })
  }

  showSupervisor () {
    const activity = (this.state.EmploymentActivity || {}).value
    return activity && ['ActiveMilitary', 'NationalGuard', 'USPHS', 'OtherFederal', 'StateGovernment', 'FederalContractor', 'NonGovernment'].includes(activity)
  }

  render () {
    return (
      <div>
        <h3>{i18n.t('history.employment.heading.activity')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="history.employment.activity.help">
            <EmploymentActivity
              {...this.props.EmploymentActivity}
              onUpdate={this.onUpdate.bind(this, 'EmploymentActivity')}
              name="EmploymentActivity"
              />
            <HelpIcon className="activity"/>
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.datesEmployed')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.datesEmployed.help">
            <DateRange name="Dates"
                       {...this.props.Dates}
                       onUpdate={this.onUpdate.bind(this, 'Dates')}
                       onValidate={this.handleValidation}
                       />
            <HelpIcon className="used-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.employer')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.employer.help">
            <Text name="Employment"
                  {...this.props.Employment}
                  onUpdate={this.onUpdate.bind(this, 'Employment')}
                  className="text"
                  label={i18n.t('history.employment.employer.label')}
                  />
            <HelpIcon className="employer" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.title')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.title.help">
            <Text name="Title"
                  {...this.props.Title}
                  onUpdate={this.onUpdate.bind(this, 'Title')}
                  className="text"
                  label={i18n.t('history.employment.title.label')}
                  onValidate={this.handleValidation}
                  />
            <HelpIcon className="title" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.status')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="history.employment.status.help">
            <EmploymentStatus name="Status"
                              {...this.props.Status}
                              onUpdate={this.onUpdate.bind(this, 'Status')}
                              />
            <HelpIcon className="status" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.address')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.address.help">
            <Address name="Address"
                     {...this.props.Address}
                     onUpdate={this.onUpdate.bind(this, 'Address')}
                     label={i18n.t('history.employment.address.label')}
                     />
            <HelpIcon className="address"/>
          </Help>
        </div>

        <h3>{i18n.t('history.employment.heading.telephone')}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id="history.employment.telephone.help">
            <Telephone name="Telephone"
                       {...this.props.Telephone}
                       onUpdate={this.onUpdate.bind(this, 'Telephone')}
                       />
            <HelpIcon className="telephone-icon"/>
          </Help>
        </div>

        <Show when={this.showSupervisor()}>
          <Supervisor name="Supervisor"
                      {...this.props.Supervisor}
                      onUpdate={this.onUpdate.bind(this, 'Supervisor')}
                      />
        </Show>

        <h3>{i18n.t('history.employment.heading.reference')}</h3>
        <Reference name="Reference"
                   {...this.props.Reference}
                   onUpdate={this.onUpdate.bind(this, 'Reference')}
                   />

        <h3>{i18n.t('history.employment.heading.physicalAddress')}</h3>
        <PhysicalAddress name="PhysicalAddress"
                         {...this.props.PhysicalAddress}
                         onUpdate={this.onUpdate.bind(this, 'PhysicalAddress')}
                         className="eapp-field-wrap"
                         />

        <h3>{i18n.t('history.employment.heading.additionalActivity')}</h3>
        <p>{i18n.t('history.employment.para.additionalActivity')}</p>
        <AdditionalActivity name="Additional"
                            {...this.props.Additional}
                            onUpdate={this.onUpdate.bind(this, 'Additional')}
                            className="additional-activity eapp-field-wrap" />
      </div>
    )
  }
}
