import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Height, Weight, HairColor, EyeColor, Sex } from '../../../Form'

export default class Physical extends SubsectionElement {
  constructor(props) {
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

  handleUpdate(field, values) {
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

  render() {
    const klass = `section-content physical ${this.props.className ||
      ''}`.trim()

    return (
      <div className={klass} {...super.dataAttributes(this.props)}>
        <h1 className="section-header">Your Identifying Information</h1>

        <Field
          title={i18n.t('identification.traits.heading.height')}
          titleSize="h4"
          help="identification.traits.help.height"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}>
          <Height
            name="height"
            {...this.props.Height}
            onUpdate={this.handleUpdate.bind(this, 'Height')}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.weight')}
          titleSize="h4"
          help="identification.traits.help.weight"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}>
          <Weight
            name="weight"
            {...this.props.Weight}
            onUpdate={this.handleUpdate.bind(this, 'Weight')}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.hair')}
          titleSize="h4"
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}
          help="identification.traits.help.hair">
          <HairColor
            name="hair"
            help="identification.traits.help.hair"
            className=""
            {...this.props.HairColor}
            onUpdate={this.handleUpdate.bind(this, 'HairColor')}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.eye')}
          titleSize="h4"
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}
          help="identification.traits.help.eye">
          <EyeColor
            name="eye"
            className=""
            {...this.props.EyeColor}
            onUpdate={this.handleUpdate.bind(this, 'EyeColor')}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.sex')}
          titleSize="h4"
          help="identification.traits.help.sex"
          adjustFor="big-buttons"
          shrink={true}
          onUpdate={this.handleUpdate.bind(this, 'Comments')}
          commentsValue={this.state.Comments}
          scrollIntoView={this.props.scrollIntoView}
          comments={true}>
          <Sex
            name="sex"
            {...this.props.Sex}
            onUpdate={this.handleUpdate.bind(this, 'Sex')}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

Physical.defaultProps = {
  Height: {},
  Weight: {},
  HairColor: '',
  EyeColor: '',
  Sex: '',
  Comments: {},
  onError: (value, arr) => {
    return arr
  },
  section: 'identification',
  subsection: 'physical',
  dispatch: () => {},
  validator: data => {
    return validate(schema('identification.physical', data))
  },
  required: false
}
