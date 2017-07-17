import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, BranchCollection } from '../../../Form'

export default class ConferenceContacts extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List
    }

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ...queue
    })
  }

  updateList (items) {
    this.update({
      List: items
    })
  }

  render () {
    return (
      <div className="foreign-business-conferences-contacts">
        <BranchCollection label={i18n.t('foreign.business.conferences.heading.contact')}
                          appendLabel={i18n.t('foreign.business.conferences.heading.contact2')}
                          help="foreign.business.conferences.help.contact"
                          className="has-foreign-contacts"
                          items={this.state.List}
                          onUpdate={this.updateList}
                          onError={this.props.onError}>
          <Field title={i18n.t('foreign.business.conferences.heading.explanation')}
                  help="foreign.business.conferences.help.explanation">
            <Textarea name="Explanation"
                      className="conferences-explanation"
                      bind={true}
                      />
          </Field>
        </BranchCollection>
      </div>
    )
  }
}

ConferenceContacts.defaultProps = {
  name: 'Contacts',
  List: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
