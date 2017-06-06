import React from 'react'
import { i18n } from '../../../../config'
import { RadioGroup, Show, Radio, ValidationElement, Textarea } from '../../../Form'

export default class DrugType extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDrugType = this.updateDrugType.bind(this)
    this.updateDrugTypeOther = this.updateDrugTypeOther.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        DrugType: this.props.DrugType,
        DrugTypeOther: this.props.DrugTypeOther,
        ...updateValues
      })
    }
  }

  updateDrugType (radio) {
    this.update({ DrugType: radio.value })
  }

  updateDrugTypeOther (values) {
    this.update({ DrugTypeOther: values })
  }

  render () {
    return (
      <div className="drug-type">
        <RadioGroup name="born" selectedValue={this.props.DrugType}>
          <Radio className="cocaine"
            label={i18n.m('substance.drugs.drugType.label.cocaine')}
            value="Cocaine"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="stimulants"
            label={i18n.m('substance.drugs.drugType.label.stimulants')}
            value="Stimulants"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="thc"
            label={i18n.m('substance.drugs.drugType.label.thc')}
            value="THC"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="depressants"
            label={i18n.m('substance.drugs.drugType.label.depressants')}
            value="Depressants"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="ketamine"
            label={i18n.m('substance.drugs.drugType.label.ketamine')}
            value="Ketamine"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="narcotics"
            label={i18n.m('substance.drugs.drugType.label.narcotics')}
            value="Narcotics"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="hallucinogenic"
            label={i18n.m('substance.drugs.drugType.label.hallucinogenic')}
            value="Hallucinogenic"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="steroids"
            label={i18n.m('substance.drugs.drugType.label.steroids')}
            value="Steroids"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="inhalants"
            label={i18n.m('substance.drugs.drugType.label.inhalants')}
            value="Inhalants"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio className="other"
            label={i18n.m('substance.drugs.drugType.label.other')}
            value="Other"
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
        </RadioGroup>
        <Show when={this.props.DrugType === 'Other'}>
          <Textarea name="DrugTypeOther"
            className="drug-type-other"
            {...this.props.DrugTypeOther}
            label={i18n.t('substance.drugs.drugType.label.drugTypeOther')}
            onUpdate={this.updateDrugTypeOther}
            onError={this.props.onError}
          />
        </Show>
      </div>
    )
  }
}

DrugType.defaultProps = {
  onError: (value, arr) => { return arr }
}
