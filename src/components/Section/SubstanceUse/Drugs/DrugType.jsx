import React from 'react'
import { i18n } from '../../../../config'
import {
  Field,
  RadioGroup,
  Show,
  Radio,
  ValidationElement,
  Textarea
} from '../../../Form'

export default class DrugType extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDrugType = this.updateDrugType.bind(this)
    this.updateDrugTypeOther = this.updateDrugTypeOther.bind(this)
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        value: this.props.value,
        ...updateValues
      })
    }
  }

  updateDrugType(values) {
    this.update({ value: values.value })
  }

  updateDrugTypeOther(values) {
    this.update({ value: values.value || 'Other' })
  }

  isOther(drug) {
    if (!drug) {
      return false
    }

    return ![
      'Cocaine',
      'Stimulants',
      'THC',
      'Depressants',
      'Ketamine',
      'Narcotics',
      'Hallucinogenic',
      'Steroids',
      'Inhalants'
    ].includes(drug)
  }

  render() {
    const other = this.isOther(this.props.value)
    const selected = other ? 'Other' : this.props.value
    const explanation =
      other && this.props.value !== 'Other' ? this.props.value : ''
    return (
      <div className="drug-type">
        <RadioGroup
          name="born"
          className="option-list option-list-vertical"
          onError={this.props.onError}
          required={this.props.required}
          selectedValue={selected}>
          <Radio
            className="cocaine"
            label={i18n.m('substance.drugs.drugType.label.cocaine')}
            value="Cocaine"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="stimulants"
            label={i18n.m('substance.drugs.drugType.label.stimulants')}
            value="Stimulants"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="thc"
            label={i18n.m('substance.drugs.drugType.label.thc')}
            value="THC"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="depressants"
            label={i18n.m('substance.drugs.drugType.label.depressants')}
            value="Depressants"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="ketamine"
            label={i18n.m('substance.drugs.drugType.label.ketamine')}
            value="Ketamine"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="narcotics"
            label={i18n.m('substance.drugs.drugType.label.narcotics')}
            value="Narcotics"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="hallucinogenic"
            label={i18n.m('substance.drugs.drugType.label.hallucinogenic')}
            value="Hallucinogenic"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="steroids"
            label={i18n.m('substance.drugs.drugType.label.steroids')}
            value="Steroids"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="inhalants"
            label={i18n.m('substance.drugs.drugType.label.inhalants')}
            value="Inhalants"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            className="other"
            label={i18n.m('substance.drugs.drugType.label.other')}
            value="Other"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
        </RadioGroup>
        <Show when={other}>
          <Field
            title={i18n.t('substance.drugs.drugType.label.drugTypeOther')}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="DrugTypeOther"
              className="drug-type-other"
              value={explanation}
              onUpdate={this.updateDrugTypeOther}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

DrugType.defaultProps = {
  value: '',
  onError: (value, arr) => {
    return arr
  }
}
