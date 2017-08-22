import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Email, Text, Field, Location, Telephone, NotApplicable } from '../../../Form'

export default class Supervisor extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      SupervisorName: props.SupervisorName,
      Title: props.Title,
      Email: props.Email,
      EmailNotApplicable: props.EmailNotApplicable,
      Address: props.Address,
      Telephone: props.Telephone
    }

    this.updateEmailNotApplicable = this.updateEmailNotApplicable.bind(this)
  }

  doUpdate () {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        SupervisorName: this.state.SupervisorName,
        Title: this.state.Title,
        Email: this.state.Email,
        EmailNotApplicable: this.state.EmailNotApplicable,
        Address: this.state.Address,
        Telephone: this.state.Telephone
      })
    }
  }

  onUpdate (field, value) {
    this.setState({ [field]: value }, () => {
      this.doUpdate()
    })
  }

  updateEmailNotApplicable (values) {
    this.setState({ EmailNotApplicable: values }, () => {
      this.doUpdate()
    })
  }

  render () {
    return (
      <div className="supervisor">
        <Field title={i18n.t('history.employment.default.supervisor.heading.name')}
               help="history.employment.default.supervisor.name.help"
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="SupervisorName"
                className="text full-width"
                {...this.props.SupervisorName}
                label={i18n.t('history.employment.default.supervisor.name.label')}
                onError={this.props.onError}
                onUpdate={this.onUpdate.bind(this, 'SupervisorName')}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.title')}
               help="history.employment.default.supervisor.title.help"
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Title"
                {...this.props.Title}
                className="text full-width supervisor-title"
                label={i18n.t('history.employment.default.supervisor.title.label')}
                onUpdate={this.onUpdate.bind(this, 'Title')}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.email')}
               help="history.employment.default.supervisor.email.help"
               adjustFor="label"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="EmailNotApplicable"
                         {...this.state.EmailNotApplicable}
                         label={i18n.t('reference.label.idk')}
                         or={i18n.m('reference.para.or')}
                         onUpdate={this.updateEmailNotApplicable}
                         onError={this.props.onError}>
            <Email name="Email"
                   {...this.props.Email}
                   className="text supervisor-email"
                   label={i18n.t('history.employment.default.supervisor.email.label')}
                   onUpdate={this.onUpdate.bind(this, 'Email')}
                   onError={this.props.onError}
                   required={this.props.required}
                   />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.address')}
               help="history.employment.default.supervisor.address.help"
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.props.Address}
                    label={i18n.t('history.employment.default.supervisor.address.label')}
                    className="supervisor-address"
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.onUpdate.bind(this, 'Address')}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.telephone')}
               help="history.employment.default.supervisor.telephone.help"
               adjustFor="telephone"
               scrollIntoView={this.props.scrollIntoView}>
          <Telephone name="Telephone"
                     {...this.props.Telephone}
                     className="supervisor-telephone"
                     onUpdate={this.onUpdate.bind(this, 'Telephone')}
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
  EmailNotApplicable: {},
  Address: {},
  Telephone: {},
  onError: (value, arr) => { return arr }
}
