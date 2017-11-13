import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Location, Field, Telephone } from '../../../Form'

export default class PhysicalAddress extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasDifferentAddress: props.HasDifferentAddress,
      Address: props.Address,
      Telephone: props.Telephone
    }

    this.doUpdate = this.doUpdate.bind(this)
    this.onBranchUpdate = this.onBranchUpdate.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
  }

  /**
   * Handle the change event.
   */
  onBranchUpdate (values) {
    this.setState({ HasDifferentAddress: values }, () => {
      this.doUpdate()
    })
  }

  doUpdate () {
    this.props.onUpdate({
      name: this.props.name,
      HasDifferentAddress: this.state.HasDifferentAddress,
      Address: this.state.Address,
      Telephone: this.state.Telephone
    })
  }

  handleAddressChange (value) {
    this.setState({ Address: value }, () => {
      this.doUpdate()
    })
  }

  updateTelephone (value) {
    this.setState({ Telephone: value }, () => {
      this.doUpdate()
    })
  }

  options () {
    return (
      <Branch label={this.props.title}
              labelSize="h3"
              name="physicalAddress"
              {...this.state.HasDifferentAddress}
              className="has-different-address"
              help="history.employment.default.physicalAddress.help"
              onUpdate={this.onBranchUpdate}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}>
      </Branch>
    )
  }

  render () {
    const klass = `physical ${this.props.className || ''}`.trim()
    let options = this.options()

    if (this.state.HasDifferentAddress.value === 'Yes') {
      return (
        <div className="has-different">
          <div className={klass + ' physical-address'}>
            {options}
          </div>

          <Field title={i18n.t('history.employment.default.physicalAddress.heading.address')}
                 titleSize="h4"
                 optional={true}
                 help="history.employment.default.physicalAddress.address.help"
                 adjustFor="labels"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <Location name="address"
                      className="address"
                      {...this.props.Address}
                      label={i18n.t('history.employment.default.physicalAddress.address.label')}
                      placeholder={i18n.t('history.employment.default.physicalAddress.address.placeholder')}
                      layout={Location.ADDRESS}
                      geocode={true}
                      addressBooks={this.props.addressBooks}
                      addressBook={this.props.addressBook}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleAddressChange}
                      onError={this.props.onError}
                      required={this.props.required}
                      />
          </Field>

          <Field title={i18n.t('history.employment.default.physicalAddress.heading.telephone')}
                 titleSize="h4"
                 className="override-required"
                 help="history.employment.default.physicalAddress.telephone.help"
                 adjustFor="telephone"
                 scrollIntoView={this.props.scrollIntoView}>
            <Telephone name="telephone"
                       {...this.props.Telephone}
                       label={i18n.t('history.employment.default.physicalAddress.telephone.label')}
                       onUpdate={this.updateTelephone}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
          </Field>
        </div>
      )
    }

    return (
      <div className={klass + ' physical-address'}>
        {options}
      </div>
    )
  }
}

PhysicalAddress.defaultProps = {
  title: '',
  HasDifferentAddress: {},
  addressBooks: {},
  addressBook: 'Company',
  dispatch: (action) => {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
