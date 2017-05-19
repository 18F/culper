import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, BranchCollection, Field, Textarea, DateControl } from '../../../Form'

export default class SubsequentContacts extends ValidationElement {
  constructor (props) {
    super(props)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        List: this.props.List
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateList (values) {
    this.update([
      { name: 'List', value: values }
    ])
  }

  render () {
    return (
      <div className="foreign-business-contact-subsequentcontacts">
        <BranchCollection label={i18n.t('foreign.business.contact.heading.hassubsequent')}
                          appendLabel={i18n.t('foreign.business.contact.heading.hassubsequent2')}
                          help="foreign.business.contact.help.hassubsequent"
                          className="has-foreign-contacts"
                          items={this.props.List}
                          onUpdate={this.updateList}
                          onValidate={this.props.onValidate}>
          <Field title={i18n.t('foreign.business.contact.heading.subsequent')}
                 help="foreign.business.contact.help.subsequent"
                 adjustFor="textarea">
            <Textarea name="Subsequent"
                      className="foreign-business-contact-subsequent"
                      bind={true}
                      />
          </Field>

          <Field title={i18n.t('foreign.business.contact.heading.recent')}
                 help="foreign.business.contact.help.recent"
                 adjustFor="datecontrol">
            <DateControl name="Recent"
                         className="foreign-business-contact-recent"
                         bind={true}
                         />
          </Field>

          <Field title={i18n.t('foreign.business.contact.heading.future')}
                 help="foreign.business.contact.help.future"
                 adjustFor="textarea">
            <Textarea name="Future"
                      className="foreign-business-contact-future"
                      bind={true}
                      />
          </Field>
        </BranchCollection>
      </div>
    )
  }
}

SubsequentContacts.defaultProps = {
  name: 'SubsequentContacts',
  List: []
}
