import React from 'react'
import { i18n } from '../../../../config'
import { PhysicalValidator } from '../../../../validators'
import { ValidationElement, Field, Height, Weight, HairColor, EyeColor, Sex } from '../../../Form'

export default class Physical extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Height: props.Height,
      Weight: props.Weight,
      HairColor: props.HairColor,
      EyeColor: props.EyeColor,
      Sex: props.Sex,
      Comments: props.Comments
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

  isValid () {
    return new PhysicalValidator(this.state, null).isValid()
  }

  render () {
    const klass = `physical ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Field title={i18n.t('identification.traits.heading.height')}
               help="identification.traits.help.height"
               adjustFor='labels'
               shrink={true}>
          <Height name="height"
                  {...this.props.Height}
                  onUpdate={this.handleUpdate.bind(this, 'Height')}
                  onError={this.props.onError}
                  />
        </Field>

        <Field title={i18n.t('identification.traits.heading.weight')}
               help="identification.traits.help.weight"
               adjustFor="labels"
               shrink={true}>
          <Weight name="weight"
                  value={this.props.Weight}
                  onUpdate={this.handleUpdate.bind(this, 'Weight')}
                  onError={this.props.onError}
                  />
        </Field>

        <Field title={i18n.t('identification.traits.heading.hair')}
               adjustFor="big-buttons"
               help="identification.traits.help.hair">
          <HairColor name="hair"
                     help="identification.traits.help.hair"
                     className=""
                     value={this.props.HairColor}
                     onUpdate={this.handleUpdate.bind(this, 'HairColor')}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('identification.traits.heading.eye')}
               adjustFor="big-buttons"
               help="identification.traits.help.eye">
          <EyeColor name="eye"
                    className=""
                    value={this.props.EyeColor}
                    onUpdate={this.handleUpdate.bind(this, 'EyeColor')}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('identification.traits.heading.sex')}
               help="identification.traits.help.sex"
               adjustFor="big-buttons"
               shrink={true}
               comments={true}>
          <Sex name="sex"
               value={this.props.Sex}
               onUpdate={this.handleUpdate.bind(this, 'Sex')}
               onError={this.props.onError}
               />
        </Field>
      </div>
    )
  }
}

Physical.defaultProps = {
  Height: {},
  Weight: {},
  HairColor: [],
  EyeColor: [],
  Sex: {},
  Comments: {}
}
