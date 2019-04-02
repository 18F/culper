import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Email,
  Text,
  Field,
  Location,
  Telephone,
  NotApplicable
} from '../../../Form'

export default class Supervisor extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateSupervisorName = this.updateSupervisorName.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateEmailNotApplicable = this.updateEmailNotApplicable.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      SupervisorName: this.props.SupervisorName,
      Title: this.props.Title,
      Email: this.props.Email,
      EmailNotApplicable: this.props.EmailNotApplicable,
      Address: this.props.Address,
      Telephone: this.props.Telephone,
      ...queue
    })
  }

  updateSupervisorName(values) {
    this.update({
      SupervisorName: values
    })
  }

  updateTitle(values) {
    this.update({
      Title: values
    })
  }

  updateEmailNotApplicable(values) {
    this.update({
      EmailNotApplicable: values
    })
  }

  updateEmail(values) {
    this.update({
      Email: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  updateTelephone(values) {
    this.update({
      Telephone: values
    })
  }

  render() {
    return (
      <div className="supervisor">
        <Field
          title={i18n.t('history.employment.default.supervisor.heading.name')}
          titleSize="h4"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="SupervisorName"
            className="text full-width supervisor-name"
            {...this.props.SupervisorName}
            onError={this.props.onError}
            onUpdate={this.updateSupervisorName}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('history.employment.default.supervisor.heading.title')}
          titleSize="h4"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Title"
            {...this.props.Title}
            className="text full-width supervisor-title"
            onUpdate={this.updateTitle}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('history.employment.default.supervisor.heading.email')}
          titleSize="h4"
          adjustFor="label"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="EmailNotApplicable"
            {...this.props.EmailNotApplicable}
            className="supervisor-email-na"
            label={i18n.t('reference.label.idk')}
            or={i18n.m('reference.para.or')}
            onUpdate={this.updateEmailNotApplicable}
            onError={this.props.onError}>
            <Email
              name="Email"
              {...this.props.Email}
              className="text supervisor-email"
              onUpdate={this.updateEmail}
              onError={this.props.onError}
              required={
                (this.props.EmailNotApplicable || {}).applicable === false
                  ? false
                  : this.props.required
              }
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t(
            'history.employment.default.supervisor.heading.address'
          )}
          titleSize="h4"
          optional={true}
          help="history.employment.default.supervisor.address.help"
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="Address"
            {...this.props.Address}
            label={i18n.t(
              'history.employment.default.supervisor.address.label'
            )}
            className="supervisor-address"
            layout={Location.ADDRESS}
            geocode={true}
            addressBooks={this.props.addressBooks}
            addressBook={this.props.addressBook}
            showPostOffice={true}
            dispatch={this.props.dispatch}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'history.employment.default.supervisor.heading.telephone'
          )}
          titleSize="h4"
          className="override-required"
          adjustFor="telephone"
          scrollIntoView={this.props.scrollIntoView}>
          <Telephone
            name="Telephone"
            {...this.props.Telephone}
            className="supervisor-telephone"
            onUpdate={this.updateTelephone}
            allowNotApplicable={false}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

Supervisor.defaultProps = {
  SupervisorName: {},
  Title: {},
  Email: {},
  EmailNotApplicable: { applicable: true },
  Address: {},
  Telephone: {},
  addressBooks: {},
  addressBook: 'Employment',
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
