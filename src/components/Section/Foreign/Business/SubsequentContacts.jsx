import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, BranchCollection, Field, Textarea, DateControl } from '../../../Form'

export default class SubsequentContacts extends ValidationElement {
  constructor (props) {
    super(props)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  render () {
    return (
      <div className="foreign-business-contact-subsequentcontacts">
        <BranchCollection label={i18n.t('foreign.business.contact.heading.hassubsequent')}
                          appendLabel={i18n.t('foreign.business.contact.heading.hassubsequent2')}
                          help="foreign.business.contact.help.hassubsequent"
                          className="has-foreign-contacts"
                          {...this.props.List}
                          onUpdate={this.updateList}
                          required={this.props.required}
                          onError={this.props.onError}
                          scrollIntoView={this.props.scrollIntoView}>
          <Field title={i18n.t('foreign.business.contact.heading.subsequent')}
                 help="foreign.business.contact.help.subsequent"
                 adjustFor="textarea"
                 scrollIntoView={this.props.scrollIntoView}>
            <Textarea name="Subsequent"
                      className="foreign-business-contact-subsequent"
                      bind={true}
                      required={this.props.required}
                      />
          </Field>

          <Field title={i18n.t('foreign.business.contact.heading.recent')}
                 help="foreign.business.contact.help.recent"
                 adjustFor="datecontrol"
                 scrollIntoView={this.props.scrollIntoView}>
            <DateControl name="Recent"
                         applicantBirthdate={this.props.applicantBirthdate}
                         className="foreign-business-contact-recent"
                         bind={true}
                         required={this.props.required}
                         />
          </Field>

          <Field title={i18n.t('foreign.business.contact.heading.future')}
                 help="foreign.business.contact.help.future"
                 adjustFor="textarea"
                 scrollIntoView={this.props.scrollIntoView}>
            <Textarea name="Future"
                      className="foreign-business-contact-future"
                      bind={true}
                      required={this.props.required}
                      />
          </Field>
        </BranchCollection>
      </div>
    )
  }
}

SubsequentContacts.defaultProps = {
  name: 'SubsequentContacts',
  applicantBirthdate: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
