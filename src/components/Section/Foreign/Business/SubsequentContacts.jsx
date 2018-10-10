import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  BranchCollection,
  Field,
  Textarea,
  DateControl,
  AccordionItem
} from '../../../Form'

export default class SubsequentContacts extends ValidationElement {
  constructor(props) {
    super(props)
    this.updateList = this.updateList.bind(this)
  }

  updateList(values) {
    this.props.onUpdate({
      ...values
    })
  }

  render() {
    return (
      <div className="foreign-business-contact-subsequentcontacts">
        <BranchCollection
          label={i18n.t('foreign.business.contact.heading.hassubsequent')}
          appendLabel={i18n.t(
            'foreign.business.contact.heading.hassubsequent2'
          )}
          help="foreign.business.contact.help.hassubsequent"
          className="has-foreign-contacts"
          {...this.props}
          onUpdate={this.updateList}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}>
          <AccordionItem
            scrollIntoView={this.props.scrollIntoView}
            required={false}>
            <Field
              title={i18n.t('foreign.business.contact.heading.subsequent')}
              adjustFor="textarea"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea
                name="Subsequent"
                className="foreign-business-contact-subsequent"
                bind={true}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('foreign.business.contact.heading.recent')}
              help="foreign.business.contact.help.recent"
              adjustFor="datecontrol"
              scrollIntoView={this.props.scrollIntoView}>
              <DateControl
                name="Recent"
                className="foreign-business-contact-recent"
                minDateEqualTo
                bind={true}
                required={this.props.required}
              />
            </Field>

            <Field
              title={i18n.t('foreign.business.contact.heading.future')}
              adjustFor="textarea"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea
                name="Future"
                className="foreign-business-contact-future"
                bind={true}
                required={this.props.required}
              />
            </Field>
          </AccordionItem>
        </BranchCollection>
      </div>
    )
  }
}

SubsequentContacts.defaultProps = {
  name: 'SubsequentContacts',
  List: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
