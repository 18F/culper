import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Email, Text, Field, Address, Telephone, NotApplicable } from '../../../Form'

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

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  render () {
    return (
      <div className="supervisor">
        <Field title={i18n.t('history.employment.default.supervisor.heading.name')}
               help="history.employment.default.supervisor.name.help"
               adjustFor="labels">
          <Text name="SupervisorName"
                className="text full-width"
                {...this.props.SupervisorName}
                label={i18n.t('history.employment.default.supervisor.name.label')}
                onValidate={this.handleValidation}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onUpdate={this.onUpdate.bind(this, 'SupervisorName')}
                />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.title')}
               help="history.employment.default.supervisor.title.help"
               adjustFor="labels">
          <Text name="Title"
                {...this.props.Title}
                className="text full-width"
                label={i18n.t('history.employment.default.supervisor.title.label')}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onUpdate={this.onUpdate.bind(this, 'Title')}
                onValidate={this.handleValidation}
                />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.email')}
               help="history.employment.default.supervisor.email.help"
               adjustFor="buttons"
               shrink={true}>
          <NotApplicable name="EmailNotApplicable"
                         {...this.state.EmailNotApplicable}
                         label={i18n.t('reference.label.idk')}
                         or={i18n.m('reference.para.or')}
                         onUpdate={this.updateEmailNotApplicable}>
            <Email name="Email"
                   {...this.props.Email}
                   className="text"
                   label={i18n.t('history.employment.default.supervisor.email.label')}
                   onBlur={this.handleBlur}
                   onFocus={this.handleFocus}
                   onUpdate={this.onUpdate.bind(this, 'Email')}
                   onValidate={this.handleValidation}
                   />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.address')}
               help="history.employment.default.supervisor.address.help"
               adjustFor="labels">
          <Address name="Address"
                   {...this.props.Address}
                   label={i18n.t('history.employment.default.supervisor.address.label')}
                   onBlur={this.handleBlur}
                   onFocus={this.handleFocus}
                   onUpdate={this.onUpdate.bind(this, 'Address')}
                   onValidate={this.handleValidation}
                   />
        </Field>

        <Field title={i18n.t('history.employment.default.supervisor.heading.telephone')}
               help="history.employment.default.supervisor.telephone.help"
               adjustFor="labels">
          <Telephone name="Telephone"
                     {...this.props.Telephone}
                     label={i18n.t('history.employment.default.supervisor.telephone.label')}
                     onBlur={this.handleBlur}
                     onFocus={this.handleFocus}
                     onUpdate={this.onUpdate.bind(this, 'Telephone')}
                     onValidate={this.handleValidation}
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
  Telephone: {}
}
