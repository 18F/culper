import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
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
                    <Svg src="img/neighbor-icon.svg" />
                  </div>
                </Radio>
                <Radio name="relationship-friend"
                       label={i18n.t('reference.label.relationship.friend')}
                       value="Friend"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <Svg src="img/friend-icon.svg" />
                  </div>
                </Radio>
                <Radio name="relationship-landlord"
                       label={i18n.t('reference.label.relationship.landlord')}
                       value="Landlord"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <Svg src="img/landlord-icon.svg" />
                  </div>
                </Radio>
                <Radio name="relationship-business"
                       label={i18n.t('reference.label.relationship.business')}
                       value="Business"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <Svg src="img/business-associate-icon.svg" />
                  </div>
                </Radio>
                <Radio name="relationship-other"
                       label={i18n.t('reference.label.relationship.other')}
                       value="Other"
                       onChange={this.handleRelationshipChange}
                       >
                  <div className="relationship-icon">
                    <Svg src="img/other-icon.svg" />
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
