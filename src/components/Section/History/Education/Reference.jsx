import React from 'react'
import { i18n } from '../../../../config'
import { nameIsEmpty } from '../../../../validators'
import { ValidationElement, Field, Name, Telephone, Email, Location, Show, NotApplicable } from '../../../Form'

export default class Reference extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateFullName = this.updateFullName.bind(this)
    this.updateFullNameNotApplicable = this.updateFullNameNotApplicable.bind(this)
    this.updatePhone = this.updatePhone.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateEmailNotApplicable = this.updateEmailNotApplicable.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      FullName: this.props.FullName,
      FullNameNotApplicable: this.props.FullNameNotApplicable,
      Phone: this.props.Phone,
      Email: this.props.Email,
      EmailNotApplicable: this.props.EmailNotApplicable,
      Address: this.props.Address,
      ...queue
    })
  }

  updateFullName (values) {
    this.update({
      FullName: values
    })
  }

  updateFullNameNotApplicable (values) {
    this.update({
      FullNameNotApplicable: values
    })
  }

  updatePhone (values) {
    this.update({
      Phone: values
    })
  }

  updateEmail (values) {
    this.update({
      Email: values
    })
  }

  updateEmailNotApplicable (values) {
    this.update({
      EmailNotApplicable: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  render () {
    const klass = `reference ${this.props.className || ''}`.trim()
    const prefix = `${this.props.localePrefix || ''}${this.props.localePrefix ? '.' : ''}`.trim()

    return (
      <div className={klass}>
        <h3>{i18n.t(`${prefix}reference.heading.name`)}</h3>
        <NotApplicable name="FullNameNotApplicable"
          {...this.props.FullNameNotApplicable}
          label={i18n.t('reference.label.idk')}
          or={i18n.m('reference.para.or')}
          required={this.props.required}
          onError={this.props.onError}
          onUpdate={this.updateFullNameNotApplicable}>
          <Name name="FullName"
            prefix={`${this.props.prefix}.name`}
            className="reference-name"
            {...this.props.FullName}
            onUpdate={this.updateFullName}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </NotApplicable>

        <Show when={!nameIsEmpty(this.props.FullName)}>
          <h2>{i18n.t(`${prefix}reference.heading.correspondence`)}</h2>
          <p>{i18n.t(`${prefix}reference.para.correspondence`)}</p>
          <Field title={i18n.t(`${prefix}reference.heading.phone`)}
            help={`${prefix}reference.help.phone`}
            adjustFor="telephone">
            <Telephone name="Phone"
              className="reference-phone"
              {...this.props.Phone}
              onUpdate={this.updatePhone}
              onError={this.props.onError}
            />
          </Field>

          <Field title={i18n.t(`${prefix}reference.heading.email`)}
            help={`${prefix}reference.help.email`}
            adjustFor="label">
            <NotApplicable name="EmailNotApplicable"
              {...this.props.EmailNotApplicable}
              label={i18n.t('reference.label.idk')}
              or={i18n.m('reference.para.or')}
              onUpdate={this.updateEmailNotApplicable}>
              <Email name="Email"
                {...this.props.Email}
                className="reference-email"
                label={i18n.t(`${prefix}reference.label.email`)}
                onUpdate={this.updateEmail}
                onError={this.props.onError}
              />
            </NotApplicable>
          </Field>

          <Field title={i18n.t(`${prefix}reference.heading.address`)}
            help={`${prefix}reference.help.address`}
            adjustFor="address">
            <p>{i18n.t(`${prefix}reference.para.address`)}</p>
            <Location name="Address"
              className="reference-address"
              {...this.props.Address}
              label={i18n.t(`${prefix}reference.label.address`)}
              layout={Location.ADDRESS}
              geocode={true}
              addressBooks={this.props.addressBooks}
              addressBook={this.props.addressBook}
              dispatch={this.props.dispatch}
              onUpdate={this.updateAddress}
              onError={this.props.onError}
            />
          </Field>
        </Show>
    </div>
    )
  }
}

Reference.defaultProps = {
  FullName: {},
  FullNameNotApplicable: { applicable: true },
  LastContact: {},
  Phone: {},
  Email: {},
  EmailNotApplicable: {},
  Address: {},
  prefix: 'reference',
  addressBooks: {},
  addressBook: 'Reference',
  dispatch: (action) => {},
  onError: (value, arr) => { return arr }
}
