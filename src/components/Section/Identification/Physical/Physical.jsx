import React from 'react'
import { i18n } from '../../../../config'
import { PhysicalValidator } from '../../../../validators'
import { ValidationElement, Help, HelpIcon, Height, Weight, HairColor, EyeColor, Sex, Comments } from '../../../Form'

export default class Physical extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Height: props.Height,
      Weight: props.Weight,
      HairColor: props.HairColor,
      EyeColor: props.EyeColor,
      Sex: props.Sex,
      Comments: props.Comments,
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
          Sex: this.state.Sex,
          Comments: this.state.Comments
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
    return new PhysicalValidator(this.state, null).isValid()
  }

  render () {
    const klass = `physical ${this.props.className || ''}`.trim()

    return (
      <div>
        <h3>{i18n.t('identification.traits.heading.height')}</h3>
        <div className={klass}>
          <Help id="identification.traits.help.height">
            <Height name="height"
                    {...this.props.Height}
                    onUpdate={this.handleUpdate.bind(this, 'Height')}
                    onValidate={this.handleValidation.bind(this)}
                    />
            <HelpIcon className="height-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('identification.traits.heading.weight')}</h3>
        <div className={klass}>
          <Help id="identification.traits.help.weight">
            <Weight name="weight"
                    value={this.props.Weight}
                    onUpdate={this.handleUpdate.bind(this, 'Weight')}
                    onValidate={this.handleValidation.bind(this)}
                    />
            <HelpIcon className="weight-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('identification.traits.heading.hair')}</h3>
        <div className={klass + ' no-label hair-colors'}>
          <Help id="identification.traits.help.hair">
            <HairColor name="hair"
                       help="identification.traits.help.hair"
                       className=""
                       value={this.props.HairColor}
                       onUpdate={this.handleUpdate.bind(this, 'HairColor')}
                       onValidate={this.handleValidation.bind(this)}
                       />
            <HelpIcon className="hair-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('identification.traits.heading.eye')}</h3>
        <div className={klass + ' no-label eye-colors'}>
          <Help id="identification.traits.help.eye">
            <EyeColor name="eye"
                      className=""
                      value={this.props.EyeColor}
                      onUpdate={this.handleUpdate.bind(this, 'EyeColor')}
                      onValidate={this.handleValidation.bind(this)}
                      />
            <HelpIcon className="eye-help-icon" />
          </Help>
        </div>

        <Comments name="comments"
                  value={this.state.Comments}
                  addLabel="identification.traits.label.comments"
                  className="eapp-field-wrap"
                  onUpdate={this.handleUpdate.bind(this, 'Comments')}
                  onValidate={this.handleValidation}
                  >
          <h3>{i18n.t('identification.traits.heading.sex')}</h3>
          <div className={klass + ' sex'}>
            <Help id="identification.traits.help.sex">
              <Sex name="sex"
                   value={this.props.Sex}
                   onUpdate={this.handleUpdate.bind(this, 'Sex')}
                   onValidate={this.handleValidation.bind(this)}
                   />
              <HelpIcon className="sex-help-icon" />
            </Help>
          </div>
        </Comments>
      </div>
    )
  }
}
