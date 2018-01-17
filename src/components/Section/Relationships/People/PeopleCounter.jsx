import React from 'react'
import { i18n } from '../../../../config'
import { PeopleValidator } from '../../../../validators'

export default class PeopleCounter extends React.Component {
  validPeople () {
    return new PeopleValidator(this.props).validCount()
  }

  render () {
    const valid = this.validPeople()
    const count = valid > this.props.minimum ? this.props.minimum : valid
    const countClass = 'count ' + (count >= this.props.minimum ? 'covered' : '')
    return (
      <div className="people-counter">
        <div className={countClass}>{count}/{this.props.minimum}</div>
        <div className="unit">{i18n.t('relationships.people.label.unit')}</div>
      </div>
    )
  }
}

PeopleCounter.defaultProps = {
  List: [],
  minimum: 3
}
