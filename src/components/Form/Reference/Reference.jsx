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
import Checkbox from '../Checkbox'
import CheckboxGroup from '../CheckboxGroup'
import Show from '../Show'

export default class Reference extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      FullName: props.FullName,
      LastContact: props.LastContact,
      Comments: props.Comments,
      Relationship: props.Relationship,
      RelationshipOther: props.RelationshipOther,
      Phone: props.Phone,
      Email: props.Email,
      Address: props.Address,
      focus: props.focus,
      error: props.error,
      valid: props.valid,
      errorCodes: []
    }

    this.handleRelationshipChange = this.handleRelationshipChange.bind(this)
    this.updateRelationshipOther = this.updateRelationshipOther.bind(this)
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
          RelationshipOther: this.state.RelationshipOther,
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
    let relations = event.target.value
    let selected = [...this.state.Relationship]

    if (selected.includes(relations)) {
      // Remove the relationship if it was previously selected
      selected.splice(selected.indexOf(relations), 1)
    } else {
      // Add the new relationship
      selected.push(relations)
    }

    this.onUpdate('Relationship', selected)
  }

  updateRelationshipOther (values) {
    this.onUpdate('RelationshipOther', values)
  }

  render () {
    const klass = `reference ${this.props.className || ''}`.trim()
    const prefix = `${this.props.localePrefix || ''}${this.props.localePrefix ? '.' : ''}`.trim()

    return (
      <div className={klass}>
        <h3>{i18n.t(`${prefix}reference.heading.name`)}</h3>
        <div className="eapp-field-wrap">
          <Name name="FullName"
                prefix={`${this.props.prefix}.name`}
                {...this.state.FullName}
                onUpdate={this.onUpdate.bind(this, 'FullName')}
                onValidate={this.props.onValidate}
                />
        </div>

        <h3>{i18n.t(`${prefix}reference.heading.contact`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={`${prefix}reference.help.contact`}>
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
                  addLabel={`${prefix}reference.label.relationship.comments`}
                  className="eapp-field-wrap"
                  onUpdate={this.onUpdate.bind(this, 'Comments')}
                  onValidate={this.onValidate}>
          <h3>{i18n.t(`${prefix}reference.heading.relationship`)}</h3>
          <div className="eapp-field-wrap">
            <Help id={`${prefix}reference.help.relationship`}>
              <label>{i18n.t(`${prefix}reference.label.relationship.title`)}</label>
              <CheckboxGroup className="relationship option-list eapp-extend-labels"
                             selectedValues={this.state.Relationship}>
                <Checkbox name="relationship-neighbor"
                          label={i18n.t(`${prefix}reference.label.relationship.neighbor`)}
                          value="Neighbor"
                          onChange={this.handleRelationshipChange}
                          >
                  <div className="relationship-icon neighbor">
                    <Svg src="img/neighbor-icon.svg" />
                  </div>
                </Checkbox>
                <Checkbox name="relationship-friend"
                          label={i18n.t(`${prefix}reference.label.relationship.friend`)}
                          value="Friend"
                          onChange={this.handleRelationshipChange}
                          >
                  <div className="relationship-icon friend">
                    <Svg src="img/friend-icon.svg" />
                  </div>
                </Checkbox>
                <Checkbox name="relationship-landlord"
                          label={i18n.t(`${prefix}reference.label.relationship.landlord`)}
                          value="Landlord"
                          onChange={this.handleRelationshipChange}
                          >
                  <div className="relationship-icon landlord">
                    <Svg src="img/landlord-icon.svg" />
                  </div>
                </Checkbox>
                <Checkbox name="relationship-business"
                          label={i18n.t(`${prefix}reference.label.relationship.business`)}
                          value="Business"
                          onChange={this.handleRelationshipChange}
                          >
                  <div className="relationship-icon business">
                    <Svg src="img/business-associate-icon.svg" />
                  </div>
                </Checkbox>
                <Checkbox name="relationship-other"
                          label={i18n.t(`${prefix}reference.label.relationship.other`)}
                          value="Other"
                          onChange={this.handleRelationshipChange}
                          >
                  <div className="relationship-icon other">
                    <Svg src="img/other-icon.svg" />
                  </div>
                </Checkbox>
              </CheckboxGroup>
              <HelpIcon className="relationship-help-icon" />
              <Show when={this.state.Relationship.some(x => { return x === 'Other' })}>
                <Text name="RelationshipOther"
                      label={i18n.t(`${prefix}reference.label.relationship.explanation`)}
                      maxlength="100"
                      className="relationship-other"
                      {...this.state.RelationshipOther}
                      onUpdate={this.updateRelationshipOther}
                      onValidate={this.props.handleValidation}
                      />
              </Show>
            </Help>
          </div>
        </Comments>

        <h2>{i18n.t(`${prefix}reference.heading.correspondence`)}</h2>
        <p>{i18n.t(`${prefix}reference.para.correspondence`)}</p>

        <h3>{i18n.t(`${prefix}reference.heading.phone`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={`${prefix}reference.help.phone`}>
            <Telephone name="Phone"
                       {...this.state.Phone}
                       onUpdate={this.onUpdate.bind(this, 'Phone')}
                       onValidate={this.props.onValidate}
                       />
            <HelpIcon className="phone-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t(`${prefix}reference.heading.email`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={`${prefix}reference.help.email`}>
            <Email name="Email"
                   {...this.state.Email}
                   className="reference-email"
                   label={i18n.t(`${prefix}reference.label.email`)}
                   onUpdate={this.onUpdate.bind(this, 'Email')}
                   onValidate={this.props.onValidate}
                   />
            <HelpIcon className="email-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t(`${prefix}reference.heading.address`)}</h3>
        <p>{i18n.t(`${prefix}reference.para.address`)}</p>
        <div className="eapp-field-wrap">
          <Help id={`${prefix}reference.help.address`}>
            <Address name="Address"
                     {...this.state.Address}
                     label={i18n.t(`${prefix}reference.label.address`)}
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

Reference.defaultProps = {
  FullName: {},
  LastContact: {},
  Comments: {},
  Relationship: [],
  RelationshipOther: '',
  Phone: {},
  Email: {},
  Address: {},
  focus: false,
  error: false,
  valid: false,
  prefix: 'reference'
}
