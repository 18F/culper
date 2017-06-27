import React from 'react'
import { i18n } from '../../../../config'
import { CitizenshipPassportsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { BranchCollection } from '../../../Form'
import PassportItem from './PassportItem'

/**
 * Convenience function to send updates along their merry way
 */
export const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Passports extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      Passports: props.Passports
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updatePassports = this.updatePassports.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updatePassports (values) {
    this.onUpdate('Passports', values)
  }

  render () {
    return (
      <div className="passports">
        <BranchCollection label={i18n.t('citizenship.multiple.heading.hasforeignpassport')}
                          appendLabel={i18n.t('citizenship.multiple.collection.passport.appendTitle')}
                          help="citizenship.multiple.help.hasforeignpassport"
                          className="has-foreignpassport"
                          items={this.state.Passports}
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
  onError: (value, arr) => { return arr },
  section: 'citizenship',
  subsection: 'passports',
  dispatch: () => {},
  validator: (state, props) => {
    return new CitizenshipPassportsValidator(state, props).isValid()
  },
  defaultState: true
}
