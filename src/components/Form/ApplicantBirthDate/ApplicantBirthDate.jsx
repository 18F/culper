import React from 'react'
import ValidationElement from '../validationElement'
import DateControl from '../DateControl'

export default class ApplicantBirthDate extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      estimated: props.estimated
    }
  }

  render () {
    return (
      <div>
        <DateControl name={this.props.name}
                     value={this.state.value}
                     estimated={this.state.estimated}
                     />
      </div>
    )
  }
}
