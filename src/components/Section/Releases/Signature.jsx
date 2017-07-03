import React from 'react'
import { i18n } from '../../../config'
import { ValidationElement, Text, DateControl } from '../../Form'

export default class Signature extends ValidationElement {
  constructor (props) {
    super(props)

    this.handleError = this.handleError.bind(this)
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

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `signature.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    this.props.onError(value, arr)
  }

  render () {
    return (
      <div className="signature">
        <Text name="fullname"
              className="fullname"
              label={i18n.t('releases.verify.label.name')}
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.handleError}
              />
        <DateControl name="date"
                     className="date"
                     {...this.props.Date}
                     showEstimated={false}
                     onUpdate={this.updateDate}
                     onError={this.handleError}
                     />
      </div>
    )
  }
}

Signature.defaultProps = {
  Name: {},
  Date: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
