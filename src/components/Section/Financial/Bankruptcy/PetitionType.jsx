import React from 'react'
import { i18n } from '../../../../config'
import { Show, Address, Field, Text, Radio, RadioGroup } from '../../../Form'

export default class PetitionType extends React.Component {
  constructor (props) {
    super(props)
    this.updatePetitionType = this.updatePetitionType.bind(this)
    this.updateTrustee = this.updateTrustee.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        PetitionType: this.props.PetitionType,
        Trustee: this.props.Trustee,
        Address: this.props.Address,
        [field]: values
      })
    }
  }

  updatePetitionType (radio) {
    this.update('PetitionType', radio.value)
  }

  updateTrustee (values) {
    this.update('Trustee', values)
  }

  updateAddress (values) {
    this.update('Address', values)
  }

  render () {
    return (
      <div className="petition-type">
        <Field help="financial.bankruptcy.petitionType.help"
          adjustFor="buttons">
          <RadioGroup className="option-list" selectedValue={this.props.PetitionType}>
            <Radio name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter7')}
              value="Chapter7"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
            <Radio name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter11')}
              value="Chapter11"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
            <Radio name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter12')}
              value="Chapter12"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
            <Radio name="petition_type"
              label={i18n.t('financial.bankruptcy.petitionType.label.chapter13')}
              value="Chapter13"
              disabled={this.props.disabled}
              onUpdate={this.updatePetitionType}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>

          <Show when={this.props.PetitionType === 'Chapter13'}>
            <div className="chapter13">
              <Field title={i18n.t('financial.bankruptcy.trustee.title')}
                help="financial.bankruptcy.trustee.help">
                <Text name="chapter13Trustee"
                  className="trustee"
                  {...this.props.Trustee}
                  placeholder={i18n.t('financial.bankruptcy.trustee.placeholder')}
                  onUpdate={this.updateTrustee}
                />
              </Field>

              <Field title={i18n.t('financial.bankruptcy.trustee.address.title')}
                help="financial.bankruptcy.trustee.address.help"
                adjustFor="labels">
                <Address name="trusteeAddress"
                  {...this.props.Address}
                  label={i18n.t('financial.bankruptcy.trustee.address.label')}
                  onUpdate={this.updateAddress}
                />
              </Field>
            </div>
          </Show>
        </Field>
      </div>
    )
  }
}
