import React from 'react'
import { connect } from 'react-redux'
import { ValidationElement, Height, Weight, HairColor, EyeColor, Sex } from '../../../Form'

export default class Physical extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Height: props.Height || {},
      Weight: props.Weight || 0,
      HairColor: props.HairColor || {},
      EyeColor: props.EyeColor || {},
      Sex: props.Sex || {},
      errorCodes: []
    }
  }

  handleUpdate (field, values) {
    this.setState({ [field]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Height: this.state.Height,
          Weight: this.state.Weight,
          HairColor: this.state.HairColor,
          EyeColor: this.state.EyeColor,
          Sex: this.state.Sex
        })
      }
    })
  }

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

  isValid () {
    if (this.state.Height.feet < 1 || !this.state.Height.inches) {
      return false
    }

    if (this.state.Weight < 10) {
      return false
    }

    if (!this.state.HairColor.length) {
      return false
    }

    if (!this.state.EyeColor.length) {
      return false
    }

    if (!this.state.Sex.length) {
      return false
    }

    return true
  }

  render () {
    return (
      <div className="physical">
        <Height name="height"
                {...this.props.Height}
                onUpdate={this.handleUpdate.bind(this, 'Height')}
                onValidate={this.handleValidation.bind(this)}
                />
        <Weight name="weight"
                value={this.props.Weight}
                onUpdate={this.handleUpdate.bind(this, 'Weight')}
                onValidate={this.handleValidation.bind(this)}
                />
        <HairColor name="hair"
                   value={this.props.HairColor}
                   onUpdate={this.handleUpdate.bind(this, 'HairColor')}
                   onValidate={this.handleValidation.bind(this)}
                   />
        <EyeColor name="eye"
                  value={this.props.EyeColor}
                  onUpdate={this.handleUpdate.bind(this, 'EyeColor')}
                  onValidate={this.handleValidation.bind(this)}
                  />
        <Sex name="sex"
             value={this.props.Sex}
             onUpdate={this.handleUpdate.bind(this, 'Sex')}
             onValidate={this.handleValidation.bind(this)}
             />
      </div>
    )
  }
}
