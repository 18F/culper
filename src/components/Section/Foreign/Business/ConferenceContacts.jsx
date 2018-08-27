import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  Textarea,
  BranchCollection,
  AccordionItem
} from '../../../Form'

export default class ConferenceContacts extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      ...queue
    })
  }

  updateList(items) {
    this.update({
      List: items
    })
  }

  render() {
    return (
      <div className="foreign-business-conferences-contacts">
        <BranchCollection
          label={i18n.t('foreign.business.conferences.heading.contact')}
          appendLabel={i18n.t('foreign.business.conferences.heading.contact2')}
          help="foreign.business.conferences.help.contact"
          className="has-foreign-contacts"
          branchClassName="no-margin-bottom"
          {...this.props.List}
          onUpdate={this.updateList}
          required={this.props.required}
          onError={this.props.onError}
          scrollIntoView={this.props.scrollIntoView}>
          <AccordionItem
            scrollIntoView={this.props.scrollIntoView}
            required={false}>
            <Field
              title={i18n.t('foreign.business.conferences.heading.explanation')}
              titleSize="label"
              help="foreign.business.conferences.help.explanation"
              scrollIntoView={this.props.scrollIntoView}>
              <Textarea
                name="Explanation"
                className="conferences-explanation"
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

ConferenceContacts.defaultProps = {
  name: 'Contacts',
  List: [],
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
