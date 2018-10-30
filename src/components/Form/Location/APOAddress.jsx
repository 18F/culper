import React from 'react'
import { i18n } from '../../../config'
import Street from '../Street'
import ZipCode from '../ZipCode'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import ApoFpo from '../ApoFpo'

class APOAddress extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Street
          name="street"
          label={i18n.t('address.apoFpo.street.label')}
          placeholder={this.props.postOfficeStreetPlaceholder}
          className="mailing street required"
          value={this.props.street}
          onUpdate={this.onAddressUpdate}
          onError={this.handleError}
          onFocus={this.focusField}
          onBlur={this.blurField}
          required={this.props.required}
          disabled={this.props.disabled}
        />
        <label>{i18n.t('address.apoFpo.select.label')}</label>
        <RadioGroup
          className="apofpo"
          selectedValue={this.props.city}
          disabled={this.props.disabled}
          required={this.props.required}
          onError={this.handleError}>
          <Radio
            name="city"
            className="apo"
            label={i18n.m('address.apoFpo.apoFpoType.apo.label')}
            value="APO"
            disabled={this.props.disabled}
            onUpdate={this.onAddressUpdate}
            onBlur={this.blurField}
            onFocus={this.focusField}
          />
          <Radio
            name="city"
            className="fpo"
            label={i18n.m('address.apoFpo.apoFpoType.fpo.label')}
            value="FPO"
            disabled={this.props.disabled}
            onUpdate={this.onAddressUpdate}
            onBlur={this.blurField}
            onFocus={this.focusField}
          />
          <Radio
            name="city"
            className="dpo"
            label={i18n.m('address.apoFpo.apoFpoType.dpo.label')}
            value="DPO"
            disabled={this.props.disabled}
            onUpdate={this.onAddressUpdate}
            onBlur={this.blurField}
            onFocus={this.focusField}
          />
        </RadioGroup>
        <div className="state-zip-wrap">
          <ApoFpo
            name="state"
            className="state required"
            label={this.props.postOfficeStateLabel}
            value={this.props.state}
            onUpdate={this.onAddressUpdate}
            onError={this.handleError}
            onFocus={this.focusField}
            onBlur={this.blurField}
            required={this.props.required}
            disabled={this.props.disabled}
            tabNext={() => {
              this.props.tab(
                this.refs.apo_zipcode.refs.zipcode.refs.text.refs.input
              )
            }}
          />
          <ZipCode
            name="zipcode"
            ref="apo_zipcode"
            key="apo_zipcode"
            className="zipcode required"
            label={this.props.postOfficeZipcodeLabel}
            value={this.props.zipcode}
            status={instateZipcode}
            onUpdate={this.onAddressUpdate}
            onError={this.handleError}
            onFocus={this.focusField}
            onBlur={this.blurField}
            required={this.props.required}
            disabled={this.props.disabled}
          />
        </div>
      </div>
    )
  }
}

APOAddress.defaultProps = {
  disabled: false,
  required: false,
  postOfficeStreetPlaceholder: i18n.t('address.apoFpo.street.placeholder'),
  postOfficeStateLabel: i18n.t('address.apoFpo.apoFpo.label'),
  postOfficeZipcodeLabel: i18n.t('address.apoFpo.zipcode.label'),
}

export default APOAddress
