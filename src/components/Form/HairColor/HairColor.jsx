import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class HairColor extends ValidationElement {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(values) {
    this.props.onUpdate({
      value: values.value
    })
  }

  divClass() {
    return (this.props.className || '') + ' hair-colors'
  }

  render() {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <RadioGroup
          className="option-list eapp-extend-labels"
          selectedValue={this.props.value}
          onError={this.props.onError}
          required={this.props.required}>
          <Radio
            name="hair-black"
            label={i18n.t('identification.traits.hair.black')}
            value="Black"
            className="black"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon black">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-brown"
            label={i18n.t('identification.traits.hair.brown')}
            value="Brown"
            className="brown"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon brown">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-red"
            label={i18n.t('identification.traits.hair.red')}
            value="Red"
            className="red"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon red">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-blonde"
            label={i18n.t('identification.traits.hair.blonde')}
            value="Blonde"
            className="blonde"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon blonde">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-sandy"
            label={i18n.t('identification.traits.hair.sandy')}
            value="Sandy"
            className="sandy"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon sandy">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-gray"
            label={i18n.t('identification.traits.hair.gray')}
            value="Gray"
            className="gray"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon gray">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-white"
            label={i18n.t('identification.traits.hair.white')}
            value="White"
            className="white"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon white">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-bald"
            label={i18n.t('identification.traits.hair.bald')}
            value="Bald"
            className="bald"
            labelClass="black"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            required={this.props.required}>
            <div className="hair-icon bald">
              <Svg src="/img/bald.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-blue"
            label={i18n.t('identification.traits.hair.blue')}
            value="Blue"
            className="blue"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon blue">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-green"
            label={i18n.t('identification.traits.hair.green')}
            value="Green"
            className="green"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon green">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-orange"
            label={i18n.t('identification.traits.hair.orange')}
            value="Orange"
            className="orange"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon orange">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-pink"
            label={i18n.t('identification.traits.hair.pink')}
            value="Pink"
            className="pink"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon pink">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-purple"
            label={i18n.t('identification.traits.hair.purple')}
            value="Purple"
            className="purple"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon purple">
              <Svg src="/img/hair.svg" />
            </div>
          </Radio>
          <Radio
            name="hair-unknown"
            label={i18n.t('identification.traits.hair.unknown')}
            value="Unknown"
            className="unknown"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
            <div className="hair-icon unknown">
              <Svg src="/img/question.svg" />
            </div>
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}

HairColor.defaultProps = {
  name: 'hair',
  value: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

HairColor.errors = []
