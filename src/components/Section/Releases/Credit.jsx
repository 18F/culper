import React from 'react'
import { i18n } from '../../../config'
import { DateRange, ValidationElement, Text, Field, Textarea, DateControl } from '../../Form'

export default class Credit extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Name: this.props.Name,
        Date: this.props.Date,
        ...updateValues
      })
    }
  }

  updateName (values) {
    this.update({ Name: values })
  }

  updateDate (values) {
    this.update({ Date: values })
  }

  render () {
    return (
      <div className="credit-release">
        <h2>{ i18n.t('releases.verify.title') }</h2>
        { i18n.m('releases.credit.contents') }

        <Text name="fullname"
          className="fullname"
          label={i18n.t('releases.verify.label.name')}
          onUpdate={this.updateName}
        />

        <DateControl name="date"
          className="date"
          onUpdate={this.updateDate}
        />
      </div>
    )
  }
}

Credit.defaultProps = {
  onError: (value, arr) => { return arr }
}
