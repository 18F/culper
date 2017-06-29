import React from 'react'
import { i18n } from '../../../../config'
import { CitizenshipPassportsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { BranchCollection } from '../../../Form'
import PassportItem from './PassportItem'

export default class Passports extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updatePassports = this.updatePassports.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Passports: this.props.Passports,
      ...queue
    })
  }

  updatePassports (values) {
    this.update({
      Passports: values
    })
  }

  render () {
    return (
      <div className="passports">
        <BranchCollection label={i18n.t('citizenship.multiple.heading.hasforeignpassport')}
                          appendLabel={i18n.t('citizenship.multiple.collection.passport.appendTitle')}
                          help="citizenship.multiple.help.hasforeignpassport"
                          className="has-foreignpassport"
                          items={this.props.Passports}
                          onUpdate={this.updatePassports}
                          onError={this.handleError}>
          <PassportItem name="Item" bind={true} defaultState={this.props.defaultState} />
        </BranchCollection>
      </div>
    )
  }
}

Passports.defaultProps = {
  HasPassports: '',
  Citizenships: [],
  CitizenshipsBranch: '',
  Passports: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'citizenship',
  subsection: 'passports',
  dispatch: () => {},
  validator: (state, props) => {
    return new CitizenshipPassportsValidator(props, props).isValid()
  },
  defaultState: true
}
