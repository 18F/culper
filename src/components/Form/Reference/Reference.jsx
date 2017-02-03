import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import { Help, HelpIcon } from '../Help'
import Name from '../Name'
import Comments from '../Comments'
import Text from '../Text'
import DateControl from '../DateControl'
import Telephone from '../Telephone'
import Email from '../Email'
import Address from '../Address'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class Reference extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      FullName: props.FullName,
      LastContact: props.LastContact,
      Comments: props.Comments,
      Relationship: props.Relationship,
      Phone: props.Phone,
      Email: props.Email,
      Address: props.Address,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCodes: []
    }

    this.handleRelationshipChange = this.handleRelationshipChange.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          FullName: this.state.FullName,
          LastContact: this.state.LastContact,
          Comments: this.state.Comments,
          Relationship: this.state.Relationship,
          Phone: this.state.Phone,
          Email: this.state.Email,
          Address: this.state.Address
        })
      }
    })
  }

  /**
   * Handle the change event for relationships.
   */
  handleRelationshipChange (event) {
    this.onUpdate('Relationship', event.target.value)
  }

  /**
   * Some fields are only visible if `Other` is selected
   */
  showOther (value) {
    return !value || ['Neighbor', 'Friend', 'Landlord', 'Business'].includes(value) ? 'hidden' : ''
  }

  render () {
    const klass = `reference ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <h4>{i18n.t('reference.heading.name')}</h4>
        <div className="eapp-field-wrap">
          <Name name="FullName"
                {...this.state.FullName}
                onUpdate={this.onUpdate.bind(this, 'FullName')}
                onValidate={this.props.onValidate}
                />
        </div>

        <h4>{i18n.t('reference.heading.contact')}</h4>
        <div className="eapp-field-wrap">
          <Help id="reference.help.contact">
            <DateControl name="LastContact"
                         {...this.state.LastContact}
                         onUpdate={this.onUpdate.bind(this, 'LastContact')}
                         onValidate={this.props.onValidate}
                         />
            <HelpIcon className="contact-help-icon" />
          </Help>
        </div>

        <Comments name="Comments"
                  {...this.state.Comments}
                  addLabel="reference.label.relationship.comments"
                  className="eapp-field-wrap"
                  onUpdate={this.onUpdate.bind(this, 'Comments')}
                  onValidate={this.onValidate}>
          <h4>{i18n.t('reference.heading.relationship')}</h4>
          <div className="eapp-field-wrap">
            <Help id="reference.help.relationship">
              <RadioGroup className="relationship option-list eapp-extend-labels"
                          selectedValue={this.state.Relationship}>
                <Radio name="relationship-neighbor"
                       label={i18n.t('reference.label.relationship.neighbor')}
                       value="Neighbor"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <svg viewBox="0 0 74.94 28.35">
                      <path d="M30.54,9.79V0.78c0-0.4-0.31-0.71-0.71-0.71h-4.24c-0.4,0-0.71,0.31-0.71,0.71v4.31l-5.39-4.51
                               c-0.93-0.77-2.43-0.77-3.36,0L0.25,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
                               c0.2,0.02,0.38-0.05,0.53-0.16L17.81,3.78L33.1,16.53c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
                               c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64c0.24-0.29,0.2-0.75-0.09-0.99L30.54,9.79z"/>
                      <path d="M17.81,5.73L5.11,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
                               h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L17.81,5.73z"/>
                      <path d="M57.12,5.73L44.42,16.2c0,0.05-0.02,0.09-0.02,0.13v10.61c0,0.77,0.64,1.41,1.41,1.41h8.49v-8.49h5.66v8.49
                               h8.49c0.77,0,1.41-0.64,1.41-1.41V16.33c0-0.04,0-0.09-0.02-0.13L57.12,5.73z"/>
                      <path d="M74.69,13.82l-4.84-4.02V0.78c0-0.4-0.31-0.71-0.71-0.71H64.9c-0.4,0-0.71,0.31-0.71,0.71v4.31L58.8,0.58
                               c-0.93-0.77-2.43-0.77-3.36,0L39.56,13.82c-0.29,0.24-0.33,0.71-0.09,0.99l1.37,1.64c0.11,0.13,0.29,0.22,0.46,0.24
                               c0.2,0.02,0.38-0.05,0.53-0.16L57.12,3.78l15.29,12.75c0.13,0.11,0.29,0.16,0.46,0.16c0.02,0,0.04,0,0.07,0
                               c0.18-0.02,0.35-0.11,0.46-0.24l1.37-1.64C75.02,14.52,74.98,14.06,74.69,13.82z"/>
                    </svg>
                  </div>
                </Radio>
                <Radio name="relationship-friend"
                       label={i18n.t('reference.label.relationship.friend')}
                       value="Friend"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <svg viewBox="0 0 44.33 34.84">
                      <path d="M17.42,25.33c-1.51,0-2.97-0.15-4.35-0.4c-2.05,1.46-4.38,2.52-6.88,3.17c-0.67,0.17-1.39,0.3-2.13,0.4
                               c-0.03,0-0.05,0-0.07,0c-0.37,0-0.72-0.3-0.79-0.72c-0.1-0.47,0.22-0.77,0.49-1.09c0.97-1.09,2.05-2.05,2.89-4.11
                               C2.57,20.26,0,16.67,0,12.67C0,5.67,7.79,0,17.42,0s17.42,5.67,17.42,12.67C34.83,19.67,27.04,25.33,17.42,25.33z M37.75,28.92
                               c0.84,2.05,1.93,3.02,2.89,4.11c0.27,0.32,0.59,0.62,0.49,1.09c-0.1,0.45-0.47,0.77-0.87,0.72c-0.74-0.1-1.46-0.22-2.13-0.4
                               c-2.5-0.64-4.82-1.71-6.88-3.17c-1.39,0.25-2.85,0.4-4.35,0.4c-4.48,0-8.59-1.24-11.68-3.27c0.72,0.05,1.46,0.1,2.18,0.1
                               c5.32,0,10.34-1.53,14.18-4.3C35.72,21.18,38,17.1,38,12.67c0-1.29-0.2-2.55-0.57-3.76c4.18,2.3,6.9,5.96,6.9,10.09
                               C44.33,23.03,41.76,26.6,37.75,28.92z"/>
                    </svg>
                  </div>
                </Radio>
                <Radio name="relationship-landlord"
                       label={i18n.t('reference.label.relationship.landlord')}
                       value="Landlord"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <svg viewBox="0 0 29.56 37.62">
                      <path d="M29.56,1.34v34.94c0,0.73-0.61,1.34-1.34,1.34H1.34C0.61,37.62,0,37.01,0,36.28V1.34C0,0.61,0.61,0,1.34,0
                               h26.87C28.95,0,29.56,0.61,29.56,1.34z M8.06,6.05c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34
                               c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V6.05z M8.06,11.42c0-0.38-0.29-0.67-0.67-0.67H6.05
                               c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V11.42z M8.06,16.8
                               c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                               V16.8z M8.06,22.17c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34
                               c0.38,0,0.67-0.29,0.67-0.67V22.17z M8.06,27.55c0-0.38-0.29-0.67-0.67-0.67H6.05c-0.38,0-0.67,0.29-0.67,0.67v1.34
                               c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V27.55z M10.75,7.39c0,0.38,0.29,0.67,0.67,0.67h1.34
                               c0.38,0,0.67-0.29,0.67-0.67V6.05c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67V7.39z M10.75,12.77
                               c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67v-1.34c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67
                               V12.77z M10.75,18.14c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V16.8c0-0.38-0.29-0.67-0.67-0.67h-1.34
                               c-0.38,0-0.67,0.29-0.67,0.67V18.14z M10.75,23.51c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67v-1.34
                               c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67V23.51z M18.81,30.23c0-0.38-0.29-0.67-0.67-0.67h-6.72
                               c-0.38,0-0.67,0.29-0.67,0.67v4.03c0,0.38,0.29,0.67,0.67,0.67h6.72c0.38,0,0.67-0.29,0.67-0.67V30.23z M18.81,6.05
                               c0-0.38-0.29-0.67-0.67-0.67H16.8c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                               V6.05z M18.81,11.42c0-0.38-0.29-0.67-0.67-0.67H16.8c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34
                               c0.38,0,0.67-0.29,0.67-0.67V11.42z M18.81,16.8c0-0.38-0.29-0.67-0.67-0.67H16.8c-0.38,0-0.67,0.29-0.67,0.67v1.34
                               c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V16.8z M18.81,22.17c0-0.38-0.29-0.67-0.67-0.67H16.8
                               c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V22.17z M24.19,6.05
                               c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                               V6.05z M24.19,11.42c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34
                               c0.38,0,0.67-0.29,0.67-0.67V11.42z M24.19,16.8c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34
                               c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V16.8z M24.19,22.17c0-0.38-0.29-0.67-0.67-0.67h-1.34
                               c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67V22.17z M24.19,27.55
                               c0-0.38-0.29-0.67-0.67-0.67h-1.34c-0.38,0-0.67,0.29-0.67,0.67v1.34c0,0.38,0.29,0.67,0.67,0.67h1.34c0.38,0,0.67-0.29,0.67-0.67
                               V27.55z"/>
                    </svg>
                  </div>
                </Radio>
                <Radio name="relationship-business"
                       label={i18n.t('reference.label.relationship.business')}
                       value="Business"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <svg viewBox="0 0 40.05 34.33">
                      <path d="M40.05,17.88H0V9.3c0-1.97,1.61-3.58,3.58-3.58h7.87V2.15C11.44,0.96,12.4,0,13.59,0h12.87
                               c1.18,0,2.15,0.96,2.15,2.15v3.58h7.87c1.97,0,3.58,1.61,3.58,3.58V17.88z M40.05,30.75c0,1.97-1.61,3.58-3.58,3.58H3.58
                               C1.61,34.33,0,32.72,0,30.75V20.03h15.02v3.58c0,0.78,0.65,1.43,1.43,1.43h7.15c0.78,0,1.43-0.65,1.43-1.43v-3.58h15.02V30.75z
                               M25.75,5.72V2.86H14.3v2.86H25.75z M22.89,22.89h-5.72v-2.86h5.72V22.89z"/>
                    </svg>
                  </div>
                </Radio>
                <Radio name="relationship-other"
                       label={i18n.t('reference.label.relationship.other')}
                       value="Other"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <svg viewBox="0 0 36.62 36.62">
                      <path d="M18.31,36.62C8.2,36.62,0,28.42,0,18.31C0,8.2,8.2,0,18.31,0s18.31,8.2,18.31,18.31
                               C36.62,28.42,28.42,36.62,18.31,36.62z M18.79,6.1c-3.89,0-6.79,1.67-8.84,5.08c-0.21,0.33-0.12,0.76,0.19,1l3.15,2.38
                               c0.12,0.09,0.29,0.14,0.45,0.14c0.21,0,0.45-0.09,0.6-0.29c1.12-1.43,1.6-1.86,2.05-2.19c0.41-0.29,1.19-0.57,2.05-0.57
                               c1.53,0,2.93,0.98,2.93,2.03c0,1.24-0.64,1.86-2.1,2.53c-1.69,0.76-4,2.74-4,5.05v0.86c0,0.43,0.33,0.76,0.76,0.76h4.58
                               c0.43,0,0.76-0.33,0.76-0.76c0-0.55,0.69-1.72,1.81-2.36c1.81-1.03,4.29-2.41,4.29-6.03C27.46,9.37,22.89,6.1,18.79,6.1z
                               M21.36,25.17c0-0.43-0.33-0.76-0.76-0.76h-4.58c-0.43,0-0.76,0.33-0.76,0.76v4.58c0,0.43,0.33,0.76,0.76,0.76h4.58
                               c0.43,0,0.76-0.33,0.76-0.76V25.17z"/>
                    </svg>
                  </div>
                </Radio>
              </RadioGroup>
              <HelpIcon className="relationship-help-icon" />
              <div className={this.showOther(this.state.Relationship)}>
                <Text name="Relationship"
                      label={i18n.t('reference.label.relationship.explanation')}
                      maxlength="100"
                      value={this.state.Relationship}
                      onUpdate={this.onUpdate.bind(this, 'Relationship')}
                      onValidate={this.props.handleValidation}
                      />
              </div>
            </Help>
          </div>
        </Comments>

        <h3>{i18n.t('reference.heading.correspondence')}</h3>
        <p>{i18n.t('reference.para.correspondence')}</p>

        <h4>{i18n.t('reference.heading.phone')}</h4>
        <div className="eapp-field-wrap">
          <Help id="reference.help.phone">
            <Telephone name="Phone"
                       {...this.state.Phone}
                       onUpdate={this.onUpdate.bind(this, 'Phone')}
                       onValidate={this.props.onValidate}
                       />
            <HelpIcon className="phone-help-icon" />
          </Help>
        </div>

        <h4>{i18n.t('reference.heading.email')}</h4>
        <div className="eapp-field-wrap">
          <Help id="reference.help.email">
            <Email name="Email"
                   {...this.state.Email}
                   label={i18n.t('reference.label.email')}
                   onUpdate={this.onUpdate.bind(this, 'Email')}
                   onValidate={this.props.onValidate}
                   />
            <HelpIcon className="email-help-icon" />
          </Help>
        </div>

        <h4>{i18n.t('reference.heading.address')}</h4>
        <p>{i18n.t('reference.para.address')}</p>
        <div className="eapp-field-wrap">
          <Help id="reference.help.address">
            <Address name="Address"
                     {...this.state.Address}
                     label={i18n.t('reference.label.address')}
                     onUpdate={this.onUpdate.bind(this, 'Address')}
                     onValidate={this.props.onValidate}
                     />
            <HelpIcon className="address-help-icon" />
          </Help>
        </div>
      </div>
    )
  }
}
