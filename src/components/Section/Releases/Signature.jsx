import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Text, DateControl } from '../../Form'

export default class Signature extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Date: this.props.Date,
      ...queue
    })
  }

  updateName (values) {
    this.update({ Name: values })
  }

  updateDate (values) {
    this.update({ Date: values })
  }

  render () {
    return (
      <div className="signature">
        <Text name="fullname"
              className="fullname"
              label={i18n.t('releases.verify.label.name')}
              {...this.props.Name}
              onUpdate={this.updateName}
              />
        <DateControl name="date"
                     className="date"
                     {...this.props.Date}
                     showEstimated={false}
                     onUpdate={this.updateDate}
                     />
      </div>
    )
  }
}

Signature.defaultProps = {
  Name: {},
  Date: {},
  onUpdate: (queue) => {}
}
